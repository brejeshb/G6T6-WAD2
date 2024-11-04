<!-- src/dashboardCharts/bubble.vue -->
<template>
    <div class="border rounded-5 p-2 p-md-3 p-lg-5 p-xl-5 w-100 h-100 bento" style="min-height: 600px;">
        <div class="text-center mb-4 w-100">
            <h1>Community's Trees Saved</h1>
        </div>
        <div class="chart-container">
            <canvas id="bubble"></canvas>
        </div>
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
                    maintainAspectRatio: true, // Allows it to stretch to fill container

                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
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

/* To make pie chart not become very big after resizing*/
</style>