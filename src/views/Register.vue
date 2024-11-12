<template>
  <div class="min-h-screen flex items-center justify-center bg-custom-bg">
    <!-- White container with form content -->
    <div class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-xl">
      <!-- Logo -->
      <div class="flex justify-center">
        <img src="../assets/images/logo.png" alt="Logo" class="h-20 w-auto" />
      </div>

      <!-- Header -->
      <div class="text-center">
        <h2 class="text-3xl font-bold text-[#798645]">Create Account</h2>
        <p class="mt-2 text-sm text-[#626F47]">Join our community today</p>
      </div>

      <!-- Registration Form -->
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
          <!-- Username Field -->
          <div>
            <label for="username" class="block text-sm font-medium text-[#626F47]">Username</label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[#798645]/30 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#798645] focus:border-[#798645] sm:text-sm"
              placeholder="Choose a username"
            />
          </div>

          <!-- Password Field -->
          <div>
            <label for="password" class="block text-sm font-medium text-[#626F47]">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[#798645]/30 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#798645] focus:border-[#798645] sm:text-sm"
              placeholder="Create a password"
            />
          </div>

          <!-- Confirm Password Field -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-[#626F47]">Confirm Password</label>
            <input
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-[#798645]/30 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#798645] focus:border-[#798645] sm:text-sm"
              placeholder="Confirm your password"
            />
            <p v-if="passwordError" class="mt-1 text-xs text-red-500">{{ passwordError }}</p>
          </div>
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#798645] hover:bg-[#626F47] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#798645] transition-colors duration-200 disabled:opacity-50"
          >
            <span v-if="isLoading">Creating account...</span>
            <span v-else>Create Account</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { supabase } from '../lib/supabaseClient';

// Form fields
const username = ref('');
const password = ref('');
const confirmPassword = ref('');
const isLoading = ref(false);
const passwordError = ref('');

// Data table
const AuthTable = ref([]);
const router = useRouter();

// Form submission handler
async function handleSubmit() {
  passwordError.value = '';

  // Check if passwords match
  if (password.value !== confirmPassword.value) {
    passwordError.value = 'Passwords do not match';
    return;
  }

  isLoading.value = true;

  try {
    await insertData(username.value, password.value);
    router.push('/Home');
  } catch (error) {
    console.error('Registration error:', error);
  } finally {
    isLoading.value = false;
  }
}

async function readData() {
  try {
    const { data, error } = await supabase.from('AuthTable').select();
    if (error) {
      console.error('Error fetching users:', error);
    } else {
      AuthTable.value = data;
    }
  } catch (error) {
    console.error('Error in readData:', error);
  }
}

async function insertData(user, pw) {
  try {
    const date_registered = new Date().toISOString();
    const { data, error } = await supabase
      .from('AuthTable')
      .insert([{ 
        username: user, 
        password: pw,
        date_registered: date_registered
      }])
      .select();

    if (error) {
      console.error('Error inserting user into AuthTable:', error);
    } else {
      readData();
      username.value = '';
      password.value = '';
      confirmPassword.value = '';
    }
  } catch (error) {
    console.error('Error in insertData:', error);
  }
}

onMounted(() => {
  readData();
});
</script>

<style scoped>
/* Custom background class for the page */
.bg-custom-bg {
  background-color: black;
  background-image: url("../assets/images/redox-02.png") !important;

  /* Use absolute or relative path based on your assets folder */
  /* background-image: url("https://www.transparenttextures.com/patterns/rough-diagonal.png"); */
  /* background-image: url("../assets/images/redox-02.png"); Make sure the path is correct */
  background-size: cover; /* Ensures the image covers the entire screen */
  background-position: center;
  background-repeat: no-repeat;
}
</style>

<!-- Original template for reference -->
<!-- <h1>Create an Account</h1>
    <p><input type="text" placeholder="Username" v-model="username" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>

    <p><button @click="signInWithGoogle">Sign in with Google</button></p>

    <h2>Use Supabase</h2>
    <ul>
      <li v-for="user in AuthTable" :key="user.id">
        {{ user.id }} {{ user.username }} {{ user.password }} {{ user.date_registered }}
      </li>
    </ul> -->

<!-- Firebase funcs -->
<!-- 
  // const email = ref("");
  // const password = ref(""); 
  // const router = useRouter();
  // const register = () =>{
  //     createUserWithEmailAndPassword(getAuth(), email.value, password.value)
  //     .then((data) => {
  //         console.log("Successfully registered!");
  //         router.push('/Home')
  //     })
  //     .catch((error) => {
  //         console.log(error.code);
  //         alert(error.message);
  //     });
  // };

  // const signInWithGoogle = () =>{

  // }; 
-->