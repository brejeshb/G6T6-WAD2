<template>
  <div class="form-container">
    <!-- Close Button -->
    <button class="close-button" @click="$emit('close-form')">×</button>

    <img src="../../assets/images/logo.png" alt="Logo" class="logo" />
    
    <div class="form-content">
      <div class="input-group">
        <input 
          type="text"
          placeholder="Username" 
          v-model="username"
          class="auth-input my-2"
        />
        <input 
          type="password" 
          placeholder="Password"
          v-model="password"
          class="auth-input my-2"
        />
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>

      <button 
        class="login-button my-2"
        :disabled="isLoading"
        @click="handleSubmit"
      >
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </button>

      <div class="switch-mode-link">
        Need an account? 
        <button 
          class="switch-mode-button"
          @click="$emit('switch-mode', 'register')"
        >
          Sign up
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuth } from '../../lib/auth'; // Adjust the path to auth.js

const emit = defineEmits(['switch-mode', 'auth-success']);

const username = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref('');

const { login } = useAuth(); // Access the login function from useAuth()

async function handleSubmit() {
  isLoading.value = true;
  error.value = ''; // Clear any previous errors

  try {
    // Attempt to login
    const success = await login(username.value.trim(), password.value.trim());

    if (success) {
      emit('auth-success'); // If login is successful, emit auth-success
    } else {
      error.value = 'Invalid username or password'; // Handle invalid credentials
    }
  } catch (err) {
    console.error('Login error:', err);
    error.value = 'An error occurred during login'; // Handle any network or query errors
  } finally {
    isLoading.value = false; // Stop loading
  }
}
</script>

<style scoped>
/* General Container for Vertical Centering */
.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  position: relative; /* Needed for positioning the close button */
}

/* Close Button */
.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 30px;
  cursor: pointer;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: rgba(255, 255, 255, 1);
}

/* Logo */
.logo {
  width: 150px;
  margin-bottom: 40px;
  display: block;
}

/* Form Content */
.form-content {
  width: 100%;
  max-width: 400px;
  text-align: center;
}

/* Input Styling */
.auth-input {
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  width: 100%;
}

.auth-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

/* Submit Button Styling */
.login-button {
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

.login-button:hover {
  background-color: #8a9952;
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Error Message Styling */
.error-message {
  color: #ff6b6b;
  font-size: 14px;
  margin-top: 5px;
}

/* Divider Styling */
.divider {
  text-align: center;
  margin: 20px 0;
  position: relative;
}

.divider::before,
.divider::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 45%;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.divider::before {
  left: 0;
}

.divider::after {
  right: 0;
}

.divider span {
  background: transparent;
  padding: 0 10px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
}

/* Switch Mode Link Styling */
.switch-mode-link {
  text-align: center;
  margin-top: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.switch-mode-button {
  color: #798645;
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  text-decoration: none;
}

.switch-mode-button:hover {
  text-decoration: underline;
}
</style>
