/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
// Composables
import { createVuetify } from 'vuetify'
import { VTreeview } from 'vuetify/labs/VTreeview'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  components: {
    VTreeview,
  },
  icons: {
    defaultSet: 'mdi',
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
})