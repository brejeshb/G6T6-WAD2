<template>
    <footer class="footer">
        <div class="footer__addr" >
            <h1 class="footer__logo fw-bold">Recycle Lah</h1>

            <h2>Address</h2>

            <address >
                81 Victoria St, Singapore 188065
                <br><br>

                <a class="footer__btn" href="mailto:hnmok@smu.edu.sg">Email Us</a>
            </address>
        </div>

        <ul class="footer__nav" >
            <li class="nav__item">
                <h2 class="nav__title">Members</h2>

                <ul class="nav__ul">
                    <li>
                        <a href="#">Wei Lun</a>
                    </li>

                    <li>
                        <a href="#">Anna </a>
                    </li>

                    <li>
                        <a href="#">Brejesh </a>
                    </li>
                    <li>
                        <a href="#">Yi Luan </a>
                    </li>
                    <li>
                        <a href="#">Chen Sang</a>
                    </li>
                </ul>
            </li>

            <li class="nav__item nav__item--extra" >
                <h2 class="nav__title">Languages Used</h2>

                <ul class="nav__ul nav__ul--extra">
                    <li>
                        <a href="#">Bootstrap </a>
                    </li>

                    <li>
                        <a href="#">Vue</a>
                    </li>

                    <li>
                        <a href="#">Chart JS</a>
                    </li>

                    <li>
                        <a href="#">CSS</a>
                    </li>

                    <li>
                        <a href="#">HTML</a>
                    </li>

                    <li>
                        <a href="#">Javascript</a>
                    </li>
                </ul>
            </li>

            <li class="nav__item" >
                <h2 class="nav__title">Features</h2>

                <ul class="nav__ul">
                    <li>
                        <a href="#">Dashboard</a>
                    </li>

                    <li>
                        <a href="#">Item Identifier</a>
                    </li>

                    <li>
                        <a href="#">Education Hub</a>
                    </li>
                    <li>
                        <a href="#">Shop</a>
                    </li>
                    <li>
                        <a href="#">Leaderboard</a>
                    </li>
                </ul>
            </li>
        </ul>

        <div class="legal" >
            <p>&copy; 2024 WAD II Project. All rights reserved.</p>

            <div class="legal__links">
                <span>Made with <span class="heart">♥</span> remotely from Singapore</span>
            </div>
        </div>
        <br>
    </footer>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import the AOS styles

export default {
    name: "Footer",
    mounted() {
        document.addEventListener('DOMContentLoaded', () => {
            AOS.refresh();
        });
        AOS.init({
            duration: 300, // Animation duration in milliseconds
            easing: 'ease-in-out', // Animation easing
            once: false,
        });
    },
};
</script>

<style scoped>
*,
*:before,
*:after {
    box-sizing: border-box;
}

html {
    font-size: 100%;
}

body {
    font-family: acumin-pro, system-ui, sans-serif;
    margin: 0;
    display: grid;
    grid-template-rows: auto 1fr auto;
    font-size: 14px;
    background-color: #f4f4f4;
    align-items: start;
    min-height: 100vh;
}

.footer {
    display: flex;
    flex-flow: row wrap;
    padding: 30px 30px 20px 30px;
    color: #2f2f2f;
    background-color: #F6F6F6;
    border-top: 1px solid #F6F6F6;
}

.footer>* {
    flex: 1 100%;
}

.footer__addr {
    margin-right: 1.25em;
    margin-bottom: 2em;
}

.footer__logo {
    font-family: 'Pacifico', cursive;
    font-weight: 400;
    text-transform: lowercase;
    font-size: 1.5rem;
}

.footer__addr h2 {
    margin-top: 1.3em;
    font-size: 15px;
    font-weight: 400;
}

.nav__title {
    font-weight: 400;
    font-size: 15px;
}

.footer address {
    font-style: normal;
    color: #999;
}

.footer__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    max-width: max-content;
    background-color: rgb(33, 33, 33, 0.07);
    border-radius: 100px;
    color: #2f2f2f;
    line-height: 0;
    margin: 0.6em 0;
    font-size: 1rem;
    padding: 0 1.3em;
}

.footer ul {
    list-style: none;
    padding-left: 0;
}

.footer li {
    line-height: 2em;
}

.footer a {
    text-decoration: none;
}

.footer__nav {
    display: flex;
    flex-flow: row wrap;
}

.footer__nav>* {
    flex: 1 50%;
    margin-right: 1.25em;
}

.nav__ul a {
    color: #999;
}

.nav__ul--extra {
    column-count: 2;
    column-gap: 1.25em;
}

.legal {
    display: flex;
    flex-wrap: wrap;
    color: #999;
}

.legal__links {
    display: flex;
    align-items: center;
}

.heart {
    color: #2f2f2f;
}

@media screen and (min-width: 24.375em) {
    .legal .legal__links {
        margin-left: auto;
    }
}

@media screen and (min-width: 40.375em) {
    .footer__nav>* {
        flex: 1;
    }

    .nav__item--extra {
        flex-grow: 2;
    }

    .footer__addr {
        flex: 1 0px;
    }

    .footer__nav {
        flex: 2 0px;
    }
}
</style>
