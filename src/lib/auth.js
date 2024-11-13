import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from './supabaseClient';
import router from '../router'; // Import the router instance directly

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userName: null
  }),

  actions: {
    async login(username, password) {
      if (typeof username !== 'string') {
        console.error('Invalid username provided');
        return false;
      }

      const { data, error } = await supabase
        .from('AuthTable')
        .select('*')
        .eq('username', username)
        .single();

      if (error) {
        console.error('Login error:', error.message);
        return false;
      }

      if (data) {
        const isPasswordValid = (data.password === null || data.password === "" || data.password === password);

        if (isPasswordValid) {
          this.userName = data.username || username;
          localStorage.setItem('userName', data.username || username);
          return true;
        } else {
          console.error('Invalid password.');
          return false;
        }
      }

      return false;
    },

    logout() {
      this.userName = null;
      localStorage.removeItem('userName');
      router.push('/');
    },

    async deleteUser() {
      try {
        if (!this.userName) {
          throw new Error('No user logged in');
        }

        const { error } = await supabase
          .from('AuthTable')
          .delete()
          .eq('username', this.userName);

        if (error) {
          throw error;
        }

        console.log('User deleted successfully.');
        this.userName = null;
        localStorage.removeItem('userName');
        
        // Navigate first, then clean up
        await router.push('/');
        
      } catch (error) {
        console.error('Error deleting user:', error.message);
      }
    },

    initializeStore() {
      const storedUserName = localStorage.getItem('userName');
      if (storedUserName) {
        this.userName = storedUserName;
      }
    }
  },

  persist: {
    enabled: true,
    strategies: [{
      key: 'auth',
      storage: localStorage,
    }],
  },
});

export const useAuth = () => {
  const authStore = useAuthStore();

  // Initialize store when using the composable
  onMounted(() => {
    authStore.initializeStore();
  });

  return {
    userName: authStore.userName,
    login: authStore.login,
    logout: authStore.logout,
    deleteUser: authStore.deleteUser
  };
};