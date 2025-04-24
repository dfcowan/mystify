// plugins/vuetify.js
import 'vuetify/styles'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import { createVuetify, type ThemeDefinition } from 'vuetify'
import { aliases, fa } from 'vuetify/iconsets/fa'
import { VDateInput } from 'vuetify/labs/VDateInput'

const myCustomLightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#FFFFFF',
    surface: '#FFFFFF',
    primary: '#6200EE',
    'primary-darken-1': '#3700B3',
    secondary: '#03DAC6',
    'secondary-darken-1': '#018786',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
  },
}

export default createVuetify({
  components: {
    VDateInput,
  },
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
  theme: {
    defaultTheme: 'myCustomLightTheme',
    themes: {
      myCustomLightTheme,
    },
  },
})
