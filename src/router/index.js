import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';
import Forest from '../views/Forest.vue';
import ItemIdentifier from '../views/ItemIdentfier.vue';
import Quiz from '../views/Education/Quiz.vue';
import Video from '../views/Education/Video.vue';

const routes = [
  { path: '/', component: Login},
  { path: '/Home', component: Home },
  { path: '/Forest', component: Forest },
  { path: '/ItemIdentifier', component: ItemIdentifier },
  { path: '/Education/Quiz', component: Quiz },
  { path: '/Education/Video', component: Video },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;