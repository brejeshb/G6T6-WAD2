<!-- src/dashboardCharts/PieChart.vue -->
<template>
    <div class="h-100">
        <div class="pt-2 ps-2 pe-2 text-center">
            <h1>Relative Personal Stats</h1>
        </div>
        <div style="position: relative; height:100%;width: 100%;">
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

                    plugins: {
                        legend: {
                            display: true
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
</style>