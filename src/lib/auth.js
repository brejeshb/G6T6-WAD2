import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from './supabaseClient';
import { useRouter } from 'vue-router';


export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();
  const userName = ref(null);

  const loadSession = () => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      userName.value = storedUserName;
    }
  };

  onMounted(() => {
    loadSession();
  });

  const login = async (username, password) => {
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
        userName.value = data.username || username;
        sessionStorage.setItem('userName', data.username || username);
        return true;
      } else {
        console.error('Invalid password.');
        return false;
      }
    }

    return false;
  };

  const logout = () => {
    userName.value = null;
    sessionStorage.removeItem('userName');
  };

  const deleteUser = async () => {
    if (!userName.value) {
      console.error('No user logged in');
      return;
    }
    const { error } = await supabase
      .from('AuthTable')
      .delete()
      .eq('username', userName.value);

    if (error) {
      console.error('Error deleting user:', error.message);
      return;
    }

    console.log('User deleted successfully.');

    logout();
    router.push('/');
  };

  return { userName, login, logout, deleteUser };
});

export const useAuth = () => {
  const authStore = useAuthStore();
  const userName = authStore.userName;
  const login = authStore.login;
  const logout = authStore.logout;
  const deleteUser = authStore.deleteUser;

  return { userName, login, logout, deleteUser };
};
