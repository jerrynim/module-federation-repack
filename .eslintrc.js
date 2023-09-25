module.exports = {
	root: true,

	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "prettier", "react"],
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier", "plugin:react/recommended"],
	env: {
		node: true,
		browser: true,
	},
	rules: {
		"prettier/prettier": ["error", { singleQuote: false }],
		"react/react-in-jsx-scope": "off",
		"react-hooks/exhaustive-deps": [
			"off",
			{
				additionalHooks: "useRecoilCallback",
			},
		],
		"react/prop-types": "off",
		"react/display-name": "off",
		"@typescript-eslint/no-var-requires": "off",
		"@typescript-eslint/no-non-null-assertion": "off",
		"@typescript-eslint/ban-ts-comment": "off",
		"max-len": [
			"error",
			120,
			4,
			{
				ignoreUrls: true,
				ignoreComments: true,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
			},
		],
	},
}
