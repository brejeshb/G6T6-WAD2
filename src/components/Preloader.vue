<template>
    <Transition name="fade">
      <div v-if="isLoading" class="preloader-container">
        <div class="logo-container">
          <img src="/src/assets/images/logo.png" alt="Recycle Logo" class="logo animate-bounce" />
          <div class="loading-bar">
            <div class="loading-progress"></div>
          </div>
          <p class="loading-text">Loading<span class="dots">...</span></p>
        </div>
      </div>
    </Transition>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const isLoading = ref(true);
  const props = defineProps({
    minimumTime: {
      type: Number,
      default: 1000
    }
  });
  
  onMounted(() => {
    // Ensure minimum display time
    setTimeout(() => {
      isLoading.value = false;
    }, props.minimumTime);
  });
  </script>
  
  <style scoped>
  .preloader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #F2EED7;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
  }
  
  .logo-container {
    text-align: center;
  }
  
  .logo {
    width: 150px;
    height: auto;
    margin-bottom: 2rem;
  }
  
  .animate-bounce {
    animation: gentle-bounce 2s infinite;
  }
  
  @keyframes gentle-bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .loading-bar {
    width: 200px;
    height: 4px;
    background-color: #FEFAE0;
    border-radius: 2px;
    margin: 1rem auto;
    overflow: hidden;
  }
  
  .loading-progress {
    width: 30%;
    height: 100%;
    background-color: #798645;
    border-radius: 2px;
    animation: progress 1.5s infinite;
  }
  
  @keyframes progress {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(400%);
    }
  }
  
  .loading-text {
    color: #626F47;
    font-size: 1.2rem;
    margin-top: 1rem;
  }
  
  .dots {
    display: inline-block;
    width: 20px;
    animation: dots 1.5s infinite;
  }
  
  @keyframes dots {
    0%, 20% { content: "."; }
    40% { content: ".."; }
    60% { content: "..."; }
    80%, 100% { content: ""; }
  }
  

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>