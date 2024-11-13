<template>
  <div class="form-container">
    <button @click="$emit('close-form')" class="close-button">×</button>
    <img src="../../assets/images/logo.png" alt="Logo" class="logo" />

    <div class="form-content">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-[#798645]">Create Account</h2>
        <p class="mt-2 text-sm text-[#626F47]">Join our community today</p>
      </div>

      <form @submit.prevent="handleSubmit" class="mt-8 space-y-6">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-[#626F47]">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="auth-input"
              placeholder="Choose a username"
            />
            <p v-if="usernameError" class="mt-1 text-xs text-red-500">{{ usernameError }}</p>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-[#626F47]">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="auth-input"
              placeholder="Create a password"
            />
          </div>

          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-[#626F47]">Confirm Password</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              required
              class="auth-input mb-4"
              placeholder="Confirm your password"
            />
            <p v-if="passwordError" class="mt-1 text-xs text-red-500">{{ passwordError }}</p>
          </div>
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="submit-btn"
        >
          {{ isLoading ? 'Creating account...' : 'Create Account' }}
        </button>

        <div class="text-center">
          <button
            type="button"
            class="switch-mode-btn"
            @click="$emit('switch-mode', 'login')"
          >
            Already have an account? Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../lib/auth';
import { supabase } from '../../lib/supabaseClient';

const emit = defineEmits(['close-form', 'switch-mode', 'auth-success']);

const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const passwordError = ref('');
const usernameError = ref('');

const { login } = useAuth();

async function handleSubmit() {
  passwordError.value = '';
  usernameError.value = '';


  if (password.value !== confirmPassword.value) {
    passwordError.value = 'Passwords do not match';
    return;
  }

  isLoading.value = true;

try{
    const { data: existingUsernames, error: usernameErrorCheck } = await supabase
      .from('AuthTable')
      .select('username')

      const isUsernamePresent = existingUsernames.some(item => item.username === username.value);

    if (usernameErrorCheck && usernameErrorCheck.code !== 'PGRST100') {
      throw new Error(usernameErrorCheck.message);
    }

    if (isUsernamePresent) {
      usernameError.value = 'Username already taken. Please choose another.';
      return;
    }


    const date_registered = new Date().toISOString();
    console.log(username.value,password.value)
    const { data, error } = await supabase
      .from('AuthTable')
      .insert([{ 
        username: username.value, 
        password: password.value || null,
        date_registered
      }])
      .select();

    if (error) throw error;

    const success = await login(username.value.trim(), password.value.trim());
    if (success) {
      emit('auth-success');
    } else {
      console.error('Automatic login failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  position: relative; 
}

.close-button {
  position: absolute;
  top: 20px; 
  right: 20px; 
  background: none;
  border: none;
  font-size: 30px;
  color: white;
  cursor: pointer;
  z-index: 10;
  transition: color 0.3s;
}

.close-button:hover {
  color: #ff6b6b;
}

.logo {
  width: 150px;
  margin-bottom: 40px;
  display: block;
}

.form-content {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.auth-input {
  padding: 12px;
  border: 1px solid rgba(121, 134, 69, 0.3); /* Border color similar to LoginForm */
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  width: 100%;
}

.auth-input::placeholder {
  color:white;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background-color: #798645;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-btn:hover {
  background-color: #8a9952;
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Error Message Styling */
.text-xs {
  color: #ff6b6b;
}

.switch-mode-btn {
  color: #798645;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: none;
}

.switch-mode-btn:hover {
  text-decoration: underline;
}
</style>
