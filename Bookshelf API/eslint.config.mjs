import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      globals: globals.node, // Ubah ke globals.node untuk Node.js
    },
  },
  pluginJs.configs.recommended, // Menggunakan konfigurasi ESLint recommended
];
