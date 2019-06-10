import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";
import Antd from "ant-design-vue";
//import mdbvue from 'mdbvue'
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import lodash from 'lodash'
import VueLodash from 'vue-lodash'

Vue.use(VueLodash, lodash)

//router setup
import routes from "./routes/routes";
import store from "./store";
//import { cart } from './mixins/addcart';

import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "ant-design-vue/dist/antd.css";
//import 'mdbvue/build/css/mdb.css'

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  mode: "history",
  linkExactActiveClass: "nav-item active"
});

// Sync router with store
//import { sync } from 'vuex-router-sync'
// Sync store with router
//  sync(store, router)

axios.defaults.baseURL = "http://localhost:3003/";

export const serverBus = new Vue();

Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(BootstrapVue);
Vue.use(Antd);

Vue.use(VueMaterial);
//Vue.use(mdbvue)
export const bus = new Vue();

new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");
