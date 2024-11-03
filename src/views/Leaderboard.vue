<!-- src/components/RecyclingLeaderboard.vue -->
<template>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">

    <div>
        <div class="leaderboard-head">
            <div class="leaderboard-container">
                <h1 class="leaderboard-title">Leaderboard</h1>
            </div>
        </div>

        <div class="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#626F47">
                <rect fill="#798645" width="100%" height="100%" />
                <path
                    d="M0 0v99.7C62 69 122.4 48.7 205 66c83.8 17.6 160.5 20.4 240-12 54-22 110-26 173-10a392.2 392.2 0 0 0 222-5c55-17 110.3-36.9 160-27.2V0H0Z"
                    opacity=".5"></path>
                <path
                    d="M0 0v74.7C62 44 122.4 28.7 205 46c83.8 17.6 160.5 25.4 240-7 54-22 110-21 173-5 76.5 19.4 146.5 23.3 222 0 55-17 110.3-31.9 160-22.2V0H0Z">
                </path>
            </svg>
        </div>

        <div class="leaderboard-body">
            <!-- <div class="d-flex justify-content-center">
                <div class="btn-group btn-group-toggle mb-4 text-center">
                    <button type="button" class="btn btn-primary btn-lg"
                        @click="sortLeaderboard('weekly')">Weekly</button>
                    <button type="button" class="btn btn-secondary btn-lg" @click="sortLeaderboard('allTime')">All
                        Time</button>
                </div>
            </div> -->

            <!-- Podium -->
            <div class="row">
                <div class="col-lg-1">
                </div>
                <div class="col-lg-4">
                    <div id="podium" class="podium">
                        <div v-for="player in topPlayers" :key="player.rank"
                            :class="['podium-step', getPodiumClass(player.rank)]">
                            <h2 class='podium-number'>{{ player.rank }}</h2>
                            <h5 class="podium-name">{{ player.name }}</h5>
                            <!-- <img :src="player.avatar" alt="Avatar"> -->
                            <p>{{ isWeekly ? player.weeklyScore : player.score }} points</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-1">
                </div>
                <!-- Leaderboard List -->
                <div class="col-lg-5">
                    <ul class="leaderboard-list mt-4">
                        <li v-for="player in sortedPlayers" :key="player.rank"
                            class="list-group-item d-flex align-items-center">
                            <div class="player-info">
                                <span>{{ player.rank }}.&nbsp;</span>
                                <!-- <img :src="player.avatar" alt="Avatar"> -->
                                <span>{{ player.name }}</span>
                            </div>
                            <span>{{ isWeekly ? player.weeklyScore : player.score }} points</span>
                        </li>
                    </ul>
                </div>
            </div>

        </div>

        <div class="svg-container">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" fill="#798645">
                <rect fill="#FEFAE0" width="100%" height="100%" />
                <path d="M0 0v100c250 0 375-24 500-48 125 24 250 48 500 48V0H0Z" opacity=".5"></path>
                <path d="M0 0v4c250 0 375 24 500 48C625 28 750 4 1000 4V0H0Z"></path>
            </svg>
        </div>

        <div class="bar-chart">

            <div class="col-8 offset-2 py-5">
                <div class="card">
                    <div class="card-body">
                        <h1>Overall user ranking</h1>
                        <hr>

                        <!-- <BarChart /> -->
                        <BarChart />
                    </div>

                </div>


            </div>
        </div>


    </div>


</template>


<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';
import BarChart from '../views/barchart.vue';

// Data and state
const players = ref([]);
const isWeekly = ref(true);

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

    players.value = UserOverallStatsTable.map((record, index) => ({
        rank: index + 1,
        name: record.username,
        weeklyScore: record.total_points_accumulated,
    }));
}

// Lifecycle hook
onMounted(async () => {
    await fetchLeaderboardData();
    sortLeaderboard();
});
</script>


<style scoped>
.bar-chart {
    margin-top: 0px;
    background-color: #FEFAE0
}

.navbar {
    background-color: transparent !important;
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
    padding: 20px;
    color: white;
}

.button-container {
    justify-content: center;
}

.leaderboard-head {
    background-color: #626F47;
    height: 200px;
    width: 100vw;
    margin: 0px;
    padding: 0px;
    max-width: 100%;
    overflow-x: hidden;

}

.leaderboard-body {
    background-color: #798645;
    height: 100vh;
    width: 100vw;
    max-width: 100%;
}

.leaderboard-title {
    color: white;
    margin-left: 100px;
}

h1 {
    text-align: left;
    margin-top: 30px;
    font-size: 3rem;
    font-weight: bold;
    margin-left: 30px;
}


.podium {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 15px;
}

.podium-step {
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
    transition: transform 0.3s ease;
}

.podium-step:hover {
    transform: translateY(-10px);
}

/* .podium-step img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin-bottom: 10px;
    /* border: 3px solid white; }*/

.first-place {
    height: 350px;
    background: linear-gradient(145deg, #f4d03f, #f1c40f);
    box-shadow: 0 8px 16px rgba(255, 223, 0, 0.5);
    order: 2;
    width: 160px;
    position: relative;
}

/* .first-place::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    z-index: -1;
} */

.second-place {
    height: 300px;
    background: linear-gradient(145deg, #c0c0c0, #b0b0b0);
    box-shadow: 0 8px 16px rgba(192, 192, 192, 0.5);
    order: 1;
    width: 160px;
}

.third-place {
    height: 250px;
    background: linear-gradient(145deg, #cd7f32, #c97127);
    box-shadow: 0 8px 16px rgba(205, 127, 50, 0.5);
    order: 3;
    width: 160px;

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
}

.podium-points {
    font-size: 1rem;
    font-weight: normal;
    color: rgba(255, 255, 255, 0.8);
}


.podium-step span {
    font-weight: bold;
}

.leaderboard-list {
    background-color: #EDEBF7;
    padding: 20px;
    border-radius: 10px;
    color: black;
}

.leaderboard-list li {
    list-style-type: none;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
}

.leaderboard-list img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.player-info {
    display: flex;
    align-items: center;
}

.btn-group-toggle .btn {
    background-color: #9087E5;
    color: white;
    border-radius: 10px;
}

.highlight {
    font-weight: bold;
    background-color: #EFECC6;
}

.score-timer {
    margin-top: 10px;
    font-size: 0.9rem;
    background-color: #A1A4D2;
    padding: 10px;
    border-radius: 8px;
}
</style>
