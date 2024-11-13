import { createRouter, createWebHistory } from 'vue-router';
import AuthContainer from '../components/AuthContainer.vue';
import Forest from '../views/shop_page/shop_page.vue';
import ItemIdentifier from '../views/ItemIdentifier.vue';
import Quiz from '../views/Education/Quiz.vue';
import Video from '../views/Education/Video.vue';
import Leaderboard from '../views/Leaderboard.vue';
import DashboardPage from '../views/DashboardPage.vue';
import UnauthorizedView from '../views/UnauthorizedView.vue';
import { authGuard } from './authGuard';

const routes = [
  { 
    path: '/', 
    component: AuthContainer
  },
  { 
    path: '/unauthorized',
    component: UnauthorizedView
  },
  { 
    path: '/Dashboard', 
    component: DashboardPage
  },
  { 
    path: '/Forest', 
    component: Forest
  },
  { 
    path: '/RecycleNow', 
    component: ItemIdentifier
  },
  { 
    path: '/Education/Quiz', 
    component: Quiz
  },
  { 
    path: '/Education/Video', 
    component: Video
  },
  { 
    path: '/Leaderboard', 
    component: Leaderboard
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0, left: 0 };
  }
});

router.beforeEach(authGuard);

export default router;
