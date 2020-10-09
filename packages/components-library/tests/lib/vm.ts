import { createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
// @ts-ignore
import DateRangePicker from 'vue2-daterange-picker'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSlider from 'vue-slider-component'


/**
 * Include all third-party components in all
 * Vue test instances.
 */
export default function getLocalVue():any {
    const localVue = createLocalVue()
    localVue.use(BootstrapVue)
    localVue.component('FontAwesomeIcon', FontAwesomeIcon)
    localVue.component('DateRangePicker', DateRangePicker)
    localVue.component('VueSlider', VueSlider)
    return localVue
}