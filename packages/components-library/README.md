# About

This is the reusable Vue component styleguide for Molgenis.

## Development

```bash
git clone git@github.com:molgenis/molgenis-frontend.git
cd molgenis-frontend/packages/components-library
yarn
yarn serve  # Serve styleguide
yarn build  # Distribution build
yarn unit  # Run the test suite
yarn lint  # Lint files
```

## Usage

The Vue components library depends on a few third-party libraries.
Dependencies that you need:

```bash
yarn add @fortawesome/fontawesome-free@5.14
yarn add @fortawesome/fontawesome-svg-core@1.2
yarn add @fortawesome/free-solid-svg-icons@5.14
yarn add @fortawesome/vue-fontawesome@2.0
yarn add bootstrap-vue@2.17
yarn add vue-slider-component@3.2
yarn add vue2-daterange-picker@0.5
yarn add vuedraggable@2.23
```

```javascript
// Required for all components
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCaretRight, faExclamationTriangle, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faCaretRight, faExclamationTriangle, faSpinner, faTimes)
Vue.component('FontAwesomeIcon', FontAwesomeIcon)

// DateTimeFilter
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
Vue.component('DateRangePicker', DateRangePicker)

// RangeFilter, NumberFilter
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'
Vue.component('VueSlider', VueSlider)

// FilterContainer
import draggable from 'vuedraggable'
Vue.component('draggable', draggable)
```

> See [preview-build](https://preview-frontend-pr-[PR_NUMBER].dev.molgenis.org/styleguide) when reviewing a PR
