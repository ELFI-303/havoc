import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from '@/router/router.js';
import store from '@/store/store.js';

//axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'https://bbi3cqg9ld.execute-api.eu-west-1.amazonaws.com/test_hellolambda';

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
