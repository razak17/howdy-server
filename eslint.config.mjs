import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
	...tseslint.configs.recommended,
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
			'no-console': 'off',
			'linebreak-style': 'off',
			'no-shadow': 'off',
			'max-len': ['error', { code: 120 }],
			semi: 'warn',
			'object-curly-spacing': ['warn', 'always'],
			'object-curly-newline': 'off',
			'no-unused-vars': 'warn',
			'@typescript-eslint/no-unused-vars': 'off'
		}
	}
];
