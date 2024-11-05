import { ref } from 'vue';
import { supabase } from '../lib/supabaseClient'; // Adjust the import path as needed

const userName = ref(null);

export const useAuth = () => {
  const login = async (username, password) => {
    // Ensure username is a string
    if (typeof username !== 'string') {
      console.error('Invalid username provided');
      return false;
    }

    const { data, error } = await supabase
      .from('AuthTable')
      .select('*')
      .eq('username', username)
      .single();

    // Log data and error for debugging
    console.log('Fetched data:', data);
    console.log('Login error:', error);

    // Handle possible errors
    if (error) {
      console.error('Login error:', error.message);
      return false;
    }

    // Check if user data is retrieved
    if (data) {
      console.log('Password input:', password);
      console.log('Fetched user password:', data.password);

      const isPasswordValid = data.password === password || data.password === null;

      if (isPasswordValid) {
        userName.value = data.username || username; // Store the username
        return true;
      }
    }

    return false; // If user doesn't exist or password is invalid
  };

  const logout = () => {
    userName.value = null; // Just clear the username
  };

  return { userName, login, logout };
};
