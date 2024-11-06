<template>
    <div class="auth-page" @click="handleOutsideClick">
      <!-- Video Background -->
      <video autoplay muted loop playsinline class="background-video">
        <!-- <source src="../assets/movingtrash-unscreen.gif" type="image/gif "> -->

        <source :src="currentVideo" type="video/mp4">
      </video>
      
      <!-- Main container -->
      <div class="main-content">
        <!-- Quote Section -->
        <div class="quote-section" :class="{ 'shift-left': showAuthForm }">
          <div class="quote-container">
            <p class="quote">{{ currentQuote }}</p>
            <button class="start-button" @click.stop="showAuthForm = true" v-if="!showAuthForm">
              Get Started
            </button>
          </div>
        </div>
  
        <!-- Auth Container -->
        <div class="auth-container" :class="{ 'show': showAuthForm }" @click.stop>
          <div class="auth-form">
            <!-- Dynamic component (Login/Register) -->
            <component 
              :is="currentView" 
              @switch-mode="switchMode"
              @auth-success="handleAuthSuccess"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, defineAsyncComponent } from 'vue';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const showAuthForm = ref(false);
  
  // Lazy load the components
  const LoginForm = defineAsyncComponent(() => import('./AuthForms/LoginForm.vue'));
  const RegisterForm = defineAsyncComponent(() => import('./AuthForms/RegisterForm.vue'));
  
  const currentView = ref(LoginForm);
  
  // Define quotes
  const quotes = [
    "Skibidi quote 1",
    "Skibidi quote 2",
    "Skibidi quote 3",
    "Skibidi quote 4",
    "Skibidi quote 5"
  ];
  
  // Select a random quote
  const currentQuote = ref(quotes[Math.floor(Math.random() * quotes.length)]);
  
  // Define video file paths (use public/assets path for Vue project)
  const vids = [
  "/src/assets/batteryvid.mp4", 
  "/src/assets/picktrash.mp4", 
  "/src/assets/picktrash2.mp4",
  "/src/assets/movingtrash.mp4"
];

  // Select a random video
  const currentVideo = ref(vids[Math.floor(Math.random() * vids.length)]);
  
  // Debug the current video path
  console.log('Current video:', currentVideo.value);
  
  // Switch between Login and Register forms
  const switchMode = (mode) => {
    currentView.value = mode === 'login' ? LoginForm : RegisterForm;
  };
  
  // Handle successful authentication
  const handleAuthSuccess = () => {
    router.push('/Dashboard');
  };
  
  // Close auth form on outside click
  const handleOutsideClick = () => {
    if (showAuthForm.value) {
      showAuthForm.value = false;
    }
  };
  </script>
  
  <style scoped>
  .auth-page {
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
  
  .auth-page::before {
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
  
  .quote-section.shift-left {
    transform: translateX(-25%);
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
  
  .auth-container {
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
  
  .auth-container.show {
    right: 0;
  }
  
  .auth-form {
    color: white;
    max-width: 400px;
    margin: 0 auto;
  }
  
  @media (max-width: 1024px) {
    .auth-container {
      width: 100%;
      right: -100%;
    }
  
    .quote {
      font-size: 36px;
    }
  
    .quote-section.shift-left {
      transform: translateX(-100%);
    }
  }
  
  @media (max-width: 768px) {
    .quote {
      font-size: 28px;
    }
  
    .auth-container {
      padding: 40px 20px;
    }
  }
  </style>
  