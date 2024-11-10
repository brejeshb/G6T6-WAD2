<template>
    <div class="d-flex flex-column align-items-center p-5 h-100" style="background-color: #FEFAE0;color: #788645;">
        <div class="ps-5 pe-5 pt-5 carousel-container" style="height: 100%;position: relative;">
            <h1 style="font-weight: bold;">How to earn more points?</h1>
            <hr>

            <div class="appleCarousel  w-100 mx-auto">

                <div class="item col-lg-6 col-12">
                    <div class="card h-100">
                        <div>
                            <img src="../assets/images/bin.jpg" class="card-img-top " alt="">
                        </div>
                        <div class="card-body">
                            <div>
                                <h3 class="card-title fw-bold">Recycle items</h3>
                            </div>
                            <p class="card-text">
                                Recycle right! Snap a picture and upload it under our Item Identifier page.
                                If it is recyclable, you can recycle it and earn points!


                            </p>
                        </div>
                    </div>
                </div>

                <div class="item col-lg-6 col-12">
                    <div class="card h-100">
                        <div>
                            <img src="../assets/images/quiz.jpg" class="card-img-top " alt="">
                        </div>
                        <div class="card-body">
                            <div>
                                <h3 class="card-title fw-bold">Complete Quizzes</h3>
                            </div>
                            <p class="card-text">
                                Watch our educational videos and test your knowledge with quizzes.
                                Complete quizzes, gain knowledge, earn points, and make a positive impact on the
                                planet!
                            </p>
                        </div>
                    </div>
                </div>






            </div>

        </div>
    </div>
</template>
<script>
export default {
    name: "LeaderboardCarousel",


}
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
    width: max-content;
    margin: 0 auto;
    padding: 0 1rem;

}



.item {
    scroll-snap-align: start;
    flex-shrink: 0;
    flex: 0 0 auto;
}

.card-img-top {
    height: 400px;
    /* Set a fixed height */
    object-fit: cover;
    /* Crop to fit the set dimensions */
    background-position: center;
    border-top-left-radius: 10%;
    border-top-right-radius: 10%;

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
    box-shadow: 0 7px 25px rgb(0, 0, 0, 0.08);
    border-radius: 10%;
}
</style>
