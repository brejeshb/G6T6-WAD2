<template>
  <div style="background-color:#f5ffe4;" >
  <div id="header" 
  class="text-center "
  style="
    height: 50vw;    
    background-image: url('/img/forest_background.png');
    background-attachment: fixed;
    background-size: 100% auto;
    
  " >
  <p class="text-pos" data-aos="zoom-in-up" data-aos-duration="1200">{{ currUser}}'s Forest</p>
 
  </div>
  <div class="confirmation p-4" v-if="message!=''">
    <div class="mb-5">{{ message }}</div>
    <button class="btn btn-primary" @click="message=''">OK</button>
  </div>
  <div id="app" style="position: relative;">
    
    
    <div class="row">
      <div class="col-lg-6 col-12 my-3" data-aos="fade-right" data-aos-duration="1500">
        <div class="title py-4 rounded mb-5 fw-bold " style="box-shadow: 5px 5px 10px 2px rgb(0 0 0 / 0.8);">Forest</div>
        <div class="forest">
          <table style="box-shadow: 5px 5px 10px 2px rgb(0 0 0 / 0.8); background-color: brown;"
            class="align-content-center mx-auto">
            <tr v-for="i in size" :key="i">
              <td v-for="j in size" :key="j">
                <div v-if="(i - 1) * size + j - 1 < items().length" class="box">
                  <img @click="facts(cal_data.name_of_trees_planted[(i - 1) * size + j - 1])"
                    :src="items()[(i - 1) * size + j - 1]" alt="" style="height: 100%; width: 100%"
                    class="grid_image" />
                </div>
                <div v-else class="box"></div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="container-fluid col my-3 text-center"data-aos="fade-left" data-aos-duration="1500">
        <div class="title py-4 rounded mb-5 fw-bold" style="box-shadow: 5px 5px 10px 2px rgb(0 0 0 / 0.8);">Start growing today</div>
        <div class="growing">
          <div class="circle_tree justify-content-center align-items-center d-flex">
            <img v-if="cal_data.current_tree != ''" :src="cal_data.picture" id="tree" style="height: 70%; width: 70%" />
            <p v-else class="text-center fs-5 m-2">Please open the shop to buy a tree to plant :)</p>
          </div>
          <div class="progress w-50 mx-auto" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0"
            aria-valuemax="100">
            
            <div class="progress-bar bg-success" :style="{width:cal_data.percent+'%'}"><span v-if="cal_data.current_points / cal_data.current_tree_points!=0">{{ cal_data.current_points }}/{{ cal_data.current_tree_points }}</span></div>
          </div>
          <button v-if="check_admin(currUser)" class="btn btn-primary mt-2" @click="adminHack()">add 100 points(only for admins)</button>
        </div>
      </div>
    </div>

    <button id="shopping_cart" v-on:click="clicky">
      <img src="/img/cart.png" style="width: 60px" />
    </button>
    <div class="shop" v-if="shop_open">
      
      <div class="sidebar" :style="menuVisible ? { width: '250px' } : {}">
        <div class="hamburger" @click="toggleMenu">&#9776;</div>
        <div class="header" :class="{ show: menuVisible }">
          <h1 class="fw-bold">Shop</h1>
        </div>
        <div class="menu" :class="{ show: menuVisible }">
          <a href="#" @click="triggerAll":class="{ active :display_pet&&display_tree}" @click.prevent="true">All</a>
          <a href="#" @click="changePet_state" :class="{ active :!display_tree}" @click.prevent="true">Pets</a>
          <a href="#" @click="changetree_state" :class="{ active :!display_pet}" @click.prevent="true">Trees</a>
          <p >Your current points: <span class="fw-bold"> {{ cal_data.current_points }} </span></p>

        </div>
      </div>

      <div class="main-content">
        <div class="row mb-3">
          <input id="searchBar" class="col-lg-5 col-sm-9 col-8 me-1 rounded" type="text" placeholder="Search items..." @input="shop_display()" v-model="search" />
          <button type="button"  @click="shop_open = false;message =''" class="btn btn-secondary col-lg-1 col-xs-2 col-1 order-lg-last mx-4" style="width: 50px;">X</button>
          <select class="filters col-lg-5 col-sm-9 col-8 fw-bold" @change="shop_display()" v-model="sort">
            <option>Sort by: Highest price</option>
            <option>Lowest price</option>
          </select>
          
        </div>

        <div class="item-grid">
          <div class="item shadow" v-for="item of shop_display()" @click="purchase(item)">
            <img :src="item.tree_png" alt="FAMAS Pulse" />
            <h3  class='text-color fw-bold'>{{ formattedItem(item.item) }}</h3>
            <p class="price"><span style="color: white;"></span>Cost: {{ item.price }}</p>
            <p class="time text-color" ><span >Cost to grow: </span>{{ item.growth_points }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="fact_box.status" class="fact_box">
      <div class="content align-content-center">
        <div class="row m-3">
          <div class="col-xl-1 col-lg-2 col-md-4 ">          <button type="button" @click="fact_box.status = false" class="btn btn-secondary">X</button></div>
          <div class="col-xl-11 col-lg-10 col-md-8 "></div>
          

        </div>
        
        <div class="row m-3">
          <div class="col-12 col-xl-6 align-content-center">
            <div class="container">
              <img :src="fact_box.img" style="width: 100%;" />
            </div>
          </div>
          <div class="col-12 col-xl-6 text-center">
            <h1>Some fun facts</h1>
            <p>{{ fact_box.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-5">
    <Footer2/>
  </div>
</div>
</template>

<script setup>
import { supabase } from '/src/lib/supabaseClient.js'
import { useAuth } from '../../lib/auth'
const { userName } = useAuth();
import Footer2 from '../../components/footer2.vue'

var currUser = ref(userName);


readData()
fetchCalculationData()


async function readData() {

  const { data } = await supabase
    .from('UserTreesStats')
    .select('*')


  return data
}


import { ref, computed, watchEffect,onMounted } from 'vue';
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import the AOS styles

// Initialize AOS on component mount
onMounted(() => {
  AOS.init({
    duration: 800, // Animation duration in milliseconds
    easing: 'ease-in-out', // Animation easing
    once: false,
  });
});





let start = ref(false)
const sort = ref('Sort by: Highest price');
const search = ref('');
const item_facts = ref({
  cherry_blossom_tree: {
    description: 'The cherry blossom capital of the world is Macon, Georgia with 300,000-350,000 Yoshino cherry blossom trees. Each year it holds the International Cherry Blossom Festival.'
  },
  apple_tree: {
    description: 'Apple trees take 4-5 years to produce their first fruit. A standard size apple tree starts bearing fruit 8-10 years after it is planted. A dwarf tree starts bearing fruit in 3-5 years. Apples will ripen six to ten times faster at room temperature than if they were refrigerated.'
  },
  bean_tree: {
    description: 'Bean tree is a name used in different parts of the world for various trees that carry their seeds in large pods.'
  },
  tree: {
    description: 'This is a tree'
  },
  cat: {description:'Just like human fingerprints, each cat’s nose has a unique print. No two noses are the same, which is why your cat’s boops are one of a kind.'},
  dog: {description:'Dogs can actually sense the passage of time, so they often know how long you’ve been gone. They use cues like scent fading over time and internal rhythms, which is why they’re often extra excited when you come home after a long day.'}
});
const fact_box = ref({
  status: false,
  img: '',
  description: '',
});
const cart = ref('/img/cart.png');
const size = ref(5);
const trees = ref({
  cherry_blossom_tree: 500,
  apple_tree: 400,
  tree: 150,
  bean_tree: 200,
  dog: 600,
  cat: 600,
});
const cal_data = ref({
  percent: 0,
  name_of_trees_planted: [],
  trees_planted: [],
  current_tree: '',
  current_points: 0,
  picture: "",
  current_tree_points:0,
});
const shop_open = ref(false);
const display_tree = ref(true);
const display_pet = ref(true);
const display_background = ref(true);
const menuVisible = ref(false);
const message = ref('')



async function update_tree() {
  let new_points = cal_data.value.current_points-cal_data.value.current_tree_points;

  if(cal_data.value.name_of_trees_planted ==null || cal_data.value.name_of_trees_planted ==undefined){
    cal_data.value.name_of_trees_planted = [cal_data.value.current_tree];
  }else{
    cal_data.value.name_of_trees_planted.push(cal_data.value.current_tree);
  }
  
  const { remove_tree } = await supabase
      .from('UserTreesStats')
      .update({ curr_tree_growing: '' })
      .eq('username', currUser.value)
    const { remove_curr_points } = await supabase
      .from('UserTreesStats')
      .update({ curr_points: new_points })
      .eq('username', currUser.value)
      const { remove_tree_points } = await supabase
      .from('UserTreesStats')
      .update({ curr_trees_points: 0 })
      .eq('username', currUser.value)
      const { update_tree_list } = await supabase
      .from('UserTreesStats')
      .update({ trees_owned: cal_data.value.name_of_trees_planted })
      .eq('username', currUser.value)
    fetchCalculationData()
}
function    formattedItem(thing) {
  return thing.replaceAll('_', ' ');
}
function facts(name) {
  fact_box.value.status = true;
  fact_box.value.description = item_facts.value[name].description;
  fact_box.value.img = `/img/real_tree/${name}.jpg`;


  // I checking the paths

}

function toggleMenu() {
  menuVisible.value = !menuVisible.value;
}

function items() {
  return cal_data.value.trees_planted;
}

function clicky() {
  shop_open.value = !shop_open.value;
}

async function purchase(item) {
  if (cal_data.value.current_tree !== '') {
    message.value='Please grow your current item to the max first'
    document.body.style.overflow = 'hidden';
  }
  else if (cal_data.value.current_points < item.price) {
    message.value='Please earn more points first'
    document.body.style.overflow = 'hidden';
  }
  else {
    let new_points = cal_data.value.current_points - item.price;
    let new_tree = item.item;

    const { add_tree } = await supabase
      .from('UserTreesStats')
      .update({ curr_tree_growing: new_tree })
      .eq('username', currUser.value)
    const { minus_point } = await supabase
      .from('UserTreesStats')
      .update({ curr_points: new_points })
      .eq('username', currUser.value)
      const { update_tree_points } = await supabase
      .from('UserTreesStats')
      .update({ curr_trees_points: item.growth_points })
      .eq('username', currUser.value)
    fetchCalculationData()
    message.value='Item purchased, please exit the shop to view it'
    


  }

}

 async function adminHack(){
  let new_points = cal_data.value.current_points +100;



    const { add_point } = await supabase
      .from('UserTreesStats')
      .update({ curr_points: new_points })
      .eq('username', currUser.value)
    const { update_tree_points } = await supabase
    .from('UserOverallStatsTable')
    .update({ total_points_accumulated:new_points })
    .eq('username', currUser.value)

    fetchCalculationData()


}

function changePet_state() {
  display_tree.value = false;
  display_pet.value = true;
}

function changetree_state() {
  display_pet.value = false;
  display_tree.value = true;
}
function check_admin(name){
  if(name ==null){
    return
  }
  if(name.search('admin')!=-1){
    return true
  }
}
function triggerAll() {
  display_pet.value = true;
  display_tree.value = true;
  display_background.value = true;
}

function shop_display() {
  // Simulate axios.get data
  const jsondata_org = [
    { item: "tree", price: 15, growth_points: "150" },
    { item: "cherry_blossom_tree", price: "50", growth_points: 500 },
    { item: "apple_tree", price: 40, growth_points: 400 },
    { item: "bean_tree", price: 20, growth_points: 200 },
    { item: "dog", price: 60, growth_points: 600 },
    { item: "cat", price: 60, growth_points: 600 },
  ];

  let jsondata = jsondata_org.filter(i =>
    search.value === '' || i.item.toLowerCase().includes(search.value.toLowerCase())
  );

  if (sort.value === 'Lowest price') {
    jsondata.sort((a, b) => Number(a.price) - Number(b.price));
  } else {
    jsondata.sort((a, b) => Number(b.price) - Number(a.price));
  }

  jsondata.forEach(thing => {
    let two = thing.item.split("_").map(i => i[0]).join('');
    thing.tree_png = thing.item.includes("tree") ?
      `/img/${thing.item}/${two}5.png` : `/img/${thing.item}/${two}6.png`;
  });

  return jsondata.filter(obj =>
    (display_pet.value && !obj.item.includes('tree')) ||
    (display_tree.value && obj.item.includes('tree'))
  );
}

const max_tree_points = computed(() => {
  if (cal_data.value.percent === 100) {
    // Add logic here if needed
  }
});




async function fetchCalculationData() {
  try {
    const data = await readData(); // Simulate async data fetching


    let jsondata = null;

    // Process and find specific user data
    for (let name of data) {
      if (name.username === currUser.value) {

        jsondata = {

          point: name.curr_points,
          current_tree: name.curr_tree_growing,
          trees_planted: name.trees_owned,
          curr_trees_points:name.curr_trees_points,
        };
        break;
      }
    }

    // If data was found, perform further calculations
    if (jsondata) {
      if (jsondata.current_tree == undefined || jsondata.current_tree == null) {
        jsondata.current_tree = '';
      }
    if(jsondata.trees_planted!=null){
      if(jsondata.trees_planted.length>25){
      jsondata.trees_planted =jsondata.trees_planted.slice(jsondata.trees_planted.length-25)
    }
    }

      cal_data.value.name_of_trees_planted = jsondata.trees_planted;

      const point = jsondata.point;
      const required_point = trees.value[jsondata.current_tree];
      cal_data.value.percent = Math.floor((point / required_point) * 100);
      cal_data.value.current_tree = jsondata.current_tree;
      cal_data.value.trees_planted = [];
      if(cal_data.value.current_tree!=''){
        cal_data.value.current_tree_points = jsondata.curr_trees_points;
      }
      else{
        cal_data.value.current_tree_points = 0;
        cal_data.value.percent = 0;
      }

      // Calculate image paths based on tree names
      if(jsondata.trees_planted == null){
        jsondata.trees_planted =[]
      }
      else{
        jsondata.trees_planted.forEach(thing => {
        const two = thing.split("_").map(i => i[0]).join('');
        cal_data.value.trees_planted.push(
          thing.includes("tree")
            ? `/img/${thing}/${two}5.png`
            : `/img/${thing}/${two}6.png`
        );
      });
      }


      cal_data.value.current_points = jsondata.point;
      const counter = jsondata.current_tree.includes("tree")
        ? Math.floor(cal_data.value.percent / (100 / 5)) + 1
        : Math.floor(cal_data.value.percent / (100 / 6)) + 1;

      const name = cal_data.value.current_tree.split("_").map(i => i[0]).join('');

      cal_data.value.picture = `/img/${cal_data.value.current_tree}/${name}${counter}.png`;


      start = true;

      if(cal_data.value.current_points >=cal_data.value.current_tree_points && cal_data.value.current_tree!=''){
update_tree()
        
}
    }
  } catch (error) {
    console.error("Error fetching calculation data:", error);
  }
}




</script>


<style scoped>
.btn-primary {
  background-color: #f4ecd4;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #666;
}

.btn-primary:hover {
  background-color: #808444;
  color: #fff;
}
.text-pos{
  position: relative;
  top:30%;
  font-weight: bold;
}

#header{
  font-size: 6vw;
}
  #app{
  background-color:#f5ffe4;
  width: 100%;
  padding-top: 5%;
  overflow-x: hidden;
  
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
}



.fact_box {

  background-color: #4caf50;
  position: fixed;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 40px;
  z-index: 10;


}

#shopping_cart {
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: transparent;
  border: none;
  z-index: 100;

}

.progress_bar {
  background-color: white;
}

.green_bar {
  background-color: greenyellow;
}

.circle_tree {
  border-radius: 50%;
  background-color: #e4e5a7;
  width: 30vw;
  height: 30vw;
  margin: auto;
  margin: auto;
  margin-bottom: 10px;
  border: 10px solid #88c42a;


}

.box {
  width: 7vw;
  height: 7vw;
  background-image: url('/img/grass.png');
  background-size: auto 100%;

}

;

.grid_image {
  height: 100%;
  width: 100%;
}

.grid_image:hover {
  opacity: 0.5;
}

.box:hover {

  opacity: 0.5;
  /* Adjust this value for desired translucency */
}

.center_thing {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  ;
}


.forest {}

.title {
  color:#fffce4;

  width: 70%;
  font-size: 40px;
  margin: auto;
  background-color: #798645;
  text-align: center;
}

.shop {
  position: fixed;
  width: 80vw;
  height: 80vh;
  top: 50vh;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 10%;
  z-index: 100;
}

.sort {

  width: 20%;
  border: none;
  height: 50px;

  margin-left: 5%;


}

.sort:hover {
  background-color: antiquewhite;
}

#searchBar {


  height: 35px;
  background-color: lightgray;
  border: none;
}

@media (max-width: 576px) {

  .box {
    height: 6vh;
    width: 6vh;
  }

  .circle_tree {
    width: 25vh;
    height: 25vh;
    margin: auto;
    margin-bottom: 5px;


  }

  .break {
    background-color: darkslategray;

  }
}





/* for shop */

.confirmation{
  position: fixed;
  display: flex;
  top: 50vh;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 20px;
  z-index: 1000;
  font-size: 20px;
  color:#f5ffe4;
  background-color: #798645;
  flex-direction: column;
}
.shop {
  display: flex;
  background-color: #686c44;
  color: white;
}

.sidebar {
  width: 250px;
  transition: width 0.3s ease;
  background-color: #888a79;
  padding: 20px;
}

.sidebar h1 {
  margin-bottom: 20px;
}

.menu a {
  display: block;
  color: white;
  padding: 10px 0;
  text-decoration: none;
  opacity: 0.8;
  transition: 0.2s;
}

.menu a.active,
.menu a:hover {
  color: #4caf50; /* Light green on hover */
  background-color: #1f1f1f; /* Slightly darker background */
  padding-left: 15px; /* Indent to show it's active */
}


.saved-wishlist {
  margin-top: 20px;
}

.wishlist-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: green;
  border-radius: 50%;
  margin-left: 5px;
}

.main-content {
  width: 100%;
  padding: 20px;

}






.filters {
  
  border: none;

  border-radius: 5px;

  background-color: white;
  height: 35px;

}

.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  gap: 20px;
  width: 95%;





  /* Ensure the grid stays within a limited height */
  max-height: 85%;
  /* Adjust based on your needs */
  overflow-y: auto;
  /* Enable vertical scrolling */
  overflow-x: hidden;
  /* Prevent horizontal scrolling */
}



.item {
  background-color: #f8f4ec;
  
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}

.item:hover {
  transform: scale(1.01) ;
  transition-duration: 500ms;
  background-color: #e0dcfc;

}

.item h3 {
  word-wrap: break-word;
}

.item img {
  max-width: 100%;
  border-radius: 10px;
}

.price {
  margin-top: 10px;
  font-weight: bold;
  color: #4caf50;
}

.time {
  color: gray;
  margin-top: 5px;
}





.hamburger {
  display: none;
  /* Hide by default */
  font-size: 30px;
  /* Size of the hamburger icon */
  cursor: pointer;
  /* Pointer on hover */
  padding: 10px;
}

.header {
  display: block;
  text-align: center;
}

.menu {
  display: block;
  /* Show menu by default */
}

.saved-wishlist {
  /* Styles for the saved wishlist */
  padding: 10px;
}



@media(max-width:1300px) {
  .item-grid {
    grid-template-columns: repeat(auto-fill, minmax(33%, 1fr));
  }






  .shop {
    width: 100vw;
  }



}


@media (max-width: 992px) {

  .box {
    height: 10vw;
    width: 10vw;
  }

  .circle_tree {
    width: 50vw;
    height: 50vw;
  }
}

@media(max-width:850px) {
  .item-grid {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }

  .item:hover {
    transform: scale(1) rotateX(0deg);
    opacity: 50%;


  }

}

/* Media query for smaller screens */
@media (max-width: 768px) {
  .fact_box h1{
    font-size: medium;
  }

  .hamburger {
    display: block;
    /* Show hamburger on small screens */
  }

  .menu {
    display: none;
    /* Hide menu by default on small screens */
    flex-direction: column;
    /* Stack items vertically */
  }

  .menu.show {
    display: flex;
    /* Show menu when toggled */
  }

  .header {
    display: none;
  }

  .sidebar {
    padding: 5px;
  }

  .sidebar {
    width: 10%
  }

}
.no-scroll {
  overflow: hidden;
}
.text-color{
  color:#686c44;
}


</style>