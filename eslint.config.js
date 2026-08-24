import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  { ignores: ['dist', 'coverage', 'convertSvgWorldToJsonNodeScript.js'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, reactHooks.configs.flat.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-refresh': reactRefresh,
    },
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    // Route definitions and barrels export values, not components — fast refresh
    // granularity doesn't apply to them.
    files: ['src/app/router/*.tsx', 'src/**/index.tsx', 'src/common/components/Toast/Toast.tsx'],
    rules: {
      'react-refresh/only-export-components': 'off',
    },
  }
);
