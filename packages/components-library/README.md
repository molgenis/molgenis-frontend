# About

This is the component styleguide for Molgenis. It contains Vue components
that we want to reuse in multiple projects. The styleguide is based on
styleguidist.

## Development

```bash
git clone git@github.com:molgenis/molgenis-frontend.git
cd molgenis-frontend/packages/components-library
yarn install
yarn serve
yarn build  # Build a distribution build
yarn unit  # Run the test suite
yarn lint  # Lint files
```

## Usage

The components library depends on a few third-party libraries. You
have to include these in your own Vue application build:

```javascript
import Vue from 'vue'

import DateRangePicker from 'vue2-daterange-picker'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSlider from 'vue-slider-component'

Vue.use(BootstrapVue)

import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import 'vue-slider-component/theme/default.css'
```

> See [preview-build](https://preview-frontend-pr-[PR_NUMBER].dev.molgenis.org/styleguide) when reviewing a PR
