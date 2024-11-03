<template>
    <div class="w-100">
        <div class="">
            <h1 style="text-align: center;">Your Trees & Co2 Savings Over Time </h1>
        </div>

        <div style="position: relative;width: 89%;height: 100%;margin: auto;">
            <canvas id="stackedChart"></canvas>
        </div>
    </div>
</template>

<script>

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
                        borderWidth: 1,
                        borderRadius: 80, // rounded bar graphs
                        borderSkipped: false,
                        yAxisID: 'yTrees' // Link to the first y-axis

                    },
                    {
                        label: 'Co2 Savings (kg)',
                        data: this.data_values1,
                        type: 'line',
                        yAxisID: 'yCO2', // Link to the second y-axis
                        order: 0,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, // Allows it to stretch to fill container

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
                            }
                        },
                        x: {
                            grid: {
                                drawOnChartArea: false // Prevent grid lines on the right axis overlapping
                            }
                        }
                    },

                },

            });
        }
    },
};
</script>

<style scoped>
h1 {
    color: #788645;
    font-weight: bold;
    font-size: 27px;
}

canvas {
    /* width: 80% !important;
    height: 100% !important;
    margin: auto !important; */
}
</style>