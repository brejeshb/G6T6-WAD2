<!-- src/dashboardCharts/PieChart.vue -->
<template>
    <div class="h-100">
        <div class="pt-2 ps-2 pe-2 text-center mb-3">
            <h1>Your Co2 Savings Contribution</h1>
        </div>
        <canvas id="doughnut" class="mx-auto"></canvas> <!-- Use ref to reference the canvas element -->
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
                    ctx.fillText(`${(data.datasets[0].data[0]/(data.datasets[0].data[0] + data.datasets[0].data[1])*100).toFixed(2)}%`, xCoor, yCoor);
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
                            cutout: '60%'
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

/* To make pie chart not become very big after resizing*/
canvas {
    height: 100% !important;
}
</style>