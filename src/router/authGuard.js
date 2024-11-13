import { useAuthStore } from '../lib/auth';

export const authGuard = (to, from, next) => {
  const authStore = useAuthStore();
  const publicPages = ['/', '/unauthorized'];
  const requiresAuth = !publicPages.includes(to.path);

  if (requiresAuth && !authStore.userName) {
    next('/unauthorized');
  } else {
    next();
  }
};