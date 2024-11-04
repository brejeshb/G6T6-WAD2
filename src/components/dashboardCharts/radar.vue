<!-- src/dashboardCharts/PieChart.vue -->
<template>
    <div class="border rounded-5 w-100 h-100 p-1 p-md-3 p-lg-5 p-xl-5 bento" style="min-height: 600px;">
        <div class="text-center mb-4">
            <h1>Relative Personal Stats</h1>
        </div>
        <div class="chart-container">
            <canvas id="radar"></canvas> <!-- Use ref to reference the canvas element -->
        </div>
    </div>


</template>

<script>


export default {
    name: "Radar",
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
        this.createRadar();
    },

    methods: {
        createRadar() {
            const ctx = document.getElementById("radar");

            this.chart = new Chart(ctx, {
                type: "radar",
                data: {
                    labels: this.labels,
                    datasets: [
                        {
                            label: "User",
                            data: this.data_values,
                            borderWidth: 1
                        },
                        {
                            label: "Avg User",
                            data: this.data_values1,
                            borderWidth: 1

                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true, // Allows it to stretch to fill container

                    plugins: {
                        legend: {
                            display: true
                        },

                    },
                    scales: {
                        r: {
                            pointLabels: {
                                callback: function (label) {
                                    return label.split('\n'); // Split labels by '\n' to make them multi-line
                                },
                                font: {
                                    size: 14,
                                    weight: "bold"
                                },
                                padding: 20
                            },

                        }
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

.chart-container {
    width: 100%;
    /* Makes the container fill the width of the parent */
    height: 100%;
    /* Adjusts the height automatically to maintain aspect ratio */
    max-width: 100%;
    /* Prevents overflow */
    max-height: 90%;
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
</style>