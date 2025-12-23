import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  prettier,
  ...nextTs,
  ...nextVitals,
  globalIgnores(['out/**', '.next/**', 'build/**', 'next-env.d.ts']),
  {
    rules: {
      'no-console': 'error',
      'no-debugger': 'error',

      // TypeScript specific rules
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',

      // React
      'react/jsx-key': 'error',
      'react/self-closing-comp': 'error',
      'react/no-array-index-key': 'warn',
      'react/jsx-no-duplicate-props': 'error',
      'react/jsx-curly-brace-presence': ['error', 'never'],

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Import rules
      'import/no-duplicates': 'error',
    },
  },
]);

export default eslintConfig;
