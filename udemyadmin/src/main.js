import Vue from 'vue'
import App from './App.vue'
import routes from "./routes/routes";
import store from "./store";
import VueRouter from "vue-router";
import axios from "axios";
import BootstrapVue from 'bootstrap-vue';
import Vuetify from "vuetify";
import Antd from "ant-design-vue";
import VueMaterial from "vue-material";


import "vue-material/dist/vue-material.min.css";
import "vuetify/dist/vuetify.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "ant-design-vue/dist/antd.css"


export const router = new VueRouter({
  routes, // short for routes: routes
  mode: "history",
  linkExactActiveClass: "nav-item active"
});

axios.defaults.baseURL = "http://localhost:3003/";

Vue.use(Vuetify)
Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Antd);
Vue.use(VueMaterial);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store
})
