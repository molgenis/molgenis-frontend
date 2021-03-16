module.exports = {
    "parserOptions": {
        "ecmaFeatures": {
            "modules": true
        },
        "ecmaVersion": 2020,
        "sourceType": "module"
    },
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "root": true,
    "globals": {
        "globalThis": true
    },
    "ignorePatterns": [],
    "overrides": [
        {
            "files": ["packages/**/*.ts"],
            "parser": "@typescript-eslint/parser",
            "extends": [
                "eslint:recommended",
                "plugin:@typescript-eslint/eslint-recommended",
                "plugin:@typescript-eslint/recommended"
            ],
            "rules": {
                "no-case-declarations": "off",
                "@typescript-eslint/no-empty-function": "off",
                "@typescript-eslint/no-var-requires": "off",
                "@typescript-eslint/explicit-module-boundary-types": "off",
                "@typescript-eslint/no-explicit-any": "off",
                "@typescript-eslint/ban-types": "off",
                "@typescript-eslint/ban-ts-comment": "off"
            }
        },
        {
            "parser": "vue-eslint-parser",
            "files": ["packages/**/*.vue"],
            "extends": [
                "plugin:vue/recommended"
            ],
            "rules": {
                "vue/no-v-html": "off",
                "vue/require-default-prop": "off",
                "vue/max-attributes-per-line": ["error", {
                    "singleline": 3,
                    "multiline": {
                      "max": 2,
                      "allowFirstLine": false
                    }
                }]
            }
        }
    ]
}
