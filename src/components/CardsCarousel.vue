<template>
    <div class="container-fluid p-5 h-75" style="background-color: #FEFAE0;color: #788645;" id="thirdDiv">
        <div class="container-fluid ps-5 pe-5 pt-5 carousel-container" style="height: 100%;position: relative;"
            data-aos="fade-right">
            <!-- Adjust card height-->
            <!-- Pressable Link-->
            <h1 style="font-weight: bold;">Dashboard Tutorial</h1>
            <p>Scroll horizontally below!</p>
            <hr>


            <div class="appleCarousel row-cols-1 row-cols-md-4 g-5 w-100 mx-auto" data-aos="zoom-in-right">
                <div class="item col">
                    <div class="card h-100">
                        <div>
                            <img src="../assets/images/radar.png" class="card-img-top " alt="">
                        </div>
                        <div class="card-body">
                            <div>
                                <h3 class="card-title fw-bold">Where I stand?</h3>
                            </div>
                            <p class="card-text">
                                See how your impact compares to other eco-warriors. The closer to 100, the more powerful
                                you are!


                            </p>
                        </div>
                    </div>
                </div>

                <div class="item col">
                    <div class="card h-100 text-bg-light">
                        <div>
                            <img src="../assets/images/bub.png" class="card-img-top " alt="">
                        </div>
                        <div class="card-body">
                            <div>
                                <h3 class="card-title fw-bold">Global Forest Restoration</h3>
                            </div>
                            <p class="card-text">With this scatter plot, get to see how many trees everyone saved to
                                take a step closer
                                to resurrection of Mother Gaia!
                            </p>
                        </div>
                    </div>
                </div>

                <div class="item col">
                    <div class="card h-100 text-bg-light">
                        <div>
                            <img src="../assets/images/socials.jpeg" class="card-img-top " alt="">
                        </div>
                        <div class="card-body">
                            <div>
                                <h3 class="card-title fw-bold">Flaunt Your Achievements</h3>
                            </div>
                            <p class="card-text">Love your recycling dashboard? Just press <span
                                    style="color: #788645;font-weight: bolder;">
                                    Download Now
                                </span> to screenshot and share to your network now!</p>
                        </div>
                    </div>
                </div>

                <div class="item col">
                    <div class="card text-bg-light h-100 ">
                        <div>
                            <img src="../assets/images/piechart.png" class="card-img-top " alt="">
                        </div>
                        <div class="card-body">
                            <div>
                                <h3 class="card-title fw-bold">Recycled Material Distribution</h3>
                            </div>
                            <p class="card-text"> Understand your recycling composition and know how to contribute
                                better!
                            </p>
                        </div>
                    </div>
                </div>

                <div class="item col">
                    <div class="card h-100 text-bg-light">
                        <div>
                            <img src="../assets/images/stack.png" class="card-img-top " alt="">
                        </div>
                        <div class="card-body">
                            <div>
                                <h3 class="card-title fw-bold">Your Carbon Neutral Odyssey</h3>
                            </div>

                            <p class="card-text">Instantly see your environmental impact and take further actions to
                                reduce it!</p>
                        </div>
                    </div>
                </div>

                <div class="item col">
                    <div class="card h-100 text-bg-light">
                        <div>
                            <img src="../assets/images/ranking.png" class="card-img-top " alt="">
                        </div>
                        <div class="card-body">
                            <div>
                                <h3 class="card-title fw-bold">Know Your Rankings</h3>
                            </div>
                            <p class="card-text">Curious to see how you stand amongst other recycling warriors? With
                                this chart, you see how much you rose!
                            </p>
                        </div>
                    </div>
                </div>



                <div class="item col">
                    <div class="card h-100 text-bg-light">
                        <div>
                            <img src="../assets/images/doughnut.png" class="card-img-top " alt="">
                        </div>
                        <div class="card-body">
                            <div>
                                <h3 class="card-title fw-bold">Your Sustainable Footprint</h3>
                            </div>
                            <p class="card-text">Visualise your impact in relation to the community
                                of recycling warriors out there!
                            </p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </div>
</template>
<script>

import AOS from 'aos';
import 'aos/dist/aos.css';  // Import the AOS styles

export default {
    name: "CardsCarousel",
    mounted() {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            easing: 'ease-in-out', // Animation easing
            once: false,
        });
    },
};
</script>

<style scoped>
.carousel-container {
    position: relative;
}

.appleCarousel {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 1rem;
    /* scrollbar-width: none; */
    /* Hides scrollbar */
    /* Hide scrollbar in Firefox */
}


.item {
    scroll-snap-align: start;
    flex-shrink: 0;

}

.card-img-top {
    height: 400px;
    /* Set a fixed height */
    object-fit: cover;
    /* Crop to fit the set dimensions */
    background-position: center;
    border-top-left-radius: 10%;
    border-top-right-radius: 10%;
    border-width: 0px;


}

.card-title {
    color: #788645;
}

.card-body {
    padding: 6%;
    font-weight: 550;
    color: gray;
}

.card {
    border-width: 0px;
    border-radius: 10%;


}
</style>
