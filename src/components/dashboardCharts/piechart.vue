<!-- src/dashboardCharts/PieChart.vue -->
<template>
    <div class="border rounded-5 w-100 h-100 p-5 p-sm-5 p-md-5 p-lg-5 p-xl-5"
        style="margin-right: 3em; background-color: white;">
        <div>
            <h1 class="text-center">Your Recycled Materials Distribution</h1>
        </div>

        <div class="chart-container">
            <canvas id="pieChartCanvas"></canvas>
        </div>
    </div>
</template>
<script>


export default {
    name: "PieChart",
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
        this.createPieChart();
    },

    methods: {
        createPieChart() {
            const ctx = document.getElementById("pieChartCanvas")
            const total = this.data_values.reduce((a, b) => a + b, 0); // Calculate total for percentage

            this.chart = new Chart(ctx, {
                type: "polarArea",
                data: {
                    labels: this.labels,
                    datasets: [
                        {
                            label: "Recycled Materials",
                            data: this.data_values,

                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, // Allows it to stretch to fill container

                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                padding: 10,
                                font: {
                                    weight: "bl"
                                }
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem) => {
                                    const label = tooltipItem.label || '';
                                    const value = tooltipItem.raw || 0;
                                    const percentage = ((value / total) * 100).toFixed(2) + '%';
                                    return `${label}: ${value} (${percentage})`; // HTML line break
                                }
                            }

                        },

                    }
                },
            });
        },

        // DUN INCLUDE
        // updateChart() {
        //     console.log("piechart.vue labels and data_values passed in: ");
        //     console.log(this.labels);
        //     console.log(this.data_values);

        //     console.log("My Chart");
        //     console.log(this.chart);

        //     // Use non-reactive copies to prevent reactivity loops
        //     this.chart.config.data.labels = this.labels.slice();
        //     this.chart.config.data.datasets[0].data = this.data_values.slice();

        //     this.chart.update();

        // }
    },

};
</script>

<style scoped>
/* Optional: Style specific to the PieChart component */
h1 {
    color: #788645;
    font-weight: bold;
    font-size: 27px;
}

/* To make pie chart not become very big after resizing*/
/* canvas {
    width: 80% !important;
    height: 100% !important;
} */

.chart-container {
    width: 100%;
    /* Makes the container fill the width of the parent */
    height: 100%;
    /* Adjusts the height automatically to maintain aspect ratio */
    max-width: 100%;
    /* Prevents overflow */
    max-height: 100%;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    display: flex;
    align-items: center;
    min-height: 400px;
    /* overflow: hidden; */
}

canvas {
    min-height: 200px;
    min-width: 200px;
    width: 100%;
    height: auto;
}

.pieLine1 {
    /* Card */
    cursor: pointer;
    box-shadow: 0 7px 25px rgb(0, 0, 0, 0.08);
}
</style>