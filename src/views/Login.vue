<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-header">
        <h1>Landing Page</h1>
      </div>

      <div class="login-container">
        <h2>Login</h2>
        <div class="input-group">
          <input type="text" placeholder="Username" v-model="username" />
          <input type="password" placeholder="Password" v-model="password" />
          <p v-if="errMsg">{{ errMsg }}</p>
        </div>

        <button class="login-button" @click="handleLogin">Login</button>

        <div class="register-link">
          No account yet? <router-link to="/Register">Register</router-link>
        </div>
      </div>
    </div>

    <!-- Illustration Section -->
    <div class="illustration">
      <img src="../assets/images/recyclebin.png" alt="Login Illustration" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from '../../src/lib/auth'; // Import the auth store

const username = ref("");
const password = ref("");
const errMsg = ref("");
const router = useRouter();
const { login } = useAuth();

const handleLogin = async () => {
  const success = await login(username.value.trim(), password.value.trim());
  if (success) {
    console.log("Successfully signed in!");
    router.push('/Dashboard');
  } else {
    errMsg.value = "Invalid username or password.";
  }
};
</script>

<style scoped>
/* Layout for the login page */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #fefae0; /* Light background color */
}

/* Login box styling */
.login-box {
  width: 350px;
  padding: 30px;
  border-radius: 10px;
  background-color: #ffffff; /* White background for the box */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Login header styling */
.login-header {
  text-align: center;
  margin-bottom: 20px;
  color: #798645; /* Header color */
}

/* Title in login container */
.login-container h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #626f47; /* Title color */
}

/* Styling for the input fields */
.input-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-group input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  transition: border 0.3s;
}

.input-group input:focus {
  border-color: #626f47; /* Focus border color */
}

/* Styling for the login button */
.login-button {
  width: 100%;
  padding: 10px;
  background-color: #798645; /* Button color */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-button:hover {
  background-color: #626f47; /* Darker shade on hover */
}

/* Styling for the registration link */
.register-link {
  text-align: center;
  margin-top: 10px;
}

/* Illustration styling */
.illustration {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  margin-left: 20px; /* Add space between form and illustration */
}

.illustration img {
  max-width: 100%;
  height: auto;
  border-radius: 8px; /* Optional: Add rounded corners to image */
}

/* Layout styling for the social login, if required in future */
.social-login {
  text-align: center;
  margin-top: 20px;
}

.social-icons {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.social-icons button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 5px;
  font-size: 1.5rem;
}

.google {
  background-color: #db4437; 
  color: white;
}

@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }

  .login-box {
    width: 100%;
  }

  .illustration {
    margin-left: 0;
    margin-top: 20px;
  }
}

</style>
