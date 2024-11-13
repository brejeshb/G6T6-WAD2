<!-- This page is notbeing used -->
<template>
  <div class="login-page" @click="handleOutsideClick">
    <video autoplay muted loop playsinline class="background-video">
      <source src="/public/vids/batteryvid.mp4" type="video/mp4">
    </video>

    <div class="main-content">

      <div class="quote-section" :class="{ 'shift-left': showLogin }">
        <div class="quote-container">
          <p class="quote">{{ currentQuote }}</p>
          <button class="start-button" @click.stop="showLogin = true" v-if="!showLogin">
            Get Started
          </button>
        </div>
      </div>

 
      <div class="login-container" :class="{ 'show': showLogin }" @click.stop>
        <div class="login-form">
          <img src="../assets/images/logo.png" alt="Logo" class="logo" />
          
          <div class="input-group">
            <input type="email" placeholder="E-mail" v-model="username" />
            <input type="password" placeholder="Password" v-model="password" />
            <p v-if="errMsg" class="error-message">{{ errMsg }}</p>
          </div>

          <button class="login-button" @click="handleLogin">Sign Up</button>

          <div class="divider">
            <span>or sign up with</span>
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

          <div class="sign-in-link">
            Have an account? <router-link to="/login">Sign in</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from '../../src/lib/auth';

const username = ref("");
const password = ref("");
const errMsg = ref("");
const showLogin = ref(false);
const router = useRouter();
const { login } = useAuth();

const quotes = [
  "Skibidi quote 1",
  "Skibidi quote 2",
  "Skibidi quote 3",
  "Skibidi quote 4",
  "Skibidi quote 5"
];

const currentQuote = ref(quotes[Math.floor(Math.random() * quotes.length)]);

const handleLogin = async () => {
  const success = await login(username.value.trim(), password.value.trim());
  if (success) {
    console.log("Successfully signed in!");
    router.push('/Dashboard');
  } else {
    errMsg.value = "Invalid username or password.";
  }
};

const handleOutsideClick = (event) => {
  if (showLogin.value) {
    showLogin.value = false;
  }
};
</script>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.background-video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  object-fit: cover;
  z-index: -1;
}

.login-page::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.main-content {
  position: relative;
  z-index: 1;
  height: 100vh;
  display: flex;
  align-items: center;
  color: white;
}

.quote-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease-out;
}

.quote-container {
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
}

.quote {
  font-size: 48px;
  line-height: 1.4;
  margin-bottom: 40px;
  font-weight: 300;
}

.start-button {
  padding: 15px 40px;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  font-size: 20px;
  cursor: pointer;
  transition: all 0.2s;
}

.start-button:hover {
  transform: scale(1.05);
  background-color: rgba(255, 255, 255, 0.2);
}

.login-container {
  position: fixed;
  top: 0;
  right: -50%;
  width: 50%;
  height: 100vh;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  padding: 60px 40px;
  transition: right 0.5s ease-out;
  overflow-y: auto;
}

.login-container.show {
  right: 0;
}

.login-form {
  color: white;
  max-width: 400px;
  margin: 0 auto;
}

.logo {
  width: 150px;
  margin: 0 auto 40px;
  display: block;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 30px;
}

.input-group input {
  padding: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.input-group input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

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

.sign-in-link {
  text-align: center;
  margin-top: 20px;
  color: rgba(255, 255, 255, 0.7);
}

.sign-in-link a {
  color: #798645;
  text-decoration: none;
}

@media (max-width: 1024px) {
  .login-container {
    width: 100%;
    right: -100%;
  }

  .quote {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  .quote {
    font-size: 28px;
  }

  .login-container {
    padding: 40px 20px;
  }
}
</style>