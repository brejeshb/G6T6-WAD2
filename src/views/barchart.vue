<template>
    <div class="chart-container">
        <Bubble ref="bubbleChart" :data="ChartData" :options="ChartOptions" />
    </div>
</template>

<script setup lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    PointElement,
    CategoryScale,
    LinearScale
} from 'chart.js';
import { Bubble } from 'vue-chartjs';
import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/auth.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip);

// Get logged-in username
const { userName } = useAuth();
const loggedInUsername = ref(userName);  // Ensure it's a ref to use .value

// Reactive data for players and chart
const playerschart = ref([]);
const ChartData = ref({
    datasets: [{
        label: 'User Points',
        backgroundColor: '#FF0000',
        data: []
    }]
});

// Define the plugin to add "You!" label above the current user's bubble
const youPlugin = {
    id: 'youPlugin',
    beforeDatasetsDraw(chart) {
        const { ctx } = chart;
        const dataset = chart.data.datasets[0].data;
        const userIndex = dataset.findIndex(point => point.username === loggedInUsername.value);  // Use .value

        if (userIndex === -1) return; // If user not found, do nothing

        const meta = chart.getDatasetMeta(0);
        const userDataPoint = meta.data[userIndex];

        if (userDataPoint) {
            const { x, y } = userDataPoint.getProps(['x', 'y'], true);
            ctx.font = 'bold 14px sans-serif';
            ctx.fillStyle = '#FF0000';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillText('You!', x, y - 10);
        }
    }
};

// Register the plugin globally
ChartJS.register(youPlugin);

// Chart options with responsive settings and animations
const ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,  // Allows flexibility in height and width
    animations: {
        radius: {
            easing: 'easeInOutQuint',
            duration: 1000,
            from: 5,
            loop: true,
            delay: (context) => context.dataIndex * 200
        }
    },
    plugins: {
        legend: { position: 'top' },
        title: { display: true, text: 'User Points as Bubble Size' },
        tooltip: {
            callbacks: {
                label: (ctx) => {
                    const username = ctx.raw.username;
                    const points = ctx.raw.r * 10;
                    return `${username}: ${points} points`;  // Backticks for template literals
                }
            }
        },
        youPlugin
    },
    scales: {
        x: { min: 0, max: 100, display: false },
        y: { min: 0, max: 100, display: false }
    }
};

// Get random position function for distributing bubbles
const getRandomPosition = (min = 20, max = 80) => Math.random() * (max - min) + min;

// Fetch data and update ChartData
const fetchData = async () => {
    try {
        const { data: UserOverallStatsTable, error } = await supabase
            .from('UserOverallStatsTable')
            .select('username, total_points_accumulated')
            .order('total_points_accumulated', { ascending: false });

        if (error) {
            console.error('Error fetching bubble chart data:', error);
            return;
        }

        playerschart.value = UserOverallStatsTable
            .filter(player => player.total_points_accumulated > 0)
            .map(player => ({
                ...player,
                username: player.username.length > 10
                    ? player.username.slice(0, 10) + '...'
                    : player.username
            }));

        // Populate ChartData with bubble chart data
        ChartData.value = {
            datasets: [{
                label: 'User Points',
                backgroundColor: playerschart.value.map(player =>
                    player.username === loggedInUsername.value ? '#FF0000' : `hsl(${(Math.random() * 360)}, 70%, 50%, 0.5)`
                ),
                data: playerschart.value.map(player => ({
                    x: getRandomPosition(5, 95),
                    y: getRandomPosition(5, 95),
                    r: player.username === loggedInUsername.value 
                        ? player.total_points_accumulated / 8 + 2  // Slightly larger size for current user
                        : player.total_points_accumulated / 8,
                    username: player.username
                }))
            }]
        };
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Fetch data on mounted
onMounted(fetchData);
</script>

<style scoped>

.chart-container {
    width: 100%;
    height: 70vh;              /* Set height relative to viewport for responsiveness */
    max-width: 100%;           /* Ensures container doesn't overflow parent width */
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;         /* Sets a minimum height */
    position: relative;
}

canvas {
    width: 100% !important;
    height: 100% !important; 
}
</style>
