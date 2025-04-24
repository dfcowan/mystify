import '@/assets/main.css'

import { createApp } from 'vue'

import pinia from '@/plugins/pinia'
import vuetify from '@/plugins/vuetify'

import App from '@/App.vue'
import router from '@/router'
import Highcharts from 'highcharts'
import Gantt from 'highcharts/modules/gantt'
import HighchartsVue from 'highcharts-vue'
import VueApexCharts from 'vue3-apexcharts'

Gantt(Highcharts)

const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(HighchartsVue)
app.use(VueApexCharts)

app.mount('#app')
