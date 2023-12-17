import { createRouter, createWebHistory } from 'vue-router';
import DiscussionBox from '@/views/DiscussionBox.vue'; // Adjust the path as needed
import LoginPage from '@/views/LoginPage.vue'; // Adjust the path as needed
import store from '@/store/store.js'; // Adjust the path as needed
const routes = [
  {
    path: '/home',
    name: 'Home',
    component: DiscussionBox,
    
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
  },
  // Add more routes as needed
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;// Mettez ici la logique pour vérifier si l'utilisateur est authentifié, par exemple, en utilisant Vuex.
  if (to.name !== 'Login' && !isAuthenticated) {
    next('/login'); // Redirige vers la page de connexion si l'authentification est requise et l'utilisateur n'est pas authentifié
  } else {
    next(); // Continuez la navigation normalement
  }
});

export default router;