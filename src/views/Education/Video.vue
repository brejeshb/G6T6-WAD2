<template>
  <div id="app">
      <div id="header"></div>
      <section class="py-5 text-center container top_section">
          <div class="row py-lg-5">
            <div class="col-lg-6 col-md-8 mx-auto">
              <h1 class="fw-light">Welcome to Our Recycling Education Hub!</h1>
              <p class="lead text-body-secondary">Recycling is a simple, powerful way to create a cleaner planet. In this hub, explore what can and can’t be recycled, learn tips for reducing waste, and discover how small actions can make a big impact. Together, let’s build a more sustainable future—one recycled item at a time!</p>
              <p>
                <a href="educational_hub.html" class="btn btn-primary my-2">Watch some educational videos</a>
                <a href="quiz.html" class="btn btn-secondary my-2">Do some quizzes for points</a>
              </p>
            </div>
          </div>
        </section>
      <div id="main_content" class="container mt-2">
          <div id="sidebar">
              <nav class="navbar navbar-expand-lg bg-body-tertiary flex-column">
                  <div class="container-fluid">
                    <a class="navbar-brand ms-5" href="#">Filter</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="#" @click="filter_recycle=false; filter_upcycle=false;videoFiltering() ">All</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="#" @click="filter_recycle=true; filter_upcycle=false;videoFiltering()">Recycle</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" aria-current="page" href="#" @click="filter_recycle=false; filter_upcycle=true;videoFiltering()">Upcycle</a>
                        </li>
                      </ul>
                      <form class="d-flex" role="search">
                          <input class="form-control me-3" type="search" placeholder="Search" @input="videoFiltering()" aria-label="Search" v-model="search">
                          <button class="btn btn-outline-success">reset</button>
                      </form>
                    </div>
                  </div>
                </nav>
          </div>
          <div id="videos" class="mt-4 shadow p-3 mb-5 bg-body-tertiary rounded">
              <div class="row">
                  <div class="col-lg-4 col-md-6 col-sm-12 mb-4" v-for="video in videoFiltering()" >
                      <div class="card h-100" style="width: 100%;">
                          <iframe 
                          class="card-img-top"
                          width="560" height="315"
                          :src="`https://www.youtube.com/embed/${video.videoId}`" 
                          frameborder="0" allowfullscreen>
                      </iframe>
                          <div class="card-body">
                            <h5 class="card-title">{{ video.title }}</h5>
                          </div>
                        </div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';


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

// Fetch videos on mount
onMounted(fetchVideos);

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