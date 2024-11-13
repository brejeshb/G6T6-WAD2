// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { piniaInstance } from './global.ts';  // Import piniaInstance

import '@mdi/font/css/materialdesignicons.css';

// Firebase not in use for this project
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "g6t6-wad2.firebaseapp.com",
  projectId: "g6t6-wad2",
  storageBucket: "g6t6-wad2.appspot.com",
  messagingSenderId: "6325141042",
  appId: "1:6325141042:web:8235f9b26a915e3ba3c62b"
};

initializeApp(firebaseConfig);


const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
  },
});

createApp(App)
  .use(router)
  .use(vuetify)
  .use(piniaInstance)
  .mount('#app');
