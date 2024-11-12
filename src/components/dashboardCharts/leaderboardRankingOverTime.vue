<!-- src/dashboardCharts/PieChart.vue -->
<template>
    <div class="border rounded-5 p-2 p-md-3 p-lg-5 p-xl-5 w-100 h-100 bento" style="min-height: 600px;">
        <div class="text-center mb-4 w-100">
            <h1>Highest Ranking Over Time</h1>
        </div>
        <div class="chart-container">
            <canvas id="leaderboardRanking"></canvas>
        </div>
    </div>
</template>

<script>
let delayed;

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

    methods: {
        createStackedChart() {
            const leaderboard = document.getElementById("leaderboardRanking");
            const lowestRank = Math.min(...this.data_values.filter(value => value > 0));

            // Replace zeros with the lowest rank
            const adjustedDataValues = this.data_values.map(value => (value === 0 ? lowestRank : value));

            if (this.chart) {
                this.chart.destroy();
            }

            this.chart = new Chart(leaderboard, {
                type: 'line',
                data: {
                    labels: this.labels,
                    datasets: [{
                        label: "Leaderboard Ranking Over Time",
                        data: adjustedDataValues,
                        tension: 0.2, // adjust rounded corners
                        borderWidth: 4,
                        borderColor: "#2F5F48", // adjust line color 
                        backgroundColor: '#AFAAFF', // adjust dot color
                        fill: 'start'

                    }],
                },
                options: {
                    responsive: true,
                    animations: {
                        tension: {
                            duration: 2000,
                            easing: 'easeInQuad',
                            from: 1,
                            to: 0,
                            loop: true
                        }
                    },

                    title: {
                        text: "Leaderboard Ranking Over Time",
                        display: true,
                    },
                    plugins: {
                        legend: {
                            display: false,
                            labels: {
                                font: {
                                    weight: "bold"
                                }
                            }

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
                                },
                                stepSize: 1

                            },
                            grid: {
                                display: false
                            },
                            title: {
                                display: true,
                                text: 'Leaderboard Ranking',
                                font: {
                                    weight: "bold"
                                }
                            },
                            reverse: true,
                            suggestedMin: Math.max(...adjustedDataValues), // Suggested min as the lowest rank
                            suggestedMax: Math.min(...adjustedDataValues), // Suggested max as the highest rank

                        },
                        x: {
                            ticks: {
                                font: {
                                    weight: "bold"
                                }
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