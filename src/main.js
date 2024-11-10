// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Global Vuetify styles
import '@fortawesome/fontawesome-free/css/all.min.css';


import '@mdi/font/css/materialdesignicons.css'; // Import the Material Design Icon font

// Import Firebase and initialize it
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "g6t6-wad2.firebaseapp.com",
  projectId: "g6t6-wad2",
  storageBucket: "g6t6-wad2.appspot.com",
  messagingSenderId: "6325141042",
  appId: "1:6325141042:web:8235f9b26a915e3ba3c62b"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Vuetify configuration
const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',  // Telling Vuetify to use the 'mdi' icon set by default
  },
});

createApp(App)
  .use(router)
  .use(vuetify) // Make sure Vuetify is used here
  .mount('#app');
