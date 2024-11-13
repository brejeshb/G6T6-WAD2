<template>
    <div class="unauthorized-container texture">
      <div class="content-wrapper">
        <div class="text-section">
          <h1 class="title">
            <span>LoginLah!</span>
          </h1>
          <button @click="redirectToAuth" class="auth-button">
            Back to Login
          </button>
        </div>
        
        <div class="shield-section">
          <svg class="shield-svg" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg">

            <path class="shield-base" d="M100 10 L180 50 V130 C180 180 100 220 100 220 C100 220 20 180 20 130 V50 L100 10Z" />
            

            <path class="shield-border" d="M100 20 L170 55 V125 C170 170 100 205 100 205 C100 205 30 170 30 125 V55 L100 20Z" />
            

            <rect class="lock-body" x="70" y="95" width="60" height="50" rx="10" />
            <rect class="lock-shackle" x="85" y="65" width="30" height="40" rx="15" fill="none" stroke-width="12" />
          </svg>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  
  const redirectToAuth = () => {
    router.push('/');
  };
  </script>
  
  <style scoped>
  .unauthorized-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #F2EED7;
    position: relative;
    overflow: hidden;
  }
  
  .texture {
    background-image: url("/img/shattered.png");
    background-size:40%;
    background-position: center;
    background-repeat: repeat;

  }
  
  .content-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8rem;
    width: 100%;
    max-width: 1200px;
    padding: 2rem;
  }
  
  .text-section {
    flex: 1;
    max-width: 400px;
  }
  
  .title {
    font-size: 4.5rem;
    font-weight: 700;
    color: #798645;
    margin-bottom: 2rem;
    line-height: 1;
  }
  
  .auth-button {
    background-color: #798645;
    color: #FEFAE0;
    border: none;
    border-radius: 8px;
    padding: 1rem 2.5rem;
    font-size: 1.2rem;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .auth-button:hover {
    background-color: #626F47;
    transform: translateY(-2px);
  }
  
  .shield-section {
    flex: 1;
    max-width: 500px;
    transform: perspective(1000px) rotateY(-20deg);
    transition: transform 0.5s ease;
  }
  
  .shield-section:hover {
    transform: perspective(1000px) rotateY(-10deg);
  }
  
  .shield-svg {
    width: 100%;
    height: auto;
    filter: drop-shadow(5px 5px 15px rgba(0, 0, 0, 0.2));
  }
  
  .shield-base {
    fill: #798645;
    filter: brightness(0.9);
  }
  
  .shield-border {
    fill: #626F47;
  }
  
  .lock-body {
    fill: #FEFAE0;
    stroke: #626F47;
    stroke-width: 4;
  }
  
  .lock-shackle {
    stroke: #FEFAE0;
  }
  
  /* Responsive Design */
  @media (max-width: 1024px) {
    .content-wrapper {
      gap: 4rem;
    }
    
    .title {
      font-size: 3.5rem;
    }
    
    .shield-section {
      max-width: 400px;
    }
  }
  
  @media (max-width: 768px) {
    .content-wrapper {
      flex-direction: column-reverse;
      gap: 3rem;
      text-align: center;
    }
    
    .shield-section {
      max-width: 300px;
      transform: perspective(1000px) rotateY(0deg);
    }
    
    .title {
      font-size: 3rem;
    }
  }
  
  @media (max-width: 480px) {
    .title {
      font-size: 2.5rem;
    }
    
    .shield-section {
      max-width: 200px;
    }
    
    .auth-button {
      padding: 0.8rem 2rem;
      font-size: 1rem;
    }
  }
  </style>