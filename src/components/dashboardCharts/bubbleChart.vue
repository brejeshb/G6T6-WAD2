<!-- src/dashboardCharts/bubble.vue -->
<template>
    <div class="w-100">
        <div class="text-center h-100">
            <h1>Community's Trees Saved</h1>
        </div>
        <div style="position: relative;height: 100%;width:100%;margin: auto;">
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

/* To make pie chart not become very big after resizing*/
</style>