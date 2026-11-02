const js = require('@eslint/js');
const globals = require('globals');
module.exports = [js.configs.recommended,
  { files: ['**/*.js', '**/*.cjs'], languageOptions: { ecmaVersion: 'latest', sourceType: 'commonjs', globals: { ...globals.browser, ...globals.node } }, rules: { 'no-unused-vars': ['error', { caughtErrors: 'none', argsIgnorePattern: '^_' }] } }
];
