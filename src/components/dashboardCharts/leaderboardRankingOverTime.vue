<!-- src/dashboardCharts/PieChart.vue -->
<template>
    <div class="border rounded-5 p-2 p-md-3 p-lg-5 p-xl-5 w-100 h-100 bento" style="min-height: 600px;">
        <div class="text-center mb-4 w-100">
            <h1>Your Leaderboard Ranking Over Time</h1>
        </div>
        <div class="chart-container">
            <canvas id="leaderboardRanking"></canvas>
        </div>
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

}

canvas {
    min-height: 200px;
    min-width: 200px;
    width: 100%;
    height: auto;
}

.bento {
    /* Card */
    cursor: pointer;
    box-shadow: 0 7px 25px rgb(0, 0, 0, 0.08);
}
</style>