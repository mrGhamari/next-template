import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier/flat';
import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = defineConfig([
  prettier,
  ...nextTs,
  ...nextVitals,
  globalIgnores([
    'out/**',
    '.next/**',
    'build/**',
    'next-env.d.ts',
  ]),
  {
    rules: {
      'no-console': 'error',
      'no-debugger': 'error',
    },
  },
]);

export default eslintConfig;
