<script setup lang="ts">
import Navbar from './components/navbar.vue';
import DashboardPage from './views/DashboardPage.vue';

</script>


<template>
  <div id="app">
    <!-- <nav>
      <router-link to="/Home">Home</router-link>
      <router-link to="/Forest">Forest</router-link>
      <router-link to="/ItemIdentifier">ItemIdentifier</router-link>
      <router-link to="/Education/Quiz">Quiz</router-link>
      <router-link to="/Education/Video">Video</router-link>
    </nav> -->
    <router-link to="/Dashboard">Dashboard Page</router-link>

    <Navbar />
    <!-- <DashboardPage/>> -->
    <router-view />
  </div>
</template>






<!-- THIS IS THE TEMPLATE FROM VUE, ILL DELETE IN A FEW DAYS BUT IF YOU WANT TO SEE ILL LEAVE IT HERE -->
<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>
<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->
