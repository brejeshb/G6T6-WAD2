import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';

const userName = ref(null);
export const useAuth = () => {
  const loadSession = () => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      userName.value = storedUserName; // Restore the user's name if it exists in sessionStorage
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


    console.log('Fetched data:', data);
    console.log('Login error:', error);


    if (error) {
      console.error('Login error:', error.message);
      return false;
    }


    if (data) {
      console.log('Password input:', password);
      console.log('Fetched user password:', data.password);

      const isPasswordValid = data.password === password || data.password === null;

      if (isPasswordValid) {
        userName.value = data.username || username;
        sessionStorage.setItem('userName', data.username || username);
        return true;
      }
    }

    return false;
  };

  const logout = () => {
    userName.value = null; // Clear the username in memory
    sessionStorage.removeItem('userName'); // Remove the username from sessionStorage
  };

  return { userName, login, logout };
};
