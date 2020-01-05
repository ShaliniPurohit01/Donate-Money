import Vue from "vue";
import App from "./App.vue";
import Notifications from "vue-notification";
import VTooltip from "v-tooltip";

Vue.config.productionTip = false;
Vue.use(Notifications);
Vue.use(VTooltip);

new Vue({
  render: h => h(App)
}).$mount("#app");
