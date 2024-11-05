<!-- src/dashboardCharts/PieChart.vue -->
<template>
    <div class="border rounded-5 w-100 h-100 p-1 p-md-3 p-lg-5 p-xl-5 bento"
        style="min-height: 600px;">
        <div class="text-center mb-4">
            <h1>Your Co2 Savings Contribution</h1>
        </div>
        <div class="chart-container">
            <canvas id="doughnut"></canvas> <!-- Use ref to reference the canvas element -->
        </div>
    </div>
</template>

<script>


export default {
    name: "Doughnut",
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
            const ctx = document.getElementById("doughnut");

            const doughnutLabel = {
                id: 'doughnutLabel',
                beforeDatasetsDraw(chart, args, pluginOptions) {
                    const { ctx, data } = chart;
                    ctx.save();
                    const xCoor = chart.getDatasetMeta(0).data[0].x;
                    const yCoor = chart.getDatasetMeta(0).data[0].y;
                    ctx.font = 'bold 30px sans-serif';
                    ctx.fillStyle = '#788645';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(`${(data.datasets[0].data[0] / (data.datasets[0].data[0] + data.datasets[0].data[1]) * 100).toFixed(2)}%`, xCoor, yCoor);
                }
            }


            this.chart = new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: this.labels,
                    datasets: [
                        {
                            label: "Co2 Savings",
                            data: this.data_values,
                            borderWidth: 1,
                            cutout: '60%', 
                            hoverOffset: 40, 
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, // Allows it to stretch to fill container
                    aspectRatio: 1,


                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                            },
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: (tooltipItem) => {
                                    const label = tooltipItem.label || '';
                                    const value = tooltipItem.raw || 0;
                                    return `${label}: ${value} kg`; // HTML line break
                                }
                            }

                        },

                    },

                },
                plugins: [doughnutLabel]

            });
        },


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

.chart-container {
    width: 100%;
    /* Makes the container fill the width of the parent */
    height: 100%;
    /* Adjusts the height automatically to maintain aspect ratio */
    max-width: 100%;
    /* Prevents overflow */
    max-height: 80%;
    margin-right: auto;
    margin-left: auto;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    /* overflow: hidden; */
}

.bento {
    /* Card */
    cursor: pointer;
    box-shadow: 0 7px 25px rgb(0, 0, 0, 0.08);
}

.bento:hover{
    background-color: #E7F5EE;
}
</style>