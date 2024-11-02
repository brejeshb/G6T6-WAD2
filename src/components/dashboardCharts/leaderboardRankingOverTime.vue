<!-- src/dashboardCharts/PieChart.vue -->
<template>
    <div>
        <div class="pt-2 ps-2 pe-2 text-center">
            <h1>Your Leaderboard Ranking Over Time</h1>
        </div>
        <canvas id="leaderboardRanking"></canvas> <!-- Use ref to reference the canvas element -->
    </div>
</template>

<script>
export default {
    name: "leaderboardRanking",
    data() {
        return {
            chart: null
        }
    },
    props: {
        labels: {
            type: Array,
            required: true
        },
        data_values: {
            type: Array,
            required: true
        },

    },
    mounted() {
        this.createStackedChart();
    },
    beforeUnmount() {
        // Destroy the chart when the component is unmounted
        if (this.chart) {
            this.chart.destroy();
        }
    },

    methods: {
        createStackedChart() {
            const leaderboard = document.getElementById("leaderboardRanking");

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new Chart(leaderboard, {
                type: 'line',
                data: {
                    labels: this.labels,
                    datasets: [{
                        label: "Leaderboard Ranking Over Time",
                        data: this.data_values,

                        tension: 0.7, // adjust rounded corners
                        borderColor: "#788645", // adjust line color 
                        backgroundColor: "#788645", // adjust dot color


                    }]
                },
                options: {
                    responsive: true,
                    title: {
                        text: "Leaderboard Ranking Over Time",
                        display: true,
                    },
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    interaction: {
                        intersect: false
                    },
                    scales: {
                        y: {
                            ticks: {
                                font: {
                                    weight: "bold"
                                }
                            },
                            grid: {
                                display: false
                            },
                            title: {
                                display: true,
                                text: 'Leaderboard Ranking'
                            }
                        },
                        x: {
                            ticks: {

                            },
                            grid: {
                                display: false,
                            },
                            border: {
                                display: false,
                            },
                            title: {
                                display: false,
                                text: 'Time'
                            }
                        },
                    },

                },

            });
        }
    },
};
</script>

<style scoped>
/* Optional: Style specific to the Leaderboard component */
h1 {
    color: #788645;
    font-weight: bold;
    font-size: 27px;
}
</style>