import { WrapperArray } from '@vue/test-utils'
import { createLocalVue } from '@vue/test-utils'
import { BootstrapVue } from 'bootstrap-vue'
// @ts-ignore
import DateRangePicker from 'vue2-daterange-picker'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSlider from 'vue-slider-component'


/**
 * Given a WrapperArray logs the text content for each item in the array
 * @param items
 * @param context optional tag to prepend to log message
 */
export const logWrapperArray = (items: WrapperArray<Vue>, context?: string):void => {
  const prefix = context ? context + ': ' : ''
  for (let i = 0; i < items.length; i++) {
    // eslint-disable-next-line no-console
    console.log(prefix + items.at(i).text())
  }
}

/**
 * Given a WrapperArray and string returns the item from the array that contains the text value as it's text
 * If no item is found with matching text it returns undefined
 * If multiple items a found with matching text it also return undefined
 * @param items
 * @param context optional tag to prepend to log message
 */
export const findItemByText = (items: WrapperArray<Vue>, text: string):any => {
  const filtered = items.filter(i => i.text() === text)
  return filtered.length === 1 ? filtered.at(0) : undefined
}

/**
 * Make all third-party components available from all
 * Filter-related tests that use this method.
 */
export const localVue = ():any => {
    const localVue = createLocalVue()
    localVue.use(BootstrapVue)
    localVue.component('FontAwesomeIcon', FontAwesomeIcon)
    localVue.component('DateRangePicker', DateRangePicker)
    localVue.component('VueSlider', VueSlider)
    return localVue
}
