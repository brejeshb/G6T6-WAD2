<!-- src/components/BarChart.vue -->
<template>
    <Bar :key="JSON.stringify(ChartData)" :data="ChartData" :options="ChartOptions" />
    <!-- manually re-render the chart -->
</template>

<script setup lang="ts">
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const playerschart = ref([]);
const ChartData = ref({
    labels: [],
    datasets: [
        {
            label: 'Total Points Accumulated',
            backgroundColor: '#f87979',
            data: []
        }
    ]
});


const ChartOptions = {
    indexAxis: 'y', // Set indexAxis to 'y' for horizontal bars
    elements: {
        bar: {
            borderWidth: 2,
        }
    },
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
        legend: {
            position: 'top' //  legend position
        },
        title: {
            display: true,
            text: 'User Points Accumulated'
        }
    }
}

const generateColors = (numColors) => {
    const colors = [];
    for (let i = 0; i < numColors; i++) {
        const hue = (i * 360) / numColors; // Spread hues across the color wheel
        const color = `hsl(${hue}, 70%, 50%, 0.5)`; // Adjust saturation and lightness as needed
        colors.push(color);
    }
    return colors;
};


const maxUsernameLength = 10;

const fetchData = async () => {
    try {
        const { data: UserOverallStatsTable, error } = await supabase
            .from('UserOverallStatsTable')
            .select('username, total_points_accumulated')
            .order('total_points_accumulated', { ascending: false });

        if (error) {
            console.error('Error fetching barchart data:', error);
            return;
        }

        playerschart.value = UserOverallStatsTable
            .filter(player => player.total_points_accumulated > 0)
            .map(player => ({
                ...player,
                username: player.username.length > maxUsernameLength 
                    ? player.username.slice(0, maxUsernameLength) + '...' 
                    : player.username
            }));

        const numPlayers = playerschart.value.length;
        const dynamicColors = generateColors(numPlayers);


        ChartData.value = {
            labels: playerschart.value.map(player => player.username),
            datasets: [{
                label: 'Total Points Accumulated',
                backgroundColor: dynamicColors,
                data: playerschart.value.map(player => player.total_points_accumulated)
            }]
        };


    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Fetch data when the component is mounted
onMounted(fetchData);

</script>