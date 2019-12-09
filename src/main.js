import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'popper.js'
import $ from 'jquery'
import axios from 'axios'
// import Router from 'vue-router'

Vue.config.productionTip = false
Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost:3333/',
  timeout: 2500
});
Vue.prototype.$ = $;

new Vue({
  render: h => h(App),
}).$mount('#app')
