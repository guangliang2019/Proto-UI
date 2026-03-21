import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const APP_ROOT = path.resolve(SCRIPT_DIR, '..');
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..', '..');
const PROTOTYPE_LIBS_DIR = path.join(REPO_ROOT, 'packages', 'prototype-libs');
const OUTPUT_FILE = path.join(APP_ROOT, 'src', 'styles', 'prototype-tokens.generated.css');

async function main() {
  const files = await collectTsFiles(PROTOTYPE_LIBS_DIR);
  const tokens = new Set();

  for (const file of files) {
    const sourceText = await fs.readFile(file, 'utf8');
    const sourceFile = ts.createSourceFile(
      file,
      sourceText,
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS
    );
    const scope = createScope();
    walk(sourceFile, scope, tokens);
  }

  const css = renderCss(Array.from(tokens).sort());
  await fs.mkdir(path.dirname(OUTPUT_FILE), { recursive: true });
  await fs.writeFile(OUTPUT_FILE, css, 'utf8');
  console.log(
    `[prototype-tailwind] wrote ${tokens.size} tokens to ${path.relative(APP_ROOT, OUTPUT_FILE)}`
  );
}

function createScope(parent = null) {
  return { parent, bindings: new Map() };
}

function walk(node, scope, tokens) {
  if (createsScope(node)) {
    const nextScope = createScope(scope);

    if (hasStatements(node)) {
      for (const stmt of node.statements) {
        if (ts.isVariableStatement(stmt)) {
          for (const decl of stmt.declarationList.declarations) {
            registerDeclaration(decl, nextScope);
            if (decl.initializer) walk(decl.initializer, nextScope, tokens);
          }
          continue;
        }
        walk(stmt, nextScope, tokens);
      }
      return;
    }

    ts.forEachChild(node, (child) => walk(child, nextScope, tokens));
    return;
  }

  if (
    ts.isCallExpression(node) &&
    ts.isIdentifier(node.expression) &&
    node.expression.text === 'tw'
  ) {
    for (const arg of node.arguments) {
      const value = resolveExpression(arg, scope);
      for (const token of value.strings.flatMap(splitTokens)) {
        tokens.add(token);
      }
    }
  }

  if (ts.isCallExpression(node) && isPropertyNamed(node.expression, 'rule')) {
    collectRuleVariantTokens(node, scope, tokens);
  }

  ts.forEachChild(node, (child) => walk(child, scope, tokens));
}

function createsScope(node) {
  return (
    ts.isSourceFile(node) ||
    ts.isBlock(node) ||
    ts.isModuleBlock(node) ||
    ts.isCaseBlock(node) ||
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node)
  );
}

function hasStatements(node) {
  return (
    ts.isSourceFile(node) || ts.isBlock(node) || ts.isModuleBlock(node) || ts.isCaseBlock(node)
  );
}

function registerDeclaration(decl, scope) {
  if (!ts.isIdentifier(decl.name) || !decl.initializer) return;
  scope.bindings.set(decl.name.text, resolveBinding(decl.initializer, scope));
}

function resolveExpression(node, scope) {
  if (ts.isStringLiteralLike(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return asStringValue([node.text]);
  }

  if (ts.isArrayLiteralExpression(node)) {
    const parts = [];
    for (const element of node.elements) {
      const value = resolveExpression(element, scope);
      if (!value.single) return emptyValue();
      parts.push(value.single);
    }
    return asStringValue([parts.join(',')]);
  }

  if (
    ts.isCallExpression(node) &&
    ts.isPropertyAccessExpression(node.expression) &&
    node.expression.name.text === 'join'
  ) {
    return resolveJoinCall(node, scope);
  }

  if (ts.isIdentifier(node)) {
    return lookup(node.text, scope);
  }

  if (
    ts.isParenthesizedExpression(node) ||
    ts.isAsExpression(node) ||
    ts.isTypeAssertionExpression(node)
  ) {
    return resolveExpression(node.expression, scope);
  }

  if (ts.isObjectLiteralExpression(node)) {
    const entries = new Map();
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        const key = getPropertyName(prop.name);
        if (!key) continue;
        const value = resolveExpression(prop.initializer, scope);
        if (value.strings.length > 0) entries.set(key, value.strings);
      } else if (ts.isShorthandPropertyAssignment(prop)) {
        const value = lookup(prop.name.text, scope);
        if (value.strings.length > 0) entries.set(prop.name.text, value.strings);
      }
    }
    return asMapValue(entries);
  }

  if (ts.isElementAccessExpression(node)) {
    const base = resolveExpression(node.expression, scope);
    if (!base.map) return emptyValue();

    if (node.argumentExpression && ts.isStringLiteralLike(node.argumentExpression)) {
      return asStringValue(base.map.get(node.argumentExpression.text) ?? []);
    }

    const out = new Set();
    for (const strings of base.map.values()) {
      for (const value of strings) out.add(value);
    }
    return asStringValue(Array.from(out));
  }

  if (ts.isConditionalExpression(node)) {
    const values = new Set([
      ...resolveExpression(node.whenTrue, scope).strings,
      ...resolveExpression(node.whenFalse, scope).strings,
    ]);
    return asStringValue(Array.from(values));
  }

  return emptyValue();
}

function resolveJoinCall(node, scope) {
  const separatorArg = node.arguments[0];
  const separator =
    separatorArg &&
    (ts.isStringLiteralLike(separatorArg) || ts.isNoSubstitutionTemplateLiteral(separatorArg))
      ? separatorArg.text
      : ',';
  const base = resolveExpression(node.expression.expression, scope);
  if (!base.single) return emptyValue();
  return asStringValue([base.single.split(',').join(separator)]);
}

function lookup(name, scope) {
  let current = scope;
  while (current) {
    const value = current.bindings.get(name);
    if (value) return value;
    current = current.parent;
  }
  return emptyValue();
}

function resolveBinding(node, scope) {
  const semantic = resolveSemanticBinding(node);
  const value = resolveExpression(node, scope);
  return semantic ? { ...value, semantic } : value;
}

function resolveSemanticBinding(node) {
  if (
    !ts.isCallExpression(node) ||
    !isPropertyAccessChain(node.expression, ['state', 'fromInteraction'])
  ) {
    if (
      !ts.isCallExpression(node) ||
      !isPropertyAccessChain(node.expression, ['state', 'fromAccessibility'])
    ) {
      return null;
    }
  }

  const kind = node.expression.name.text === 'fromInteraction' ? 'interaction' : 'accessibility';
  const firstArg = node.arguments[0];
  if (!firstArg || !ts.isStringLiteralLike(firstArg)) return null;
  const name = firstArg.text;

  if (kind === 'interaction') {
    return (
      {
        hovered: 'hover',
        pressed: 'active',
        disabled: 'data-[disabled]',
        focused: 'data-[focused]',
        focusVisible: 'data-[focus-visible]',
      }[name] ?? null
    );
  }

  return (
    {
      expanded: 'aria-expanded',
      invalid: 'aria-invalid',
      selected: 'aria-selected',
      checked: 'aria-checked',
      current: 'aria-current',
    }[name] ?? null
  );
}

function collectRuleVariantTokens(node, scope, tokens) {
  const config = node.arguments[0];
  if (!config || !ts.isObjectLiteralExpression(config)) return;

  const whenProp = config.properties.find(
    (prop) => ts.isPropertyAssignment(prop) && getPropertyName(prop.name) === 'when'
  );
  const intentProp = config.properties.find(
    (prop) => ts.isPropertyAssignment(prop) && getPropertyName(prop.name) === 'intent'
  );
  if (
    !whenProp ||
    !intentProp ||
    !ts.isPropertyAssignment(whenProp) ||
    !ts.isPropertyAssignment(intentProp)
  ) {
    return;
  }

  const variants = analyzeWhenVariants(whenProp.initializer, scope);
  if (variants.length === 0) return;

  const intentTokens = collectTwTokens(intentProp.initializer, scope);
  for (const token of intentTokens) {
    tokens.add(`${variants.join(':')}:${token}`);
  }
}

function analyzeWhenVariants(node, scope) {
  const out = new Set();

  visit(node);
  return Array.from(out).sort(compareVariants);

  function visit(current) {
    if (ts.isArrowFunction(current) || ts.isFunctionExpression(current)) {
      visit(current.body);
      return;
    }

    if (
      ts.isParenthesizedExpression(current) ||
      ts.isAsExpression(current) ||
      ts.isTypeAssertionExpression(current)
    ) {
      visit(current.expression);
      return;
    }

    if (ts.isCallExpression(current) && ts.isPropertyAccessExpression(current.expression)) {
      const method = current.expression.name.text;

      if (method === 'all' || method === 'any') {
        for (const arg of current.arguments) visit(arg);
        return;
      }

      if (method === 'eq') {
        const subject = current.expression.expression;
        if (ts.isCallExpression(subject) && ts.isPropertyAccessExpression(subject.expression)) {
          const subjectMethod = subject.expression.name.text;
          if (subjectMethod === 'state') {
            const firstArg = subject.arguments[0];
            if (firstArg && ts.isIdentifier(firstArg)) {
              const binding = lookup(firstArg.text, scope);
              if (binding.semantic) out.add(binding.semantic);
            }
            return;
          }

          if (subjectMethod === 'meta') {
            const key = subject.arguments[0];
            const value = current.arguments[0];
            if (
              key &&
              value &&
              ts.isStringLiteralLike(key) &&
              ts.isStringLiteralLike(value) &&
              key.text === 'colorScheme' &&
              value.text === 'dark'
            ) {
              out.add('dark');
            }
          }
        }
      }
    }

    ts.forEachChild(current, visit);
  }
}

function collectTwTokens(node, scope) {
  const found = new Set();

  visit(node, scope);
  return Array.from(found);

  function visit(current, currentScope) {
    if (createsScope(current)) {
      const nextScope = createScope(currentScope);
      if (hasStatements(current)) {
        for (const stmt of current.statements) {
          if (ts.isVariableStatement(stmt)) {
            for (const decl of stmt.declarationList.declarations) {
              registerDeclaration(decl, nextScope);
              if (decl.initializer) visit(decl.initializer, nextScope);
            }
            continue;
          }
          visit(stmt, nextScope);
        }
        return;
      }
    }

    if (
      ts.isCallExpression(current) &&
      ts.isIdentifier(current.expression) &&
      current.expression.text === 'tw'
    ) {
      for (const arg of current.arguments) {
        const value = resolveExpression(arg, currentScope);
        for (const token of value.strings.flatMap(splitTokens)) found.add(token);
      }
    }

    ts.forEachChild(current, (child) => visit(child, currentScope));
  }
}

function compareVariants(a, b) {
  const order = ['dark', 'hover', 'active', 'focus', 'focus-visible', 'disabled'];
  const ai = order.indexOf(a);
  const bi = order.indexOf(b);
  if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  return a.localeCompare(b);
}

function isPropertyNamed(node, name) {
  return ts.isPropertyAccessExpression(node) && node.name.text === name;
}

function isPropertyAccessChain(node, names) {
  let current = node;
  for (let i = names.length - 1; i >= 0; i -= 1) {
    if (!ts.isPropertyAccessExpression(current) || current.name.text !== names[i]) return false;
    current = current.expression;
  }
  return ts.isIdentifier(current);
}

function getPropertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteralLike(name)) return name.text;
  return null;
}

function splitTokens(value) {
  return value
    .split(/\s+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function emptyValue() {
  return { strings: [], single: null, map: null, semantic: null };
}

function asStringValue(strings) {
  return {
    strings,
    single: strings.length === 1 ? strings[0] : null,
    map: null,
    semantic: null,
  };
}

function asMapValue(map) {
  const strings = [];
  for (const values of map.values()) strings.push(...values);
  return {
    strings,
    single: null,
    map,
    semantic: null,
  };
}

function renderCss(tokens) {
  const lines = [
    '/* This file is auto-generated by apps/www/scripts/generate-prototype-tailwind-sources.mjs. */',
    '/* Do not edit by hand. */',
    '',
  ];

  for (const token of tokens) {
    lines.push(`@source inline("${escapeForCss(token)}");`);
  }

  lines.push('');
  return lines.join('\n');
}

function escapeForCss(token) {
  return token.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

async function collectTsFiles(dir) {
  const out = [];
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'dist' || entry.name === 'test' || entry.name === 'node_modules') continue;
      out.push(...(await collectTsFiles(fullPath)));
      continue;
    }
    if (entry.isFile() && /\.(ts|tsx|mts|cts)$/.test(entry.name)) out.push(fullPath);
  }
  return out;
}

await main();
