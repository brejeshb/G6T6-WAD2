<template>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">

    <div class="container" style="background-color: #FEFAE0;">

        <section id="section-0">
            <div class="leaderboard-head" style="padding-top: 17vw;">
                <h1 id="leaderboard-title" data-aos="flip-left">Leaderboard</h1>
            </div>

        </section>
        <section class="section" id="section-1">


            <div class="leaderboard-body">


                <!-- Podium -->
                <div class="row">
                    <div class="col-lg-4">
                        <h1 class="hidden" id="podium">Podium</h1>
                    </div>
                    <div class="col-lg-4 hidden">
                        <div class="podium">
                            <div v-for="player in topPlayers" :key="player.rank"
                                :class="['podium-step', getPodiumClass(player.rank)]">
                                <h2 class='podium-number'>{{ player.rank }}</h2>
                                <h5 class="podium-name">{{ player.name }}</h5>
                                <!-- <img :src="player.avatar" alt="Avatar"> -->
                                <p>{{ player.score }} points</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                    </div>
                </div>

            </div>

        </section>

        <div class="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#FEFAE0">
                <rect fill="#798645" width="100%" height="100%" />
                <path
                    d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z"
                    opacity=".5"></path>
                <path
                    d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z">
                </path>
            </svg>
        </div>

        <!-- Leaderboard List -->
        <section class="section" id="section-2">
            <div class="row">
                <div class="col-lg-3 col-sm-1"></div>
                <div class="col-lg-6">
                    <ul class="leaderboard-list mt-4 hidden">
                        <li v-for="player in sortedPlayers" :key="player.rank"
                            class="list-group-item d-flex align-items-center">
                            <div class="player-info">
                                <span class="p-3">{{ player.rank }}.&nbsp;</span>
                                <span class="player_name">{{ player.name }}</span>
                            </div>
                            <span class="player-info">{{ player.score }} points</span>
                        </li>
                    </ul>

                </div>
                <div class="hidden">
                    <h1 id="climb">Climb the leaderboard!</h1>
                </div>
                <div class="col-lg-3 col-sm-1"></div>
            </div>
        </section>




        <div class="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#798645">
                <rect fill="#626F47" width="100%" height="100%" />
                <path d="M0 0v100l500-48 500 48V0H0z" opacity=".5"></path>
                <path d="M0 0h1000v52H0z" opacity=".5"></path>
                <path d="M0 0v4l500 48 500-48V0H0z" opacity=".5"></path>
                <path d="M0 0v4l500 48 500-48V0H0z"></path>
            </svg>
        </div>

        <section class="section" id="section-3">
            <div class="bar-chart hidden">
                <div class="py-5 mx-auto">
                    <div class="card">
                        <div class="card-title hidden">
                            <h2 style="font-weight: bold;">Overall user rankings</h2>
                        </div>
                        <div class="card-body chart hidden">
                            <hr>
                            <BarChart />
                        </div>

                    </div>


                </div>
            </div>
        </section>

        <div class="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#626F47">
                <rect fill="#FEFAE0" width="100%" height="100%" />
                <path d="M500 4c-125 0-125 96-250 96S125 4 0 4V0h1000v4c-125 0-125 96-250 96S625 4 500 4Z"></path>
            </svg>
        </div>

        <div id="section-4 ">
            <LeaderboardCarousel />

        </div>

        <div>
            <Footer2/>
        </div>

    </div>


    <!-- </div> -->


</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';
import BarChart from '../views/barchart.vue';
import LeaderboardCarousel from '../components/LeaderboardCarousel.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';  
import Footer2 from '../components/footer2.vue'


// Data and state
const players = ref([]);

// Computed properties
const topPlayers = computed(() => players.value.filter(player => player.rank <= 3));
const sortedPlayers = computed(() => players.value.filter(player => player.rank > 3));

// Methods
function getPodiumClass(rank: number) {
    return rank === 1 ? 'first-place' : rank === 2 ? 'second-place' : 'third-place';
}

function sortLeaderboard() {
    players.value.sort((a, b) => b.score - a.score);
}

// Fetch leaderboard data
async function fetchLeaderboardData() {
    players.value = []; // Clear current players
    const { data: UserOverallStatsTable, error } = await supabase
        .from('UserOverallStatsTable')
        .select('username, total_points_accumulated')
        .order('total_points_accumulated', { ascending: false });

    if (error) {
        console.error('Error fetching leaderboard data:', error);
        return;
    }

    
    players.value = UserOverallStatsTable.slice(0,13).map((record, index) => ({
        rank: index + 1,
        name: record.username,
        score: record.total_points_accumulated,
    }));




}

onMounted(async () => {
    await fetchLeaderboardData();
    sortLeaderboard();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show"); // Add 'show' class when element is in view
            }
            else {
                entry.target.classList.remove("show"); // Add 'show' class when element is in view
            }
        });
    });

    // Select all elements with the 'hidden' class
    const hiddenSections = document.querySelectorAll('.hidden');

    // Observe each hidden section
    hiddenSections.forEach((el) => observer.observe(el));

    AOS.init({
    duration: 800, // Animation duration in milliseconds
    easing: 'ease-in-out', // Animation easing
    once: false,
  });

});

</script>


<style scoped>
.container {
    width: 100%;
    height: 100vh;
    max-width: 100vw;
    /* overflow-y: scroll; */
    scroll-behavior: smooth;
    margin: 0;
    padding: 0;
    text-align: center;
}

.section {
    width: 100vw;
    scroll-snap-align: start;
    align-items: center;
    justify-content: center;
    padding: 20px;
    box-sizing: border-box;
}

#section-1 {
    background-color: #FEFAE0;
}

#section-2 {
    background-color: #798645;

}

#section-3 {
    background-color: #626F47;
    display: flex;
    align-items: center;
}

#section-4 {
    background-color: #FEFAE0;

}

.hidden {
    opacity: 0;
    filter: blur(5px);
    transform: translateX(-100%);
    transition: all 1s;

}

.show {
    opacity: 1;
    filter: blur(0);
    transform: translateX(0);
}

.leaderboard-list {
    display: inline-block;
    background-color: #EFECC6;
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    padding: 10px;
    width: 80%;
}

/* Leaderboard List Items */
.leaderboard-list li {
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    border-bottom: 1px solid #ccc;
    transition: background-color 0.3s ease;
}

.leaderboard-list li:hover {
    background-color: #f0f8ff;
}

.chart {
    display: grid;
    align-items: center;
    height: 100%;
    padding: 0px;
}

.bar-chart {
    /* display: inline-block;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); */
    width: 80%;
    
}

#leaderboard-title {
    padding: none;
    color: #798645;
    font-weight: bolder;
    font-size: 6vw;
}


#podium {
    color: #798645;
    margin-top: 2vw;
    margin-left: 2vw;
    
}


@keyframes popIn {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.9);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}


.podium {
    animation: popIn 2s ease-out forwards;
    display: flex;
    /* justify-content: center; */
    align-items: flex-end;
    gap: 15px;
    justify-content: space-around;
    margin-top: 14vw;
    flex-wrap: wrap;
}

.podium-step {
    flex: 1 1 30%; /* Each item takes up 30% of the row by default */
    min-width: 100px; /* Ensures items don’t get too small */
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    border-radius: 15px;
    color: white;
    font-weight: bold;
    font-size: large;
    position: relative;
    border: 2px solid rgba(255, 255, 255, 0.4);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    text-align: center;

}

.podium-step:hover {
    transform: translateY(-20px);
}

.first-place {
    /* animation-delay: 0.1s; */
    height: 350px;
    background: linear-gradient(145deg, #f4d03f, #f1c40f);
    box-shadow: 0 8px 16px rgba(255, 223, 0, 0.5);
    order: 2;
    width: 160px;
    position: relative;

}

.second-place {
    height: 300px;
    background: linear-gradient(145deg, #c0c0c0, #b0b0b0);
    box-shadow: 0 8px 16px rgba(192, 192, 192, 0.5);
    order: 1;
    width: 160px;

}

.third-place {
    /* animation-delay: 1s; */
    height: 250px;
    background: linear-gradient(145deg, #cd7f32, #c97127);
    box-shadow: 0 8px 16px rgba(205, 127, 50, 0.5);
    order: 3;
    width: 160px;


}



.bar-chart.visible {
    opacity: 1;
    transform: translateY(0);
}

.navbar {
    background-color: transparent;
    /* Ensures no background */
    outline: none;
}

.whole-page {
    width: 100vw;

}

.svg-container {
    height: auto;
    width: 100vw;
    max-width: 100%;
}

.leaderboard-container {
    margin: 0px;
    color: white;
}

.button-container {
    justify-content: center;
}

#section-0 {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
}

.leaderboard-head {
    /* background-color: #626F47; */
    position: relative;
    height: 70vw;

    margin: 0px;
    padding: 0px;
    background: url(../assets/images/leaderboard.jpg);
    background-size: 100vw;
    background-repeat: no-repeat;

    background-attachment: fixed;

}

.leaderboard-body {
    /* background-color: #798645; */
    height: 100vh;
    width: 100vw;
    max-width: 100%;
}



h1 {
    /* margin-top: 1vw; */
    font-size: 3.5vw;
    font-weight: bold;
    /* margin-left: 3vw; */
}

.podium-number {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 10px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.podium-name {
    font-size: xx-large;
    font-weight: bold;
    overflow: hidden; /* Hides overflow text */
    text-overflow: ellipsis; /* Adds "..." at the end of the truncated text */
    max-width: 100px; /* Set a maximum width for truncation to work */
    display: inline-block; /* Ensure the ellipsis works within a block context */
}

.player_name{
    white-space: nowrap; /* Prevents text from wrapping */
    overflow: hidden; /* Hides overflow text */
    text-overflow: ellipsis; /* Adds "..." at the end of the truncated text */
    max-width: 100px; /* Set a maximum width for truncation to work */
    display: inline-block; /* Ensure the ellipsis works within a block context */
}

.podium-points {
    font-size: 1rem;
    font-weight: normal;
    color: rgba(255, 255, 255, 0.8);
}


.podium-step span {
    font-weight: bold;
}

.player-info {
    display: flex;
    align-items: center;
    font-size: medium;
}


#climb {
    font-weight: bold;
    color: #EFECC6;
    padding-bottom: 50px;
}

.carousel-container {
    position: relative;
}

.carousel {
    display: flex;
    gap: 16px;
    width: 100vw;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    white-space: nowrap;
    padding: 20px 0;
    display: flex;
    justify-content: center;
}

.item {
    flex-shrink: 0;
    width: 600px;
    /* scroll-snap-align: start;  */
    box-sizing: border-box;
}

.card {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    padding-top: 5px;
    text-align: center;
    overflow: hidden;
}

.card-title {
    font-weight: bold;
}

.card-body {
    color: #666;
}
</style>
