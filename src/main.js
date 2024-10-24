import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Global Vuetify styles
import '@mdi/font/css/materialdesignicons.css'; // Material Design Icons
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "g6t6-wad2.firebaseapp.com",
  projectId: "g6t6-wad2",
  storageBucket: "g6t6-wad2.appspot.com",
  messagingSenderId: "6325141042",
  appId: "1:6325141042:web:8235f9b26a915e3ba3c62b"
};

initializeApp(firebaseConfig);

const vuetify = createVuetify();

createApp(App)
  .use(router)
  .use(vuetify) 
  .mount('#app');