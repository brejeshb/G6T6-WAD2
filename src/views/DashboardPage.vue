<template>
  <Navbar />

  <Landing class="section" />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#010000">
    <rect fill="#F3F2EC" width="100%" height="100%" />
    <path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path>
    <path d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z" opacity=".5"></path>
    <path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path>
    <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
  </svg>



  <div>
    <div v-if="!isDashboardLoaded" class="loader text-center ps-5 pe-5 pb-3"
      style="background-color: #F3F2EC;padding-top: 5%;">
      <h2 style="color: #788645;" class="fw-bold loaderHehe w-100 text-center">
        ༶•┈┈ Loading your Lovely Dashboard ┈┈•༶
      </h2>
    </div>
    <Dashboard class="section" style="height: fit-content;" />
  </div>


  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#F3F2EC">
    <rect fill="#FEFAE1" width="100%" height="100%" />
    <path d="M0 1v99c134.3 0 153.7-99 296-99H0Z" opacity=".5"></path>
    <path d="M1000 4v86C833.3 90 833.3 3.6 666.7 3.6S500 90 333.3 90 166.7 4 0 4h1000Z" opacity=".5"></path>
    <path d="M617 1v86C372 119 384 1 196 1h421Z" opacity=".5"></path>
    <path d="M1000 0H0v52C62.5 28 125 4 250 4c250 0 250 96 500 96 125 0 187.5-24 250-48V0Z"></path>
  </svg>


  <CardsCarousel style="height: fit-content;" v-if="isDashboardLoaded" />

  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#FEFAE1">
    <rect fill="#D9EA9A" width="100%" height="100%" />
    <path
      d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z"
      opacity=".5"></path>
    <path
      d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z">
    </path>
  </svg>
  <staticContentHaHa class="" style="height: fit-content;" />
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#D9EB9A">
    <rect fill="#FEFAE1" width="100%" height="100%" />
    <path d="M0 100V0h1000v4L0 100z"></path>
    <path d="M0 100V0h1000v24L0 100z" opacity=".5"></path>
    <path d="M0 100V0h1000v44L0 100z" opacity=".4"></path>
    <path d="M0 100V0h1000v64L0 100z" opacity=".4"></path>
    <path d="M0 100V0h1000v84L0 100z" opacity=".2"></path>
  </svg>

  <Footer2 />


</template>

<script>

// import Navbar from '../components/navbar.vue';
import Landing from '../components/Landing.vue';
import Dashboard from '../components/Dashboard.vue';
import CardsCarousel from '../components/CardsCarousel.vue';
import staticContentHaHa from '../components/dashboardCharts/staticContentHaHa.vue';
import Footer2 from '../components/footer2.vue';


export default {
  name: "DashboardPage",
  components: {
    Dashboard,
    Landing,
    CardsCarousel,
    staticContentHaHa,
    Footer2
  }, data() {
    return {
      isDashboardLoaded: false

    };
  },
  mounted() {
    setTimeout(() => {
      this.isDashboardLoaded = true;
    }, 2750); // Adjust delay time as needed (e.g., 1000ms = 1 second)
  },


}

</script>

<style scoped>
html {
  scroll-behavior: smooth;

}

body {
  margin: 0;
  padding: 0;
}

.loaderHehe {
  -webkit-animation: bounce .4s ease infinite alternate;
  font-size: 2rem;

}

/* Medium screens */
@media (max-width: 768px) {
  .loaderHehe {
    font-size: 1.5rem;
    /* Smaller font for medium screens */
  }
}

/* Small screens */
@media (max-width: 480px) {
  .loaderHehe {
    font-size: 1rem;
    /* Even smaller font for small screens */
  }
}

@-webkit-keyframes bounce {
  0% {
    text-shadow:
      0 5px 0 #ccc,
      0 2px 3px rgba(0, 0, 0, 1);
  }

  100% {
    transform: translateY(-20px);
    text-shadow: 0 50px 0 #black,
      0 0px 20px rgba(0, 0, 0, .8);
  }
}

@scroll-timeline scroll-animation {
  duration: 6s;
  /* Adjust duration to slow down scrolling */
  timing-function: ease-in-out;

}
</style>
