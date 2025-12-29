import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import eslint from '@eslint/js';

export default defineConfig(
  {
    ignores: ['dist', 'build', 'node_modules'],
  },
  eslint.configs.recommended,
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      'react-hooks': hooksPlugin,
      '@typescript-eslint': tseslint.plugin,
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      ...reactPlugin.configs.flat.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      'react/react-in-jsx-scope': 'off',
    },
  },
  prettierConfig,
);
