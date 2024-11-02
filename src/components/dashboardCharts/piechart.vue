<!-- src/dashboardCharts/PieChart.vue -->
<template>
    <div class="h-100">
        <div class="pt-2 ps-2 pe-2 mb-5">
            <h1 class="text-center">Your Recycled Materials Distribution</h1>
        </div>

        <div style="position: relative; height:100%;width: 100%;">
            <canvas id="pieChartCanvas" class="h-100"></canvas> <!-- Use ref to reference the canvas element -->
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
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                                padding: 10
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
canvas {
    /* width: 100% !important;
    height: 100% !important; */
}
</style>