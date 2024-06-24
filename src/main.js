import { registerPlugins } from "@/plugins";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import vuetify from "./plugins/vuetify";
// import { loadFonts } from "./plugins/webfontloader";
// loadFonts();

const pinia = createPinia();
const app = createApp(App);

// registerPlugins(app);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.mount("#app");
