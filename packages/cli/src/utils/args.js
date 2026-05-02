export function parseArgv(argv) {
  const options = {};
  const positionals = [];
  let stop = false;

  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];

    if (stop) {
      positionals.push(token);
      continue;
    }

    if (token === '--') {
      stop = true;
      continue;
    }

    if (token.startsWith('--no-')) {
      options[token.slice(5)] = false;
      continue;
    }

    if (token.startsWith('--')) {
      const eqIndex = token.indexOf('=');
      if (eqIndex !== -1) {
        options[token.slice(2, eqIndex)] = token.slice(eqIndex + 1);
        continue;
      }

      const key = token.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('-')) {
        options[key] = next;
        i += 1;
      } else {
        options[key] = true;
      }
      continue;
    }

    if (token.startsWith('-') && token.length > 1) {
      const flags = token.slice(1).split('');
      for (const flag of flags) options[flag] = true;
      continue;
    }

    positionals.push(token);
  }

  return { options, positionals };
}

export function isHelpToken(token) {
  return token === '--help' || token === '-h' || token === '-help' || token === 'help';
}

export function isInteractiveDisabled(options) {
  return options.interactive === false || process.env.CI === 'true' || process.env.CI === '1';
}

export function resolveBooleanOption(options, key, fallback = false) {
  if (typeof options[key] === 'boolean') return options[key];
  return fallback;
}
