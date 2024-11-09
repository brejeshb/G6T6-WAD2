<!-- src/dashboardCharts/bubble.vue -->
<template>
    <div class="border rounded-5 p-2 p-md-3 p-lg-5 p-xl-5 w-100 h-100 bento" style="min-height: 600px;">
        <div class="text-center mb-4 w-100">
            <h1>Community's Trees Saved</h1>
        </div>
        <div class="chart-container h-100">
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
        isUser: {
            type: Number,
            required: true
        }
    },
    mounted() {
        this.createBubbleChart();
    },

    methods: {
        createBubbleChart() {

            const bubble = document.getElementById("bubble");

            // Define the plugin object
            const youPlugin = {
                id: 'you',
                beforeDatasetsDraw: this.drawYouLabel // Call the method defined in `methods`
            };

            this.chart = new Chart(bubble, {
                type: "bubble",
                data: {
                    labels: this.labels,

                    datasets: [
                        {
                            label: "Everyone's Trees Saved (All Time)",
                            data: this.data_values.map((point, index) => ({
                                x: point.x,
                                y: point.y,
                                r: index === this.isUser ? point.r * 2 : point.r // Double the size for the user's dot
                            })),
                            // borderWidth: 3,
                            backgroundColor: this.data_values.map((_, index) =>
                                index === this.isUser ? '#B7E5AB' : "#76A0AE"
                            ),
                            // borderColor: this.data_values.map((_, index) =>
                            //     index === this.isUser ? '#A6C4A7' : '#A6C4A7'
                            // ),

                        }
                    ]
                },
                plugins: [youPlugin],
                options: {
                    responsive: true,
                    maintainAspectRatio: true, // Allows it to stretch to fill container

                    plugins: {
                        legend: {
                            position: 'top',
                            labels: {
                            },
                            display: false,
                        },
                        labelPlugin: {
                            display: true
                        },

                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Co2 Savings',
                                font: {
                                    weight: "bold" // Make the y-axis labels bold
                                }
                            },
                            grid: {
                                display: false,
                            },
                            ticks: {
                                font: {
                                    weight: "bold" // Make the y-axis labels bold
                                }
                            },

                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Number of Trees Saved',
                                font: {
                                    weight: "bold" // Make the y-axis labels bold
                                }
                            },
                            grid: {
                                display: false,
                            },
                            ticks: {
                                font: {
                                    weight: "bold" // Make the y-axis labels bold
                                }
                            },
                        },
                    },
                },


            });
        },
        drawYouLabel(chart) {
            const { ctx } = chart;
            const userIndex = this.isUser;

            // Save the context state
            ctx.save();

            // Find the data point for "You" using `userIndex`
            const datasetIndex = 0; // Assuming "You" is in the first dataset
            const meta = chart.getDatasetMeta(datasetIndex);
            const userDataPoint = meta.data[userIndex];

            if (userDataPoint) {
                const xCoor = userDataPoint.x;
                const yCoor = userDataPoint.y;

                // Set font properties and alignment for the "You" label
                ctx.font = 'bold 20px sans-serif';
                ctx.fillStyle = '#788645';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';

                // Draw "You" label above the data point
                const offset = 20; // Adjust offset to position above the point
                ctx.fillText('You!', xCoor, yCoor - offset);

            }



            // Restore the context state
            ctx.restore();
        }
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