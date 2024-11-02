<!-- src/dashboardCharts/bubble.vue -->
<template>
    <div class="h-100 ">
        <div class="pt-2 ps-2 pe-2 text-center h-100 mb-3">
            <h1>Trees Saved (you vs Community)</h1>
        </div>
        <canvas id="bubble" ></canvas>
        <!-- Use ref to reference the canvas element -->

    </div>
</template>

<script>



export default {
    name: "bubble",
    data() {
        return {
            chart: null
        }
    },
    props: {

        data_values: {
            type: Array,
            required: true
        },
    },
    mounted() {
        this.createBubbleChart();
    },

    methods: {
        createBubbleChart() {

            const bubble = document.getElementById("bubble");

            this.chart = new Chart(bubble, {
                type: "bubble",
                data: {
                    labels: this.labels,

                    datasets: [
                        {
                            label: "Everyone's Trees Saved (All Time)",
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
                            }, 
                            display: false
                        },
                        tooltip: { intersect: true }

                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Co2 Savings',
                            }, 
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Trees Saved'
                            },
                            grid: {
                                display: false,
                            },
                        },
                    },
                },

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
    /* height: 100% !important; */
}
</style>