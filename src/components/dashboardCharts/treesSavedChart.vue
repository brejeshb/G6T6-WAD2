<template>
    <div class="border rounded-5 p-2 p-md-3 p-lg-5 p-xl-5 w-100 h-100 bento" style="min-height: 600px;">
        <div class="mb-4">
            <h1 style="text-align: center;">Your Trees & Co2 Savings Over Time </h1>
        </div>

        <div class="chart-container">
            <canvas id="stackedChart"></canvas>
        </div>
    </div>
</template>

<script>
import { plugins } from 'chart.js';




export default {
    name: "TreesSaved",
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
        data_values1: {
            type: Array,
            required: true
        }
    },
    mounted() {
        this.createStackedChart();
    },


    methods: {
        createStackedChart() {
            const stackedChart = document.getElementById("stackedChart");

            this.chart = new Chart(stackedChart, {
                type: 'bar',
                data: {
                    labels: this.labels,
                    datasets: [{
                        label: "Number of Trees Saved",
                        data: this.data_values,
                        borderWidth: 4,
                        borderRadius: 80, // rounded bar graphs
                        borderSkipped: false,
                        backgroundColor: "#AFAAFF",
                        borderColor: "#DBD9FF",
                        order: 1,
                        yAxisID: 'yTrees', // Link to the first y-axis

                    },
                    {
                        label: 'Co2 Savings (kg)',
                        data: this.data_values1,
                        type: 'line',
                        yAxisID: 'yCO2', // Link to the second y-axis
                        backgroundColor: "#2F5F48",
                        borderColor: "#2F5F48",
                        borderWidth: 4,
                        order: 0,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, // Allows it to stretch to fill container
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
                        text: "Trees and Co2 Savings Over Time",
                        display: true,
                    },
                    legend: {
                        display: true,
                    },

                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    stacked: false,

                    scales: {
                        yTrees: {
                            ticks: {
                                font: {
                                    weight: "bold"
                                }
                            },
                            type: 'linear',
                            position: 'left',
                            beginAtZero: true, // Start from zero
                            grid: {
                                drawOnChartArea: false // Prevent grid lines on the right axis overlapping
                            },
                            title: {
                                display: true,
                                text: 'Trees Saved',
                                font: {
                                    weight: "bold" // Make the y-axis labels bold
                                }
                            }

                        },
                        yCO2: {
                            ticks: {
                                font: {
                                    weight: "bold"
                                }
                            },
                            type: 'linear',
                            position: 'right',
                            beginAtZero: true, // Start from zero
                            grid: {
                                drawOnChartArea: false // Prevent grid lines on the right axis overlapping
                            },
                            title: {
                                display: true,
                                text: 'CO2 Savings',
                                font: {
                                    weight: "bold" // Make the y-axis labels bold
                                }
                            }
                        },
                        x: {
                            grid: {
                                drawOnChartArea: false // Prevent grid lines on the right axis overlapping
                            },
                            ticks: {
                                font: {
                                    weight: "bold"
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            labels: {
                                padding: 10,
                                font: {
                                    weight: "bold"
                                }
                            }
                        },
                    }

                },



            });
        }, 
        
    },
};
</script>

<style scoped>
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