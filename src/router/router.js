import { createRouter, createWebHistory } from 'vue-router';
import DiscussionBox from '@/views/DiscussionBox.vue';
import AuthBox from '@/views/AuthBox.vue';
import store from '@/store/store.js';
const routes = [
  {
    path: '/',
    name: 'Home',
    component: DiscussionBox,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: AuthBox,
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (isAuthenticated) {
    next();
  } else {
    const code = to.query.code; // returned by Cognito
    if(code && !store.getters.getUser.id_token){
      await store.dispatch("processCode", {
        code: code
      });
    }
    if(store.getters.isAuthenticated) {
      next();
    } else {
      window.location.href = `https://havoc-messagerie.auth.eu-west-1.amazoncognito.com/oauth2/authorize?client_id=65ebu3b3qcvjci64if0n28l751&response_type=code&scope=email+openid+phone&redirect_uri=${encodeURI("https://di76j5myawn36.cloudfront.net/auth")}`;
    }
  }
});

export default router;