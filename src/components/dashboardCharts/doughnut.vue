<!-- src/dashboardCharts/PieChart.vue -->
<template>
    <div class="">
        <div class="text-center">
            <h1>Your Co2 Savings Contribution</h1>
        </div>
        <div style="position: relative; width: 100%;height: 100%; margin: auto;">
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
                            cutout: '60%'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Allows it to stretch to fill container

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
</style>