import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
	{
		files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: {
				...globals.browser
			},
			parser: typescriptParser
		},
		rules: {
			...eslint.configs.recommended.rules,
			...tseslint.configs.recommended.rules,
			'no-console': 0,
			'linebreak-style': 0,
			'no-shadow': 'off',
			'max-len': [2, { code: 120 }],
			semi: 1,
			'object-curly-spacing': [1, 'always'],
			'object-curly-newline': 0,
			'no-unused-vars': [1, { args: 'after-used', argsIgnorePattern: '^_' }],
			'@typescript-eslint/no-unused-vars': 0
		}
	}
];
