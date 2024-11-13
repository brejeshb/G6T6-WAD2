import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'vue-router';

const userName = ref(null);

export const useAuth = () => {
  const router = useRouter();
  
  const loadSession = () => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      userName.value = storedUserName; // Restore the user's name from sessionStorage
    }
  };

  onMounted(() => {
    loadSession();
  });

  // Function to log in the user
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

  // Function to log out the user
  const logout = () => {
    userName.value = null; // Clear the username from state
    sessionStorage.removeItem('userName'); // Clear from sessionStorage
  };

  // Function to delete the user from the database
  const deleteUser = async () => {
    if (!userName.value) {
      console.error('No user logged in');
      return;
    }

    // Delete user from the AuthTable by matching the username
    const { error } = await supabase
      .from('AuthTable')
      .delete()
      .eq('username', userName.value);

    if (error) {
      console.error('Error deleting user:', error.message);
      return;
    }

    console.log('User deleted successfully.');

    // After deleting the user, log out and redirect to the login page
    logout();
    router.push('/login'); // Make sure '/login' is the correct route to your login page
  };

  return { userName, login, logout, deleteUser };
};
