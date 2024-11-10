<template>
  <div style="  background-color: #f8f4ec;   background-attachment: fixed;
  background-image: url('/img/education_hub.webp');
  background-size: 100vw auto;">
    <section class="py-5 text-center top_section" data-aos="fade-up ">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <p class="title">Welcome to Our Recycling Education Hub!</p>

          <!--<p>
                <router-link to="./video" class="btn btn-primary my-2 mx-4" data-aos="zoom-in">Watch some educational videos</router-link>
                <router-link to="./quiz" class="btn btn-secondary my-2 mx-4" data-aos="zoom-in">Do some quizzes for points</router-link>
              </p>-->
        </div>
      </div>
    </section>
    <div id="app">


      <div id="main_content" class="container pt-5">
        <div id="nav-bar">
          <nav class="navbar rounded shadow navbar-expand-lg bg-body-tertiary flex-column" data-aos="fade-right">
            <div class="container-fluid">
              <a class="navbar-brand ms-5" href="#" style="color:#686c44">Filter</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" :class="{ 'active-filter': activeFilter === 'all' }"
                      :style="activeFilter === 'all' ? { color: 'white' } : {}" @click.prevent="activeFilter = 'all'"
                      href="#" @click="filter_recycle = false; filter_upcycle = false; videoFiltering()">All</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" :class="{ 'active-filter': activeFilter === 'recycling' }"
                      :style="activeFilter === 'recycling' ? { color: 'white' } : {}"
                      @click.prevent="activeFilter = 'recycling'" href="#"
                      @click="filter_recycle = true; filter_upcycle = false; videoFiltering()">Recycle</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" :class="{ 'active-filter': activeFilter === 'upcycling' }"
                      :style="activeFilter === 'upcycling' ? { color: 'white' } : {}"
                      @click.prevent="activeFilter = 'upcycling'" href="#"
                      @click="filter_recycle = false; filter_upcycle = true; videoFiltering()">Upcycle</a>
                  </li>
                </ul>
                <form class="d-flex" role="search">
                  <input class="form-control me-3" type="search" placeholder="Search" @input="videoFiltering()"
                    aria-label="Search" v-model="search">
                  <button class="btn btn-outline-success">reset</button>
                </form>
              </div>
            </div>
          </nav>
        </div>
        <div id="videos" class="mt-4 shadow p-3  rounded">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-12 mb-4" v-for="video in videoFiltering()" :key="video.videoId"
              data-aos="fade-up">
              <div class="card h-100" style="width: 100%;">
                <iframe class="card-img-top" width="560" height="315"
                  :src="`https://www.youtube.com/embed/${video.videoId}`" frameborder="0" allowfullscreen>
                </iframe>
                <div class="card-body">
                  <h5 class="card-title" style="color:#f8f4ec">{{ video.title }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import the AOS styles

// Initialize AOS on component mount
onMounted(() => {
  AOS.init({
    duration: 800, // Animation duration in milliseconds
    easing: 'ease-in-out', // Animation easing
    once: false,
  });
});


// Environment variables
const youtube_api = import.meta.env.VITE_YOUTUBE_API_KEY;
const recycle_id = import.meta.env.VITE_RECYCLE_PLAYLIST_ID;
const upcycle_id = import.meta.env.VITE_UPCYCLE_PLAYLIST_ID;

console.log(youtube_api)

// API URLs
const API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${recycle_id}&key=${youtube_api}`;
const UPCYCLE_API_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${upcycle_id}&key=${youtube_api}`;

// Reactive state variables
const videos = ref([]);
const search = ref('');
const upcycle_videos = ref([]);
const recycle_videos = ref([]);
const filter_recycle = ref(false);
const filter_upcycle = ref(false);
const activeFilter = ref('all');
// Fetch videos on mount
onMounted(fetchVideos);
const filteredQuizzes = computed(() => {
  return quizzes.filter(quiz => {
    const matchesCategory = activeFilter.value === 'all' || quiz.category === activeFilter.value;
    const matchesSearch = quiz.title.toLowerCase().includes(search.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

// Functions
async function fetchVideos() {
  try {
    // Fetch recycle videos
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    recycle_videos.value = data.items.map(item => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      status: true
    }));

    // Fetch upcycle videos
    const responseUpcycle = await fetch(UPCYCLE_API_URL);
    if (!responseUpcycle.ok) {
      throw new Error(`HTTP error! Status: ${responseUpcycle.status}`);
    }
    const dataUpcycle = await responseUpcycle.json();
    upcycle_videos.value = dataUpcycle.items.map(item => ({
      videoId: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      status: true
    }));

  } catch (error) {
    console.error('Error fetching videos:', error);
  }
}

// Video filtering function
function videoFiltering() {
  if (filter_recycle.value) {
    videos.value = recycle_videos.value;
  } else if (filter_upcycle.value) {
    videos.value = upcycle_videos.value;
  } else {
    videos.value = recycle_videos.value.concat(upcycle_videos.value);
  }

  // Filter by search term
  if (search.value !== '') {
    videos.value.forEach(item => {
      item.status = item.title.toLowerCase().includes(search.value.toLowerCase());
    });
  } else {
    videos.value.forEach(item => {
      item.status = true;
    });
  }

  // Return filtered videos
  return videos.value.filter(video => video.status);
}
</script>
<style scoped>
/* General Styling */
body {

  background-color: #f4f4f9;
}

/* Top Section - Banner */
.top_section {

  height: 50vw;


}

.top_section h1 {
  font-size: 2.5rem;
  color: #333;
}

.top_section p.lead {
  color: #555;
}

.top_section .btn-primary {
  background-color: #4CAF50;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
}

.top_section .btn-secondary {
  background-color: #ff9800;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 20px;
  color: white;
}

/* Navbar and Filter Buttons */
#nav-bar {
  position: sticky;
  top: 60px;
  z-index: 20;
}

#nav-bar .navbar {
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
}

#nav-bar .navbar-brand {
  font-weight: bold;
  color: #4CAF50;
}

#nav-bar .nav-link {
  color: #555;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background-color 0.2s ease;
}

#nav-bar .nav-link:hover {
  background-color: #e0f7f4;
  color: #333;
}

#nav-bar .nav-link.active {
  background-color: #4CAF50;
  color: white;
}

/* Search and Reset Button */
#nav-bar .form-control {
  border-radius: 20px;
  padding: 0.5rem 1rem;
}

#nav-bar .btn-outline-success {
  border-radius: 20px;
  color: #4CAF50;
  border-color: #4CAF50;
  padding: 0.5rem 1rem;
}

#nav-bar .btn-outline-success:hover {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}

/* Quiz Cards */
.card {
  border: none;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  background-color: #686c44;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);

}

.card-title {
  font-weight: bold;
  color: #333;
}

.card-text {
  color: #666;
}

/* Start Quiz Button */
.btn-primary {
  background-color: #4CAF50;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
}

.btn-primary:hover {
  background-color: #388E3C;
  color: #fff;
}

.btn-secondary:hover {
  background-color: orange;
  color: #fff;
}

/* Progress Bar */
.progress {
  height: 8px;
  border-radius: 20px;
}

.progress-bar {
  background-color: #4CAF50;
}

/* Submit and Back Buttons */
.btn-success {
  background-color: #4CAF50;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
}

.btn-secondary {
  background-color: #ff9800;
  border: none;
  padding: 0.75rem 1.5rem;
  color: white;
  border-radius: 8px;
}

/* Responsive Spacing */
@media (max-width: 768px) {
  .top_section {
    padding: 1.5rem;
  }

  .card {
    margin-bottom: 1.5rem;
  }
}

/* Active Filter Styling */
.active-filter {
  background-color: #686c44;
  /* Green fill for active filter */
  color: white;
  /* White text for better contrast */
  border-radius: 20px;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Standard nav-link styling (non-active state) */
.nav-link {
  color: #555;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#nav-bar .nav-link:hover {
  background-color: #808444;
  color: white;
}

#app {
  background-color: #f8f4ec;
  min-height: 100vh;
}

#videos {
  background-color: #fffce4;
}

.title {
  font-size: 6vw;
  font-weight: bold;

}
</style>