<template>
    <div id="scene" class="">
        <h1 id="text" class="animated-text">Welcome Back <br> {{ currUser }}</h1>
        <img src="../assets/images/imgm1.png" alt="" class="img-layer" style="z-index: 2; mix-blend-mode: multiply;"
            id="img1">
        <img src="../assets/images/imgm2.png" alt="" class="img-layer" style="z-index: 1; mix-blend-mode: multiply;"
            id="img2">
        <img src="../assets/images/imgm3.png" alt="" class="img-layer" style="z-index: 3; mix-blend-mode: multiply;"
            id="img3">
        <img src="../assets/images/imgm4.png" alt="" class="img-layer" style="z-index: 4; mix-blend-mode: multiply;"
            id="img4">

    </div>
</template>

<script>
import { useAuth } from '../lib/auth'
// const { userName } = useAuth();

export default {
    name: "Landing",
    setup() {
    const { userName } = useAuth();
    const username = userName;
    return { username };
  },
    data() {
        return {
            currUser: ''
        }
    },
    mounted() {
        this.currUser = this.username;
        let text = document.getElementById("text");
        let img1 = document.getElementById('img1');
        let img2 = document.getElementById('img2');
        let img3 = document.getElementById('img3');

        window.addEventListener('scroll', function () {
            let value = window.scrollY;
            text.style.marginTop = value * -1.5 + 'px';
            img1.style.top = value * 0.75 + "px";
            img2.style.top = value * 0.5 + "px";
            img3.style.top = value * 0.25 + "px";

        });



    }
}
</script>

<style scoped>
/* Text Animation */
.animated-text {
    font-size: 2.5rem;
    font-weight: bold;
    color: #333;
    opacity: 0;
    transform: translateY(20px);
    letter-spacing: -2px;
    animation: classyFadeLoop 3.5s ease-out infinite;
}

/* Keyframes for a classy fade-in, spacing change, and fade-out loop */
@keyframes classyFadeLoop {
    0% {
        opacity: 0;
        transform: translateY(20px);
        letter-spacing: -2px;
    }

    20% {
        opacity: 1;
        transform: translateY(0);
        letter-spacing: 1px;
    }

    80% {
        opacity: 1;
        transform: translateY(0);
        letter-spacing: 1px;
    }

    100% {
        opacity: 0;
        transform: translateY(20px);
        letter-spacing: -2px;
    }
}


#scene {
    position: relative;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

#text {
    position: absolute;
    top: 30%;
    color: #FEFAE1;
    font-weight: bolder;
    font-size: 6vw;
    white-space: nowrap;
    text-align: center;
    z-index: 5;
    /* Ensure text is above all images */
}

.img-layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    transition: opacity 1s ease;
}
</style>
