import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import $ from 'jquery';
import axios from 'axios';
import Router from 'vue-router';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

import config from './config';

Vue.prototype.axios = axios.create({
    baseURL: config.apiUrl,
    timeout: 2500
});
Vue.prototype.$ = $;

import BoardsList from './components/BoardsList/BoardsList.vue';
import Board from './components/Board/Board.vue';

Vue.use(Router);
const router = new Router({
    routes: [
        {
            name: 'Home',
            path: '/',
            component: BoardsList
        },
        {
          name: 'Board',
          path: '/board',
          component: Board
        }
    ]
});

new Vue({
    render: h => h(App),
    router
}).$mount('#app');
