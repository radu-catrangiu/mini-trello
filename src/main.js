import Vue from 'vue';
import App from './App.vue';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'popper.js';
import $ from 'jquery';
import axios from 'axios';
import Router from 'vue-router';

Vue.config.productionTip = false;

Vue.prototype.axios = axios.create({
    baseURL: window.location.protocol + "//" + window.location.host + "/",
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
