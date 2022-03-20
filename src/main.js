import Vue from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import api from './api';

Vue.use(Antd);
Vue.use(api);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
