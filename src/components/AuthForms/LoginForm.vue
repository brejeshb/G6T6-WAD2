<template>
  <div class="form-container">
    <img src="../../assets/images/logo.png" alt="Logo" class="logo" />
    
    <div class="form-content">
      <div class="input-group">
        <input 
          type="text"
          placeholder="Username" 
          v-model="username"
          class="auth-input"
        />
        <input 
          type="password" 
          placeholder="Password"
          v-model="password"
          class="auth-input"
        />
        <p v-if="error" class="error-message">{{ error }}</p>
      </div>

      <button 
        class="login-button"
        :disabled="isLoading"
        @click="handleSubmit"
      >
        {{ isLoading ? 'Signing in...' : 'Sign In' }}
      </button>

      <div class="divider">
        <span>or sign in with</span>
      </div>

      <div class="social-buttons">
        <button class="social-btn facebook">
          <i class="fab fa-facebook-f"></i>
        </button>
        <button class="social-btn google">
          <i class="fab fa-google"></i>
        </button>
        <button class="social-btn apple">
          <i class="fab fa-apple"></i>
        </button>
      </div>

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
import { supabase } from '../../lib/supabaseClient';

const emit = defineEmits(['switch-mode', 'auth-success']);

const username = ref('');
const password = ref('');
const isLoading = ref(false);
const error = ref('');

async function handleSubmit() {
  isLoading.value = true;
  error.value = ''; // Clear any previous errors

  try {
    // Using supabase login function to validate user credentials
    const { data, error: loginError } = await supabase
      .from('AuthTable')
      .select()
      .eq('username', username.value.trim())
      .eq('password', password.value.trim())
      .single();

    if (loginError) {
      // Handle login error (invalid username/password)
      throw loginError;
    }

    // If user data exists, emit 'auth-success'
    if (data) {
      emit('auth-success');
    } else {
      // If no matching user found
      error.value = 'Invalid username or password';
    }
  } catch (err) {
    // General error handler (for network issues or query errors)
    console.error('Login error:', err);
    error.value = 'An error occurred during login';
  } finally {
    // Stop the loading state
    isLoading.value = false;
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

/* Social Buttons Styling */
.social-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.social-btn:hover {
  background: rgba(255, 255, 255, 0.2);
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
