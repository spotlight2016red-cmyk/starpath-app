// style-dictionary.config.js
const { readFileSync } = require('fs');
const path = require('path');

const tokens = JSON.parse(
  readFileSync(path.join(__dirname, 'tokens/tokens.json'), 'utf-8')
);

const toCssVarName = (pathArr) =>
  '--' + pathArr.join('-').replace(/[A-Z]/g, m => '-' + m.toLowerCase()).replace(/\./g, '-');

function walk(obj, prefix = []) {
  const out = {};
  Object.entries(obj).forEach(([k, v]) => {
    const key = k.replace(/\s+/g, '');
    if (v && typeof v === 'object' && !('value' in v)) {
      Object.assign(out, walk(v, [...prefix, key]));
    } else if (v && typeof v === 'object' && 'value' in v) {
      out[toCssVarName([...prefix, key])] = v.value;
    } else {
      out[toCssVarName([...prefix, key])] = v;
    }
  });
  return out;
}

const flat = {
  ...walk(tokens.color, ['color']),
  ...walk(tokens.typography, ['font']),
  ...walk(tokens.radius, ['radius']),
  ...walk(tokens.space, ['space']),
  ...walk(tokens.shadow, ['shadow']),
  ...walk(tokens.motion, ['motion']),
  ...walk(tokens.component, ['component']),
  ...walk(tokens.layout, ['layout']),
  ...walk(tokens.grid, ['grid']),
  ...walk(tokens.animation, ['anim'])
};

const heroData = {
  stars: tokens.hero?.stars ?? [],
  orbs: tokens.hero?.orbs ?? []
};

module.exports = {
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'src/styles/',
      files: [
        {
          destination: 'tokens.css',
          format: function() {
            const lines = Object.entries(flat)
              .map(([k, v]) => `  ${k}: ${String(v)};`)
              .join('\n');
            return `:root{\n${lines}\n}\n`;
          }
        },
        {
          destination: 'hero.tokens.js',
          format: function() {
            return `export const HERO_TOKENS = ${JSON.stringify(heroData, null, 2)};\n`;
          }
        }
      ]
    }
  }
};