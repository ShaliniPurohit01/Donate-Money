import Vue from "vue";
import App from "./App.vue";
import Notifications from "vue-notification";
import VTooltip from "v-tooltip";
import VuejsDialog from "vuejs-dialog";
import VuejsDialogMixin from "vuejs-dialog/dist/vuejs-dialog-mixin.min.js";
import "vuejs-dialog/dist/vuejs-dialog.min.css";

Vue.use(Notifications);
Vue.use(VTooltip);
Vue.use(VuejsDialog);

var SocialSharing = require("vue-social-sharing");

Vue.use(SocialSharing);

new Vue({
  render: h => h(App)
}).$mount("#app");
