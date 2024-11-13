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
    Legend,
    PointElement,
    CategoryScale,
    LinearScale
} from 'chart.js';
import { Bubble } from 'vue-chartjs';
import { ref, onMounted } from 'vue';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../lib/auth.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

// Get logged-in username
const { userName } = useAuth();
var loggedInUsername = userName;

const playerschart = ref([]);
const ChartData = ref({
    datasets: [{
        label: 'User Points',
        backgroundColor: '#f87979',
        data: []
    }]
});

// Define youPlugin to label the current user's bubble
const youPlugin = {
    id: 'youPlugin',
    beforeDatasetsDraw(chart) {
        const { ctx } = chart;
        ctx.save();
        const dataset = chart.data.datasets[0].data;
        const userIndex = dataset.findIndex(point => point.username === loggedInUsername.value);
        // console.log(userIndex)
        console.log(userName)
        console.log("username", loggedInUsername.value)
        if (userIndex === -1) return; // If user not found, do nothing

        ctx.save();

        const meta = chart.getDatasetMeta(0);
        const userDataPoint = meta.data[userIndex];

        if (userDataPoint) {
            // Get accurate pixel coordinates for the data point
            const { x, y } = userDataPoint.getProps(['x', 'y'], true);

            // Set font properties and alignment for the "You" label
            ctx.font = 'bold 14px sans-serif';
            ctx.fillStyle = '#798645'; // Unique color for "You!" label
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';

            // Draw "You!" label above the data point
            ctx.fillText('You!', x, y - 10);
        }

        ctx.restore();
    }
};

// Register the plugin globally
ChartJS.register(youPlugin);

const ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    animations: {
        loop: true,
        // y: {
        //     easing: 'easeInOutBounce',
        //     duration: 2000,

        //     from: (context) => context.chart.scales.y.getPixelForValue(0)
        // },
        // x: {
        //     easing: 'easeOutElastic',
        //     duration: 2000,
        //     from: (context) => context.chart.scales.x.getPixelForValue(0)
        // },
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
                    return `${username}: ${points} points`;
                }
            }
        },
        youPlugin // Register youPlugin here
    },
    scales: {
        x: { min: 0, max: 100, display: false },
        y: { min: 0, max: 100, display: false }
    }
};

// Get random position function
const getRandomPosition = (min = 10, max = 90) => Math.random() * (max - min) + min;

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
                    player.username === loggedInUsername ? '#FF0000' : `hsl(${(Math.random() * 360)}, 70%, 50%, 0.5)`
                ),
                data: playerschart.value.map(player => ({
                    x: getRandomPosition(0, 100),
                    y: getRandomPosition(0, 100),
                    r: player.username === loggedInUsername
                        ? player.total_points_accumulated / 8 + 2 // Slightly larger size for current user
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
