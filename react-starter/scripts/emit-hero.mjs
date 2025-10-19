import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const root = resolve(process.cwd());
const tokensPath = resolve(root, 'tokens', 'tokens.json');
const outPath = resolve(root, 'src', 'styles', 'hero.tokens.js');

const json = JSON.parse(await readFile(tokensPath, 'utf8'));
const hero = json.hero ?? {};
const data = {
  stars: Array.isArray(hero.stars) ? hero.stars : [],
  orbs: Array.isArray(hero.orbs) ? hero.orbs : []
};

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, `export const HERO_TOKENS = ${JSON.stringify(data, null, 2)};\n`, 'utf8');
console.log('[emit-hero] wrote', outPath);
