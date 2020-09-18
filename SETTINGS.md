# Setting for Visual Studio Code

settings.json
```
{
    "editor.codeActionsOnSave": {
        "source.fixAll": true
    },
    "vetur.format.defaultFormatterOptions": {
        "js-beautify-html": {
            "wrap_attributes": "force-expand-multiline"
        },
        "prettyhtml": {
            "printWidth": 100,
            "singleQuote": false,
            "wrapAttributes": false,
            "sortAttributes": false
        },
        "prettier": {
            "singleQuote": true,
            "semi": false,
        }
    },
    "window.zoomLevel": 0,
   "vetur.format.defaultFormatter.ts": "prettier-tslint",
    "vetur.format.defaultFormatter.js": "prettier-eslint",
    "[vue]": {
        "editor.defaultFormatter": "octref.vetur"
    },
    "[typescript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "[javascript]": {
        "editor.defaultFormatter": "dbaeumer.vscode-eslint"
    },
    "debug.node.autoAttach": "off",
    "javascript.updateImportsOnFileMove.enabled": "always",
    "typescript.updateImportsOnFileMove.enabled": "always",
    "stylelint.autoFixOnSave": true,
    "eslint.validate": [
        "vue",
        "html",
        "javascript",
        "typescript"
    ],
    "eslint.workingDirectories": [{ "pattern": "./packages/**"}, { "pattern": "*" }],
    "vetur.validation.template": false,
   
}
```

## Recommended plugins for these settings:
You can run them in the terminal:

```
code --install-extension dbaeumer.vscode-eslint
code --install-extension hex-ci.stylelint-plus
code --install-extension sibiraj-s.vscode-scss-formatter
```