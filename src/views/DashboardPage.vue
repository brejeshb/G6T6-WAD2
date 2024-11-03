<template>
  <Navbar />
  <Dashboard />
</template>

<script>
// import Navbar from '../components/navbar.vue';
import Dashboard from '../components/Dashboard.vue';

export default {
  name: "DashboardPage",
  components: {
    Dashboard,
  }
}
</script>

<style scoped></style>
