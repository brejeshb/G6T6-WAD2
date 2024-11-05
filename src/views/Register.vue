<template>
  <div>
    <h1>Create an Account</h1>
    <!-- Username and Password for Supabase Registration -->
    <p><input type="text" placeholder="Username" v-model="username" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>
    <p><button @click="register">Submit</button></p>

    <p><button @click="signInWithGoogle">Sign in with Google</button></p>

    <h2>Use Supabase</h2>
    <ul>
      <li v-for="user in AuthTable" :key="user.id">
        {{ user.id }} {{ user.username }} {{ user.password }} {{ user.date_registered }}
      </li>
    </ul>

    <h2>Add User to Supabase</h2>
    <!-- Fields to add a user manually to Supabase -->
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <button @click="insertData(username, password)">Add User</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { supabase } from '../lib/supabaseClient'; // Import Supabase client

// Reactive variables for form data
const email = ref('');
const username = ref('');
const password = ref('');
const AuthTable = ref([]);

// Function to read users from Supabase AuthTable
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

// Function to insert a new user into Supabase AuthTable with date_registered
async function insertData(user, pw) {
  try {
    const date_registered = new Date().toISOString(); // Get the current time in ISO format
    const { data, error } = await supabase
      .from('AuthTable')
      .insert([{ 
        username: user, 
        password: pw,
        date_registered: date_registered // Insert current date time in UTC
      }]) // Adjust column names as needed
      .select();

    if (error) {
      console.error('Error inserting user into AuthTable:', error);
    } else {
      // Refresh AuthTable after inserting a new user
      readData();
      username.value = ''; // Clear inputs after successful insert
      password.value = '';
    }
  } catch (error) {
    console.error('Error in insertData:', error);
  }
}

// Firebase Registration Function (you can keep this if you still need it)
const router = useRouter();
const register = () => {
  createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("Successfully registered with Firebase!");
      router.push('/Home'); // Redirect to Home after successful registration
    })
    .catch((error) => {
      console.log(error.code);
      alert(error.message); // Show error message to user
    });
};

// Firebase Sign In with Google (you can implement this if needed)
const signInWithGoogle = () => {
  // Firebase sign-in logic for Google here
};

// Read AuthTable data when the component mounts
onMounted(() => {
  readData();
});
</script>

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
