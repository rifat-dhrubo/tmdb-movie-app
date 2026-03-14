// @ts-check
import { tanstackConfig } from '@tanstack/eslint-config';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import sortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import eslint from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import reactHooks from 'eslint-plugin-react-hooks';
import { globalIgnores } from 'eslint/config';
const __dirname = dirname(fileURLToPath(import.meta.url));
const tsconfigPath = resolve(__dirname, './tsconfig.json');
import pluginRouter from '@tanstack/eslint-plugin-router';
export default tseslint.config(
	// Base configurations
	eslint.configs.recommended,
	eslintPluginPrettierRecommended,
	reactPlugin.configs.flat.recommended,
	reactPlugin.configs.flat['jsx-runtime'],
	tseslint.configs.recommendedTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	reactHooks.configs.flat.recommended,
	jsxA11y.flatConfigs.recommended,
	tanstackConfig,
	globalIgnores(['./dist/', './node_modules/', './public/']),

	// Configuration for non-TypeScript files
	{
		files: ['**/*.js', '**/*.mjs', 'dist/**/*.js', 'dist/**'],
		extends: [tseslint.configs.disableTypeChecked],
		settings: {
			react: {
				version: 'detect',
			},
		},
	},

	// Configuration for TypeScript files (with type information)
	{
		files: ['**/*.ts', '**/*.tsx'],
		ignores: ['dist/**/*.ts', 'dist/**', '**/*.mjs', 'eslint.config.mjs'],
		languageOptions: {
			parserOptions: {
				project: [tsconfigPath],
				tsconfigRootDir: __dirname,
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			'sort-destructure-keys': sortDestructureKeys,
			'@tanstack/router': pluginRouter,
		},
		settings: {
			react: {
				version: 'detect',
			},
		},
		rules: {
			// Enforce project UI/UX conventions
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: 'react',
							importNames: [
								'useState',
								'useEffect',
								'useMemo',
								'useRef',
								'useCallback',
								'useReducer',
								'useContext',
								'useLayoutEffect',
								'useInsertionEffect',
							],
							message:
								'Use React.<hook>() instead of named imports to match project conventions.',
						},
					],
				},
			],
			// Prefer ternary over logical AND (&&) in JSX expressions
			'no-restricted-syntax': [
				'error',
				{
					selector: "JSXExpressionContainer > LogicalExpression[operator='&&']",
					message:
						'Use a ternary (condition ? <Component /> : null) instead of && in JSX to avoid rendering falsy values.',
				},
			],
			'import/order': [
				'warn',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
						'object',
					],
					'newlines-between': 'always',
					alphabetize: {
						order: 'asc',
						caseInsensitive: true,
					},
				},
			],
			'react/jsx-sort-props': [
				1,
				{
					callbacksLast: true,
					shorthandFirst: true,
					multiline: 'last',
					noSortAlphabetically: false,
					reservedFirst: true,
				},
			],
			'react/react-in-jsx-scope': 'off',
			'react/prop-types': 'off',
			'react/self-closing-comp': 'warn',
			'sort-destructure-keys/sort-destructure-keys': [
				1,
				{ caseSensitive: false },
			],
			'import/no-default-export': 'error',
			'@typescript-eslint/no-unused-vars': 'error',
			'@typescript-eslint/await-thenable': 'warn',
			/** Permit `throw new Redirect` w/ @typescript-eslint's strict config */
			'@typescript-eslint/only-throw-error': [
				'warn',
				{
					allow: ['Redirect', 'NotFoundError'],
					allowThrowingAny: false,
					allowThrowingUnknown: false,
				},
			],
			'import/no-cycle': 'off',
		},
	},
	{
		files: [
			'**/commitlint.config.ts',
			'**/orval.config.ts',
			'**/vite.config.ts',
		],
		rules: {
			'import/no-default-export': 'off',
		},
	},
);
