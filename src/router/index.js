import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
// import Home from '../views/DashboardPage.vue';
import Forest from '../views/shop_page/shop_page.vue';
import ItemIdentifier from '../views/ItemIdentifier.vue';
import Quiz from '../views/Education/Quiz.vue';
import Video from '../views/Education/Video.vue';
import Leaderboard from '../views/Leaderboard.vue';
import DashboardPage from '../views/DashboardPage.vue';


const routes = [
  { path: '/', component: Login },
  { path: '/Register', component: Register },
  { path: '/Dashboard', component: DashboardPage },
  { path: '/Forest', component: Forest },
  { path: '/ItemIdentifier', component: ItemIdentifier },
  { path: '/Education/Quiz', component: Quiz },
  { path: '/Education/Video', component: Video },
  { path: '/Leaderboard', component: Leaderboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
