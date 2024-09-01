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
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          background: '#121212',
          primary: '#BB86FC',
          secondary: '#03DAC6',
        },
      },
      light: {
        colors: {
          background: '#FFFFFF',
          primary: '#1A73E8',
          secondary: '#FF4081',
        },
      },
    },
  },
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