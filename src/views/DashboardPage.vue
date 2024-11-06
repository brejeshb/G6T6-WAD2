<template>
  <Navbar />
  <div class="container1">
    <Landing class="section" />
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#010000">
      <rect fill="#F3F2EC" width="100%" height="100%" />
      <path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path>
      <path d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z" opacity=".5"></path>
      <path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path>
      <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
    </svg>
    <Dashboard class="section" style="height: fit-content;"/>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#F3F2EC">
      <rect fill="#FEFAE1" width="100%" height="100%" />
      <path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path>
      <path d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z" opacity=".5"></path>
      <path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path>
      <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
    </svg>
    <CardsCarousel class="section" style="height: fit-content;"/>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#FEFAE1">
      <rect fill="#D9EA9A" width="100%" height="100%" />
      <path
        d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z"
        opacity=".5"></path>
      <path
        d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z">
      </path>
    </svg>
    <staticContentHaHa class="section" style="height: fit-content;"/>
    <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#D9EB9A">
    <rect fill="#F6F6F6" width="100%" height="100%" />
    <path d="M0 100V0h1000v4L0 100z"></path>
    <path d="M0 100V0h1000v24L0 100z" opacity=".5"></path>
    <path d="M0 100V0h1000v44L0 100z" opacity=".4"></path>
    <path d="M0 100V0h1000v64L0 100z" opacity=".4"></path>
    <path d="M0 100V0h1000v84L0 100z" opacity=".2"></path>
  </svg> -->
    <infiniteLoop />
  </div>
</template>

<script>

// import Navbar from '../components/navbar.vue';
import Landing from '../components/Landing.vue';
import Dashboard from '../components/Dashboard.vue';
import CardsCarousel from '../components/CardsCarousel.vue';
import staticContentHaHa from '../components/dashboardCharts/staticContentHaHa.vue';
import infiniteLoop from '../components/dashboardCharts/infiniteLoop.vue';

export default {
  name: "DashboardPage",
  components: {
    Dashboard,
    Landing,
    CardsCarousel,
    staticContentHaHa,
    infiniteLoop
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
body {
    margin: 0;
    padding: 0;
}

.container1 {
    position: relative;
    width: 100%;
    height: 100vh;
    scroll-behavior: smooth;
    overflow: auto;
    scroll-snap-type: y mandatory;

}
.section {
    width: 100%;
    height: 100vh;
    background-size:  cover;
    scroll-snap-align: start;
}

@scroll-timeline scroll-animation {
  duration: 6s;
  /* Adjust duration to slow down scrolling */
  timing-function: ease-in-out;

}
</style>
