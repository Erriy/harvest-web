import Vue from 'vue'
import VueRouter from 'vue-router';
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import api from './api';
import router from './router';

Vue.use(VueRouter)
Vue.use(Antd);
Vue.use(api);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
