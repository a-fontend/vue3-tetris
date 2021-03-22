import { createApp } from "vue";
import { ElButton, ElMessage, ElRow } from "element-plus";
import "element-plus/lib/theme-chalk/index.css";
import App from "./App.vue";

const app = createApp(App);
app.component(ElButton.name, ElButton);
app.component(ElRow.name, ElRow);
app.component(ElMessage.name, ElMessage);
app.mount("#app");
