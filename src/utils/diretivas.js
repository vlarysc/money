import Vue from 'vue'
import moment from 'moment'

Vue.directive('money-format', (el, { value }) => {
  el.innerHTML = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumIntegerDigits: 2
  }).format(value || 0)
})

Vue.directive('date-format', (el, { value }) => {
  el.innerHTML = moment(value).format('DD/MM/YYYY [às] HH:mm:ss')
})
