import fs from 'node:fs/promises';
import path from 'node:path';

export async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

export async function ensureParentDir(filePath) {
  await ensureDir(path.dirname(filePath));
}

export async function writeTextFile(filePath, content) {
  await ensureParentDir(filePath);
  await fs.writeFile(filePath, content, 'utf8');
}

export async function readJsonFile(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

export async function writeJsonFile(filePath, value) {
  await writeTextFile(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

export async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export function relativeToCwd(filePath, cwd = process.cwd()) {
  return path.relative(cwd, filePath) || '.';
}
