<template>
    <!-- Bento Dashboard (Including key metrics + map + sharing features)-->
    <!--https://dribbble.com/tags/bento-ui-->
    <!--https://ui-libs.vercel.app/-->
    <!--https://www.justinmind.com/ui-design/cards-->

    <div class="container-fluid" v-if="allChartsReady" style="background-color:  #F3F2EC;">
        <div class="container-fluid p-0 ps-xl-5 pe-xl-5 pt-xl-5 pb-xs-0 dashboard h-100"
            style="background-color: #F3F2EC ;"> <!-- Adjust dashboard div color-->
            <div class="pb-0 p-xl-5 pb-0">
                <h1 data-aos="fade-right">Recycle Right, Feel Right!</h1>
                <p class="fw-bold" style="color:#788645 ;font-style: italic;" data-aos="fade-right">Here's the recycling
                    statistics in your
                    current lifetime ♥︎
                </p>
            </div>

            <div id="dashboard" class="p-0 p-xl-5 pt-0" data-aos="fade-right">

                <div style="background-color: #788645;padding: 5px;margin-bottom: 3em;">
                    <h1 style="text-align: center;font-weight: 900;color: #FEFAE1;" class="title">୨⎯ your dashboard ⎯୧
                    </h1>
                </div>

                <div class="container-fluid" style="margin-bottom: 3em">
                    <div class="row gx-5">
                        <div class="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                            <div class="col1 rounded-4 d-flex justify-content-between h-100 ">
                                <div class="w-75">
                                    <h1 class="stats text-wrap text-truncate">{{ username }}</h1>
                                    <div class="cardName">Username ࣪ ִֶָ☾.</div>
                                </div>

                                <div class="iconBox">
                                    <ion-icon name="people" class="d-block d-sm-none  d-md-none d-lg-block"></ion-icon>
                                </div>
                            </div>
                        </div>


                        <div class="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                            <div class="col1 rounded-4 d-flex justify-content-between h-100 ">
                                <div class="w-75">
                                    <h1 class="stats text-wrap">{{ totalCo2Reduction }} kg</h1>
                                    <div class="cardName">Total CO2 Reduction ✧₊⁺</div>
                                </div>

                                <div class="iconBox">
                                    <ion-icon name="earth" class="d-block d-sm-none  d-md-none d-lg-block"></ion-icon>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                            <div class="col1 rounded-4 d-flex justify-content-between h-100">
                                <div class="w-75">
                                    <h1 class="stats text-wrap">{{ totalTreesSaved }}</h1>
                                    <div class="cardName">Total Trees Saved 𖡼𖤣𖥧</div>
                                </div>

                                <div class="iconBox">
                                    <ion-icon name="leaf" class="d-block d-sm-none  d-md-none d-lg-block"></ion-icon>
                                </div>
                            </div>

                        </div>
                        <div class="col-lg-3 col-sm-6 mb-4 mb-lg-0">
                            <div class="col1 rounded-4 d-flex justify-content-between h-100 ">
                                <div class="w-75">
                                    <h1 class="stats text-wrap">{{ currRankingFormatted }}</h1>
                                    <div class="cardName">Current Ranking ♛ </div>
                                </div>

                                <div class="iconBox">
                                    <ion-icon name="ribbon" class="d-block d-sm-none d-md-none d-lg-block"></ion-icon>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <!-- Pie Chart + Trees Saved Stacked (Done Responsiveness) -->
                <div class="container-fluid" style="margin-bottom: 3em;"> <!-- Outer container has h-100 -->
                    <div class="row gx-5">
                        <!-- Row has h-100 and align-items-stretch -->

                        <!-- Left Column with Pie Chart -->
                        <div v-if="dataLoaded" class="col-xl-4 col-12 mb-4 mb-lg-0 mx-auto" style="margin-right: 3em;">
                            <PieChart :labels="recycledLabels" :data_values="recycledDataValues" />
                        </div>


                        <!-- Right Column with Trees Saved Chart -->
                        <div v-if="treesReady" class="col-xl-8 col-12 mx-auto mb-4 mb-lg-0">
                            <TreesSaved :labels="timeX" :data_values="treesSaved" :data_values1="co2Savings" />
                        </div>

                    </div>
                </div>

                <!-- Leaderboard Ranking + Radar (Done Responsiveness) -->
                <div class="container-fluid" style="margin-bottom: 3em;">
                    <div class="row gx-5">

                        <div v-if="leaderboardReady" class="col-xl-7 col-12 mb-4 mb-lg-0 mx-auto"
                            style="margin-right: 3em;">
                            <leaderboardRanking :labels="timeX" :data_values="highestRankData" />
                        </div>


                        <div v-if="radarReady" class="col-xl-5 col-12 mb-4 mb-lg-0 mx-auto">
                            <Radar :labels="radarCat" :data_values="radarUser" :data_values1="radarAvgUser" />
                        </div>
                    </div>
                </div>

                <!--Last Row-->
                <div class="container-fluid" style="margin-bottom: 3em;">
                    <div class="row gx-5">
                        <div v-if="bubbleReady" class="col-xl-4 col-12 mb-4 mb-lg-0">
                            <bubble :data_values="bubbleData" :isUser="index" />
                        </div>

                        <div v-if="doughnutReady" class="col-xl-4 col-12 mb-4 mb-lg-0">
                            <Doughnut :labels="doughnutX" :data_values="co2SavingsY" />

                        </div>

                        <div v-if="socialsReady" class="col-xl-4 col-12 mb-4 mb-lg-0">
                            <SocialsDiv />
                        </div>
                    </div>
                </div>



            </div>
            <div class="w-25 mx-auto">
                <Button v-on:click="captureAndDownload" :text="buttonText" />
            </div>

        </div>
    </div>

</template>

<script>




// Importing Smaller Components
import { supabase } from '../lib/supabaseClient';

import PieChart from './dashboardCharts/piechart.vue';
import TreesSaved from './dashboardCharts/treesSavedChart.vue';
import leaderboardRanking from './dashboardCharts/leaderboardRankingOverTime.vue';
import bubble from './dashboardCharts/bubbleChart.vue';
import Radar from './dashboardCharts/radar.vue';
import Doughnut from './dashboardCharts/doughnut.vue';
import SocialsDiv from './dashboardCharts/socialsIcons.vue';
import Button from './dashboardCharts/button.vue';
import { useAuth } from '../lib/auth'
import { ref, watchEffect } from 'vue';
import { Bubble } from 'vue-chartjs';
import BubbleChart from './dashboardCharts/bubbleChart.vue';
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import the AOS styles

const { userName } = useAuth();
var currUser = userName;
console.log(userName);


export default {
    name: "Dashboard",
    components: {
        PieChart,
        TreesSaved,
        leaderboardRanking,
        bubble,
        Radar,
        Doughnut,
        SocialsDiv,
        Button,
    },
    data() {
        return {
            // button 
            buttonText: "Download Now",

            username: currUser,
            totalCo2Reduction: 0,
            totalTreesSaved: 0,
            currRanking: null,

            // For Pie Chart - Make this be based on Supabase 
            recycledLabels: [], // Labels for pie chart
            recycledDataValues: [], // Data values for pie chart
            dataLoaded: false,

            // For Total Trees Saved 
            timeX: [],
            treesSaved: [],
            treesReady: false,
            co2Savings: [],

            // For Leaderboard Ranking 
            highestRankData: [],
            leaderboardReady: false,

            // for Bubble 
            bubbleReady: false,
            bubbleData: [],
            index: 0,

            // for radar 
            radarReady: false,
            radarCat: ["Total Points", "Quizzes\nCompleted", "Trees Saved", "Current Points", "Rank Growth"],
            radarUser: [],
            radarAvgUser: [],

            //Doughnut 
            doughnutReady: false,
            doughnutX: [],
            co2SavingsY: [],

            // Socials: 
            socialsReady: true,

            // Overall
            allChartsReady: false


        }
    },
    async created() {
        // fetch data from Supabase
        await this.fetchAllData();
    },
    computed: {
        currRankingFormatted() {
            if (this.currRanking == null) {

            }
            else if (this.currRanking == 1) {
                return this.currRanking + "st";
            }
            else if (this.currRanking == 2) {
                return this.currRanking + "nd";
            }
            else if (this.currRanking == 3) {
                return this.currRanking + "rd";
            }
            else {
                return this.currRanking + "th";
            }
        }
    },
    methods: {
        async fetchAllData() {
            await this.fetchUserStats();
            await this.fetchUserRecycledMaterials();
            await this.fetchNumTreesSavedOverTime();
            await this.fetchLeaderboardOverTime();
            await this.fetchBubbleChartData();
            await this.fetchDoughnutData();
            await this.fetchRadarData();

            // Set `allChartsReady` only when all individual flags are ready

            this.allChartsReady = true;
        },
        // Number Metrics 
        async fetchUserStats() {
            this.totalCo2Reduction = 0;
            this.totalTreesSaved = 0;
            console.log(this.username);
            try {
                // Get CO2 EMISSION DATA + TREES SAVED
                let { data: UserOverallStatsTable, error: error1 } = await supabase
                    .from('UserOverallStatsTable')
                    .select('*') // Select all columns
                    .eq('username', this.username);

                if (error1) {
                    console.log("Can't fetch from UserOverallStatsTable");
                    console.log(error1);
                    return;
                }
                else {
                    console.log(UserOverallStatsTable); // <Object>

                    console.log(UserOverallStatsTable);
                    this.totalCo2Reduction = UserOverallStatsTable[0].total_co2_emission_reduction;
                    this.totalTreesSaved = UserOverallStatsTable[0].total_trees_saved;

                    // Testing Purposes
                    // console.log(`Username: ${this.username}`);
                    // console.log(`Total CO2 Emission Reduction: ${this.totalCo2Reduction}`);
                    // console.log(`Total Number of Trees Saved: ${this.totalTreesSaved}`);
                }

                // GET USER'S CURRENT RANKINGS
                let { data: HistoricalLeaderboardTable, error: error2 } = await supabase
                    .from('HistoricalLeaderboardTable')
                    .select("*")
                    .eq("username", this.username)
                    .order('updated_at', { ascending: false })
                    .limit(1);

                // console.log("HistoricalLeaderboardTable");
                // console.log(HistoricalLeaderboardTable);
                console.log(HistoricalLeaderboardTable);
                if (error2) {
                    console.log("Can't fetch from HistoricalLeaderboardTable");
                    console.log(error2);
                    return;
                }
                else {
                    // Valid Rank (Old User)
                    if (HistoricalLeaderboardTable[0].rank != undefined) {
                        this.currRanking = HistoricalLeaderboardTable[0].rank;

                        // Testing Purposes
                        console.log(`Current Ranking: ${this.currRanking}`);
                    }
                }

            } catch (error) {
                console.log(error);

            }
        },

        // For Pie Chart
        async fetchUserRecycledMaterials() {
            // returns a list of items user recycled 

            // Defensive coding to prevent maximum call stack 
            this.recycledLabels = [];
            this.recycledDataValues = [];

            var userRecycledItemsDict = {};
            try {
                let { data: allUserRecycledItems, error1 } = await supabase
                    .from('UserActivitiesTable')
                    .select('*')
                    .eq('username', this.username) // return <Arr> of <Object>

                if (error1) {
                    console.log("Can't fetch from UserOverallStatsTable");
                    console.log(error1);
                    return;
                }
                else {
                    // Testing 
                    console.log("From Supabase: All of User's Recycled Items:");
                    console.log(allUserRecycledItems); // Arr of <Object>

                    for (let obj of allUserRecycledItems) {
                        userRecycledItemsDict[obj.recycled_material] = (userRecycledItemsDict[obj.recycled_material] || 0) + 1;
                    }

                    // Test Dictionary 
                    console.log("Dictionary Created:");
                    console.log(userRecycledItemsDict); // <Dict>

                    this.recycledLabels = Object.keys(userRecycledItemsDict).slice();
                    this.recycledDataValues = Object.values(userRecycledItemsDict).slice();


                    console.log("This RecycledLabels + RecycledDataValues: ");
                    console.log(this.recycledLabels);
                    console.log(this.recycledDataValues);
                    this.dataLoaded = true;

                }

            } catch (error) {
                console.log(error);
            }
        },

        // For Trees over time 
        async fetchNumTreesSavedOverTime() {
            this.timeX = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            this.treesSaved = [];
            this.co2Savings = [];
            try {
                let { data: UsernameMonthlyTreesSavedView, error2 } = await supabase
                    .from('MonthlyTreesSavedView')
                    .select('*')
                    .eq('username', this.username)
                    .order('month_number');

                if (error2) {
                    console.log(error2);
                }
                else {
                    console.log(UsernameMonthlyTreesSavedView);

                    for (let month of this.timeX) {
                        let found = false;
                        for (let obj of UsernameMonthlyTreesSavedView) {
                            if (month == obj.month_string.slice(0, 3)) {
                                this.treesSaved.push(obj.numtreessaved.toFixed(4));
                                this.co2Savings.push(obj.totalco2savings);
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            this.treesSaved.push(0);
                            this.co2Savings.push(0);
                        }
                    };

                    this.treesReady = true

                }
            } catch (error) {
                console.log(error);
            }





        },

        // Leaderboard Over Time for CurrUser
        async fetchLeaderboardOverTime() {
            this.timeX = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            try {
                let { data: UserRankOverTime, error3 } = await supabase
                    .from('UserRankOverTime')
                    .select('*')
                    .eq('username', this.username)
                    .order('month_number')

                for (let month of this.timeX) {
                    let found = false;
                    for (let obj of UserRankOverTime) {
                        if (month == obj.month_string.slice(0, 3)) {
                            this.highestRankData.push(obj.highest_recorded_rank);
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        this.highestRankData.push(0);
                    }
                }
                console.log(this.timeX);
                console.log(this.highestRankData);
                this.leaderboardReady = true;

                if (error3) {
                    console.log(error3);
                }
                else {
                    console.log(UserRankOverTime);
                }

            } catch (error) {
                console.log(error);
            }



        },

        // Bubble Chart 
        async fetchBubbleChartData() {
            try {
                let { data: BubbleChartView, error } = await supabase
                    .from('BubbleChartView')
                    .select('*');

                // make bubble bigger according to total_trees_saved
                const scalingFactor = 20;
                for (let object of BubbleChartView) {
                    if (object.username == this.username) {
                        this.index = BubbleChartView.indexOf(object);
                    }
                    this.bubbleData.push({ x: object.total_co2_emission_reduction, y: object.total_trees_saved, r: object.total_trees_saved * scalingFactor });
                };
                console.log(this.index);

                console.log(this.bubbleData);

                this.bubbleReady = true;


                if (error) {
                    console.log("Error Message: " + error);
                }
                else {
                    console.log(BubbleChartView);
                }

            } catch (error) {
                console.log(error);
            }
        },

        // Doughnut Chart 
        async fetchDoughnutData() {
            try {

                // user own stats
                let { data: AllUserStatsTable, error } = await supabase
                    .from('UserOverallStatsTable')
                    .select('*')


                if (error) {
                    console.log(error);
                }
                else {
                    console.log("User Stats:");
                    console.log(AllUserStatsTable);

                    let otherPpleCo2Savings = 0;
                    this.doughnutX.push("Yours Truly");

                    for (let object of AllUserStatsTable) {
                        if (object.username == this.username) {
                            this.co2SavingsY.push(object.total_co2_emission_reduction)
                        }
                        else {
                            otherPpleCo2Savings += object.total_co2_emission_reduction;
                        }
                    }

                    this.doughnutX.push("Other Recycling Warriors");
                    this.co2SavingsY.push(otherPpleCo2Savings);
                    this.doughnutReady = true;

                }
            } catch (error) {
                console.log(error);
            }


        },

        // Radar 
        async fetchRadarData() {
            // shows user Stats relative to MAX() stats of all users - 100% (compare user with avgUser)

            // 1. settle total points + trees saved (relative to avg user)
            try {

                let { data: UserOverallStatsTable11, error } = await supabase
                    .from('UserOverallStatsTable')
                    .select('*')


                if (error) {
                    console.log(error);
                }
                else {
                    // 1. settle total points accumulated
                    let userTotal = 0;
                    let maxTotal = 0;
                    let totalPoints = 0


                    for (let obj of UserOverallStatsTable11) {
                        if (obj.total_points_accumulated > maxTotal) {
                            maxTotal = obj.total_points_accumulated;
                        }
                        if (obj.username == this.username) {
                            userTotal = obj.total_points_accumulated;
                        }
                        totalPoints += obj.total_points_accumulated;
                    }

                    this.radarUser.push(userTotal / maxTotal * 100);
                    this.radarAvgUser.push((totalPoints / UserOverallStatsTable11.length) / maxTotal * 100);
                    console.log((totalPoints / UserOverallStatsTable11.length) / maxTotal);

                    // 2. settle Quizzes Completed 
                    try {

                        let { data: radarQuizDimension, error } = await supabase
                            .from('radarQuizDimension')
                            .select('*')


                        if (error) {
                            console.log(error);
                        }
                        else {
                            let userQuizCount = 0
                            let maxCount = 0;
                            let totalCount = 0;

                            // for each username, know the number of quizzes completed (find avg user numQuiz completed + max)
                            for (let obj of radarQuizDimension) {
                                if (obj.username == this.username) {
                                    userQuizCount = obj.count;
                                }
                                if (obj.count > maxCount) {
                                    maxCount = obj.count;
                                }
                                totalCount += obj.count;
                            }

                            let avgNumQuizCount = totalCount / radarQuizDimension.length;
                            this.radarAvgUser.push(avgNumQuizCount / maxCount * 100);
                            this.radarUser.push(userQuizCount / maxCount * 100);
                        }

                    } catch (error) {
                        console.log(error);
                    }

                    // 3. Trees Saved 
                    let totalTreesSaved = 0;
                    let maxTreesSaved = 0;
                    let userTreesSaved = 0;

                    console.log(UserOverallStatsTable11);

                    for (let obj of UserOverallStatsTable11) {
                        if (obj.total_trees_saved > maxTreesSaved) {
                            maxTreesSaved = obj.total_trees_saved;
                        }
                        if (obj.username == this.username) {
                            userTreesSaved = obj.total_trees_saved;
                        }
                        totalTreesSaved += obj.total_trees_saved;
                    }

                    let avgNumTreesSaved = totalTreesSaved / UserOverallStatsTable11.length;
                    this.radarAvgUser.push(avgNumTreesSaved / maxTreesSaved * 100);
                    this.radarUser.push(userTreesSaved / maxTreesSaved * 100);


                }
            } catch (error) {
                console.log(error);
            }



            // 4. settle currPoints (last elem )
            try {
                let { data: UserTreesStats, error } = await supabase
                    .from('UserTreesStats')
                    .select('*')

                if (error) {
                    console.log(error);
                }
                else {
                    let userCurrPoints = 0;
                    let total = 0;
                    let max = 0;
                    console.log(UserTreesStats);
                    for (let object of UserTreesStats) {
                        if (object.username == this.username) {
                            userCurrPoints = object.curr_points;
                        }
                        if (object.curr_points > max) {
                            max = object.curr_points;
                        }

                        total += object.curr_points;
                    }
                    let avgCurrPoints = total / UserTreesStats.length;

                    this.radarAvgUser.push(avgCurrPoints / max * 100);
                    this.radarUser.push(userCurrPoints / max * 100);

                    console.log(this.radarUser);

                }
            } catch (error) {
                console.log(error);
            }

            // 5. Settle rank stability 
            // based on historical leaderboard, calculate rank growth rate 
            // currUser -> for this username, calculate his avg rank growth rate 
            // avg -> for each username, calculate avg avg rank growth rate 
            try {
                let { data: HistoricalLeaderboardTableUser, error } = await supabase
                    .from('HistoricalLeaderboardTable')
                    .select('*')
                    .eq('username', this.username)

                if (error) {
                    console.log(error);
                }
                else {
                    // User 
                    console.log(HistoricalLeaderboardTableUser);
                    let growthRateArr = [];
                    for (let i = 1; i < HistoricalLeaderboardTableUser.length; i++) {
                        let currGrowth = (HistoricalLeaderboardTableUser[i].rank - HistoricalLeaderboardTableUser[i - 1].rank) / HistoricalLeaderboardTableUser[i - 1].rank * 100;
                        growthRateArr.push(currGrowth);
                    }
                    console.log(growthRateArr);

                    let userAvgRankGrowth = growthRateArr.reduce((a, b) => a + b) / growthRateArr.length;
                    // this.radarUser.push(userAvgRankGrowth);


                    try {
                        let { data: HistoricalLeaderboardTable, error } = await supabase
                            .from('HistoricalLeaderboardTable')
                            .select('*')
                        if (error) {
                            console.log(error);
                        }
                        else {

                            // find all users' avg Growth 
                            let growthRateDict = {};
                            for (let obj of HistoricalLeaderboardTable) {
                                if (!(obj.username in growthRateDict)) {
                                    growthRateDict[obj.username] = [];
                                }
                                else {
                                    growthRateDict[obj.username].push(obj.rank);
                                }
                            }

                            console.log(growthRateDict);

                            let finalGrowthRateDict = {};
                            for (let person in growthRateDict) {
                                let growRateArrPerson = []
                                for (let i = 1; i < growthRateDict[person].length; i++) {
                                    let dudeRankGrowth = (growthRateDict[person][i] - growthRateDict[person][i - 1]) / growthRateDict[person][i - 1] * 100;
                                    growRateArrPerson.push(dudeRankGrowth);
                                }
                                let totalLol = 0;
                                for (let elem of growRateArrPerson) {
                                    totalLol += elem;
                                }
                                let avgRankGrowthOfPerson = totalLol / growRateArrPerson.length;
                                console.log(avgRankGrowthOfPerson);
                                finalGrowthRateDict[person] = avgRankGrowthOfPerson;

                            }

                            console.log(finalGrowthRateDict);
                            let total = 0;
                            let count1 = 0;
                            let maxAvgGrowth = 0;
                            for (let prop in finalGrowthRateDict) {
                                if (finalGrowthRateDict[prop] > maxAvgGrowth) {
                                    maxAvgGrowth = finalGrowthRateDict[prop];
                                }
                                total += finalGrowthRateDict[prop];
                                count1 += 1
                            }
                            let avgGrowthRateAvgUser = total / count1;
                            console.log(maxAvgGrowth);
                            console.log(avgGrowthRateAvgUser);

                            // push to radar 
                            this.radarUser.push(userAvgRankGrowth / maxAvgGrowth * 100);
                            this.radarAvgUser.push(avgGrowthRateAvgUser / maxAvgGrowth * 100);

                            console.log(avgGrowthRateAvgUser);
                            console.log(userAvgRankGrowth);

                        }


                    } catch (error) {
                        console.log(error);
                    }

                }

            } catch (error) {
                console.log(error);
            }



            console.log(this.radarAvgUser);
            console.log(this.radarUser);



            this.radarReady = true;


        },

        captureAndDownload() {
            html2canvas(document.getElementById("dashboard")).then(canvas => {
                const dashboardURL = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = dashboardURL;
                link.download = 'lovelyDashboard.png';
                link.click();
            })
                .catch((error) => {
                    console.log("Screenshot Failed: ", error);
                })
        }

    },
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
/* Bento Scrolling Animation */
@keyframes appear {
    from {
        opacity: 0;
        scale: 0.5
    }

    to {
        opacity: 1;
        scale: 1;
    }
}





/* Dashboard Numbers Styling */
h1 {
    color: #788645;
    font-weight: bold;
}

.ml2 {
    font-weight: 900;
    font-size: 3.5em;
}

.ml2 .letter {
    display: inline-block;
    line-height: 1em;
}

/* 1ST ROW */

#dashboard .col1 .iconBox {
    font-size: 4em;
    color: #788645;
}

#dashboard .col1 {
    /* Card */
    position: relative;
    /* background-color: #d3e4cd; */
    padding: 30px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: 0 7px 25px rgb(0, 0, 0, 0.08);
    background-color: #FEFAE1;
    animation: appear linear;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;


}

.bento {
    background-color: #FFF;
    animation: appear linear;
    animation-timeline: view();
    animation-range: entry 0% cover 40%;

}


#dashboard .pieLine1 {
    /* Card */
    position: relative;
    padding: 30px;
    height: 100%;
    /* background-color: #d3e4cd; */
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: 0 7px 25px rgb(0, 0, 0, 0.08);
}



#dashboard .pieLine:hover,
#dashboard .pieLine1:hover {
    background-color: #DBD9FF !important;
    cursor: pointer;
    position: relative;
    transition: all 1s;

}


#dashboard .col1 .cardName {
    font-size: 1.1em;
    color: #788645;
    font-weight: 500;
}


#dashboard .col1 .stats {
    position: relative;
}

#dashboard .col1:hover {
    background-color: #DBD9FF;
    cursor: pointer;
    position: relative;
    transition: all 0.7s;
    transform: scale(1.05);
    cursor: pointer;
}

#dashboard .col {
    /* Card */
    position: relative;
    /* background-color: #d3e4cd; */
    padding: 30px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    box-shadow: 0 7px 25px rgb(0, 0, 0, 0.08);
}

.bento:hover {
    background-color: #E7F5EE;
    transition: all 0.7s;
    transform: scale(1.05);
    cursor: pointer;
}
</style>
