<template>
  <div class="auth-page" @click="handleOutsideClick">
    <video autoplay muted loop playsinline class="background-video">
      <source :src="currentVideo" type="video/mp4">
    </video>


    <div class="main-content">
      <div class="quote-section" :class="{ 'shift-left': showAuthForm }">
        <div class="quote-container">
          <div class="quote-inner-container" :class="{ 'smaller-quote-container': showAuthForm }">
            <p class="quote" :class="{ 'smaller-quote': showAuthForm }">{{ quoteText }}</p>
            <p class="author" :class="{ 'smaller-author': showAuthForm }">{{ authorText }}</p>
          </div>

          <button class="start-button" @click.stop="showAuthForm = true" v-if="!showAuthForm">
            Get Started
          </button>
        </div>
      </div>

      <div class="auth-container" :class="{ 'show': showAuthForm }" @click.stop>
        <div class="auth-form">
          <component 
            :is="currentView" 
            @switch-mode="switchMode"
            @auth-success="handleAuthSuccess"
            @close-form="handleCloseForm" 
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


const quotes = [
  "The greatest threat to our planet is the belief that someone else will save it.\n— Robert Swan",
  "We do not inherit the Earth from our ancestors, we borrow it from our children.\n— Native American Proverb",
  "Recycling is a good thing to do. It makes you feel good about yourself, and it helps keep the Earth cleaner and healthier.\n— Trista Sutter",
  "Do not wait for leaders; do it alone, person to person.\n— Mother Teresa",
  "The Earth is what we all have in common.\n— Wendell Berry"
];

const currentQuote = ref(quotes[Math.floor(Math.random() * quotes.length)]);


const quoteText = ref('');
const authorText = ref('');

const setQuote = (quote) => {
  const parts = quote.split('\n');
  quoteText.value = parts[0];
  authorText.value = parts[1];
};

setQuote(currentQuote.value);


const vids = [
  "/vids/batteryvid.mp4", 
  "/vids/picktrash.mp4", 
  "/vids/picktrash2.mp4"
];

const currentVideo = ref(vids[Math.floor(Math.random() * vids.length)]);


const switchMode = (mode) => {
  currentView.value = mode === 'login' ? LoginForm : RegisterForm;
};


const handleAuthSuccess = () => {
  router.push('/Dashboard');
};

// Close auth form on outside click
const handleOutsideClick = () => {
  if (showAuthForm.value) {
    showAuthForm.value = false;
  }
};

const handleCloseForm = () => {
  showAuthForm.value = false; 
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
  padding: 0 20px;
}

.quote-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.5s ease-out;
  overflow: hidden;
}

.quote-section.shift-left {
  transform: translateX(-25%);
}

.quote-container {
  text-align: center;
  max-width: 800px;
  width: 100%;
  padding: 0 20px;
  overflow: hidden;
}

.quote-inner-container {
  display: inline-block;
  max-width: 100%;
  width: 100%;
}

.smaller-quote-container {
  max-width: 500px;
}

.quote {
  font-size: 48px;
  line-height: 1.4;
  margin-bottom: 10px;
  font-weight: 300;
  word-wrap: break-word;
}

.author {
  font-size: 24px;
  font-weight: 400;
  margin-top: 10px;
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

.smaller-quote {
  font-size: 20px;
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


  .quote-container {
    padding: 0 10px;
  }
}

@media (max-width: 768px) {
  .quote {
    font-size: 28px;
  }

  .auth-container {
    padding: 40px 20px;
  }

  .quote-container {
    padding: 0 10px;
  }
}
</style>
