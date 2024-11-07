import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';

const userName = ref(null);

export const useAuth = () => {
  const loadSession = () => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      userName.value = storedUserName; // Restore the user's name from sessionStorage
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

    // Query the database for the user based on the username
    const { data, error } = await supabase
      .from('AuthTable')
      .select('*') // Fetch all columns
      .eq('username', username) // Only search by username
      .single(); // Ensure we get a single row

    if (error) {
      console.error('Login error:', error.message);
      return false;
    }

    if (data) {
      console.log('Password input:', password);
      console.log('Fetched user password:', data.password);

      // Check password
      const isPasswordValid = (data.password === null || data.password === "" || data.password === password);

      if (isPasswordValid) {
        userName.value = data.username || username; // Store username in Vue state
        sessionStorage.setItem('userName', data.username || username); // Store in sessionStorage
        return true;
      } else {
        console.error('Invalid password.');
        return false;
      }
    }

    return false; // No user found with the provided username
  };

  const logout = () => {
    userName.value = null; // Clear the username from state
    sessionStorage.removeItem('userName'); // Clear from sessionStorage
  };

  return { userName, login, logout };
};
