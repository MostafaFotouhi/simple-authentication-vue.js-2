import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend,
  localeChanged,
} from "vee-validate";
import { required, alpha, max, min, email } from "vee-validate/dist/rules";
import fa from "vee-validate/dist/locale/fa.json";
// import { from } from "core-js/fn/array";
import 'animate.css';

localize("fa", { ...fa, names: { Name: "نام" , Password: 'رمز', Email: 'پست الکترونیک', Role: 'نقش'} });
localeChanged();
extend("required", required);
extend("alpha", alpha);
extend("max", max);
extend("min", min);
extend("email", email);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
