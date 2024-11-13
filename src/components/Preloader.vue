<template>
    <div v-if="loading" class="preloader">
        <p>Please wait while we are still recycling<span class="dots">...</span></p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: true,
        };
    },
    mounted() {
        window.addEventListener("load", this.onPageLoad);
    },
    beforeDestroy() {
        window.removeEventListener("load", this.onPageLoad);
    },
    methods: {
        onPageLoad() {
            this.loading = false;
        },
    },
};
</script>

<style scoped>
.preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #FEFAE0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

p {
    font-size: 30px;
    font-weight: bold;
    color: #798645;
}

.dots {
    display: inline-block;
    animation: dots 1s steps(5, end) infinite;
}

@keyframes dots {
    0%, 20% { content: "."; }
    40% { content: ".."; }
    60% { content: "..."; }
    80%, 100% { content: ""; }
}
</style>
