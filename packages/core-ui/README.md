## Contents
This package contains React components that are used in some plugins of MOLGENIS (including the Data Explorer). Some of the components of the Data Explorer (including the **filters**) are still part of molgenis/molgenis and can be found in `molgenis-dataexplorer/src/main/resources/js/`.

## Developing locally

There is no way to serve and link the code to MOLGENIS. There's a workaround: you will need to copy the `dist` contents to a build of MOLGENIS. Here's how to do it:

1. Edit the code as you please.
2. Run `yarn build`
3. Copy the three created files in the `dist` folder to the MOLGENIS repository (you should have it checked out locally). Put them in `molgenis-core-ui/src/main/resources/js/`.
4. Decide where you need your code and edit the corresponding freemarker template. `molgenis-header.ftl` covers most cases (the data explorer for example).
5. In the freemarker template, find these lines:

```html
        <script src="/@molgenis-ui/core-ui/dist/js/dist/molgenis-vendor-bundle.js"></script>
        <script src="/@molgenis-ui/core-ui/dist/js/dist/molgenis-global.js"></script>
        <script src="/@molgenis-ui/core-ui/dist/js/dist/molgenis-global-ui.js"></script>
```

And replace them with:

```html
        <script src="<@resource_href "/js/molgenis-vendor-bundle.js"/>"></script>
        <script src="<@resource_href "/js/molgenis-global.js"/>"></script>
        <script src="<@resource_href "/js/molgenis-global-ui.js"/>"></script>
```

6. (Re)start MOLGENIS
7. The code from `core-ui` will now be loaded.
8. You need to copy the files and restart MOLGENIS each time you change something in the code.
9. Good luck!

## Bootstrap 4 themes with Sass

Sass code is located in /scss/bootstrap-molgenis-blue.scss. To compile the code for the first time:
```
yarn build-task:scss-compile
yarn dev:theme
```

After the first time just run:
```
yarn dev:theme
```

Currently te sass compiling steps are hardcoded based on the /scss/bootstrap-molgenis-blue.scss 
file. In future we need to do this dynamically to be able to support different themes using the same
pipeline. Matching the bootstrap 3 theme is done manually. 

