<!-- src/components/BarChart.vue -->
<template>
    <div class="chart-container">
        <Bar :key="JSON.stringify(ChartData)" :data="ChartData" :options="ChartOptions" />
        <!-- manually re-render the chart -->
    </div>
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
            borderWidth: 1.0,
            categoryPercentage: 1.0 // Adjust spacing between bars (1.0 fills the entire category width)

        }
    },
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top' //  legend position
        },
        title: {
            display: true,
            text: 'User Points Accumulated'
        }
    },
    scales: {
        x: {
            grid: {
                display: false, // Hide grid lines on the x-axis
            },
            ticks: {
                font: {
                    weight: 'bold', // Set font weight to bold for x-axis labels
                    size: 10 // Set a smaller font size if labels are too large

                },
                autoSkip: false,

            },


        },
        y: {
            grid: {
                display: false
            },
            ticks: {
                autoSkip: false, // Ensure all labels are displayed on the y-axis

                font: {
                    weight: 'bold' // Set font weight to bold for x-axis labels
                }
            }

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

<style scoped>
.chart-container {
    width: 100%;
    /* Makes the container fill the width of the parent */
    height: 100%;
    /* Adjusts the height automatically to maintain aspect ratio */
    max-width: 100%;
    /* Prevents overflow */
    position: relative;
    max-height: 80%;
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    overflow-x: scroll;
}
</style>