<template>
  <Navbar />
  <Landing />
  <Dashboard />
</template>

<script>

// import Navbar from '../components/navbar.vue';
import Dashboard from '../components/Dashboard.vue';
import Landing from '../components/Landing.vue';

export default {
  name: "DashboardPage",
  components: {
    Dashboard,
    Landing
  },
  mounted() {
  },
}

</script>

<style scoped>
html {
  scroll-behavior: smooth;
  scroll-timeline: scroll-animation;
}

@scroll-timeline scroll-animation {
  duration: 3s;
  /* Adjust duration to slow down scrolling */
  timing-function: ease-in-out;
}
</style>
