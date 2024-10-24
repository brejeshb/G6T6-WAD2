<template>
  <div class="login-page">
    <div class="login-box">
      <div class="login-header">
        <h1>Landing Page</h1>
      </div>

      <div class="login-container">
        <h2>Login</h2>
        <div class="input-group">
          <input type="email" placeholder="Petter@gmail.com" v-model="email"/>
          <input type="password" placeholder="Password" v-model="password"/>
          <p v-if="errMsg">{{ errMsg }}</p>
        </div>

        <div class="options">
          <div class="remember-me">
            <input type="checkbox" id="remember" />
            <label for="remember">Remember Password</label>
          </div>
          <a href="#" class="forgot-password">Forgot Password?</a>
        </div>

        <button class="login-button" @click="login">Login</button>

        <div class="register-link">
          No account yet? <router-link to="/Register">Register</router-link>
        </div>

        <div class="social-login">
          <p>Or Login With:</p>
          <div class="social-icons">
            <button class="google" @click="signInWithGoogle">Google</button>
          </div>
        </div>
      </div>
    </div>

    <div class="illustration">
      <img src="../assets/images/recyclebin.png" alt="Login Illustration" />
    </div>
  </div>
</template>

<script setup>
  console.log('Login component mounted');
  import {ref} from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref(""); 
const errMsg = ref()
const router = useRouter();
const login = () =>{
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
        console.log("Successfully Signed in!");
        router.push('/Home')
    })
    .catch((error) => {
        console.log(error.code);
        // alert(error.message);
        switch (error.code){
          case "auth/invalid-email":
            errMsg.value = "Invalid email";
            break;
          case "auth/user-not-found":
            errMsg.value = "No account with that email was found";
            break;
          case "auth/wrong-password":
            errMsg.value = "Incorrect Password";
            break;
          default:
            errMsg.value = "Email or password was incorrect";
            break;
        }
    });
};

const signInWithGoogle = () =>{

};


</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #fefae0; /* Light background color */
}

.login-box {
  width: 350px;
  padding: 30px;
  border-radius: 10px;
  background-color: #ffffff; /* White background for the box */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-header {
  text-align: center;
  margin-bottom: 20px;
  color: #798645; /* Header color */
}

.login-container h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #626f47; /* Title color */
}

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

.options {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.forgot-password {
  color: #626f47; /* Link color */
  text-decoration: none;
  font-size: 0.9rem;
}

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

.register-link {
  text-align: center;
  margin-top: 10px;
}

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

.illustration img {
  max-width: 400px;
}
</style>
