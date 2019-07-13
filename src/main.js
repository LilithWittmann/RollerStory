import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import * as L from "leaflet";
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false;
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
   iconUrl: require('leaflet/dist/images/marker-icon.png'),
   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
