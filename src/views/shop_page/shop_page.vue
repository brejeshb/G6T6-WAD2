<template>
  <div id="app">
    <div class="row">
      <div class="container col-lg-6 col-12 my-3">
        <div class="title py-4 rounded mb-5">Forest</div>
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
      <div class="container-fluid col my-3">
        <div class="title py-4 rounded mb-5">Start growing today</div>
        <div class="growing">
          <div class="circle_tree justify-content-center align-items-center d-flex">
            <img v-if="cal_data.current_tree != ''" :src="cal_data.picture" id="tree" style="height: 70%; width: 70%" />
          </div>
          <div class="progress w-50 mx-auto" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0"
            aria-valuemax="100">
            
            <div class="progress-bar bg-success" :style="{width:cal_data.percent+'%'}"><span v-if="cal_data.current_points / cal_data.current_tree_points!=0">{{ cal_data.current_points }}/{{ cal_data.current_tree_points }}</span></div>
          </div>
        </div>
      </div>
    </div>

    <button id="shopping_cart" v-on:click="clicky">
      <img src="./img/cart.png" style="width: 60px" />
    </button>
    <div class="shop" v-if="shop_open">
      <div class="sidebar" :style="menuVisible ? { width: '250px' } : {}">
        <div class="hamburger" @click="toggleMenu">&#9776;</div>
        <div class="header" :class="{ show: menuVisible }">
          <h1>Shop</h1>
        </div>
        <div class="menu" :class="{ show: menuVisible }">
          <a href="#" @click="triggerAll">All</a>
          <a href="#" @click="changePet_state">Pets</a>
          <a href="#" @click="changetree_state">Trees</a>
          <p>Your current points: {{ cal_data.current_points }}</p>

        </div>
      </div>

      <div class="main-content">
        <div class="top-bar">
          <input id="searchBar" type="text" placeholder="Search items..." @input="shop_display()" v-model="search" />
          <select class="filters" @change="shop_display()" v-model="sort">
            <option>Sort by: Highest price</option>
            <option>Lowest price</option>
          </select>
        </div>

        <div class="item-grid">
          <div class="item" v-for="item of shop_display()" @click="purchase(item)">
            <img :src="item.tree_png" alt="FAMAS Pulse" />
            <h3>{{ item.item }}</h3>
            <p class="price"><span style="color: white;"></span>Cost: {{ item.price }}</p>
            <p class="time" ><span style="color: white;">Cost to grow: </span>{{ item.growth_points }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="fact_box.status" class="fact_box">
      <div class="content align-content-center">
        <button type="button" @click="fact_box.status = false" class="btn btn-secondary close">X</button>
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
</template>

<script setup>
import { supabase } from '/src/lib/supabaseClient.js'

readData()
fetchCalculationData()


async function readData() {
  console.log("trying")
  const { data } = await supabase
    .from('UserTreesStats')
    .select('*')

  console.log(data)
  return data
}


import { ref, computed, watchEffect } from 'vue';
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
  cat: {},
  dog: {}
});
const fact_box = ref({
  status: false,
  img: '',
  description: '',
});
const cart = ref('./src/views/shop_page/img/cart.png');
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
console.log('data:', cal_data)


async function update_tree() {
  let new_points = cal_data.value.current_points-cal_data.value.current_tree_points;
  console.log('Cal_data',cal_data.value)
  if(cal_data.value.name_of_trees_planted ==null || cal_data.value.name_of_trees_planted ==undefined){
    cal_data.value.name_of_trees_planted = [cal_data.value.current_tree];
  }else{
    cal_data.value.name_of_trees_planted.push(cal_data.value.current_tree);
  }
  
  const { remove_tree } = await supabase
      .from('UserTreesStats')
      .update({ curr_tree_growing: '' })
      .eq('username', 'ann2')
    const { remove_curr_points } = await supabase
      .from('UserTreesStats')
      .update({ curr_points: new_points })
      .eq('username', 'ann2')
      const { remove_tree_points } = await supabase
      .from('UserTreesStats')
      .update({ curr_trees_points: 0 })
      .eq('username', 'ann2')
      const { update_tree_list } = await supabase
      .from('UserTreesStats')
      .update({ trees_owned: cal_data.value.name_of_trees_planted })
      .eq('username', 'ann2')
    fetchCalculationData()
}

function facts(name) {
  fact_box.value.status = true;
  fact_box.value.description = item_facts.value[name].description;
  fact_box.value.img = `./src/views/shop_page/img/real_tree/${name}.jpg`;
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
    alert('Please grow your current item to the max first');
  }
  else if (cal_data.value.current_points < item.price) {
    alert('Please earn more points first');
  }
  else {
    let new_points = cal_data.value.current_points - item.price;
    let new_tree = item.item;

    const { add_tree } = await supabase
      .from('UserTreesStats')
      .update({ curr_tree_growing: new_tree })
      .eq('username', 'ann2')
    const { minus_point } = await supabase
      .from('UserTreesStats')
      .update({ curr_points: new_points })
      .eq('username', 'ann2')
      const { update_tree_points } = await supabase
      .from('UserTreesStats')
      .update({ curr_trees_points: item.growth_points })
      .eq('username', 'ann2')
    fetchCalculationData()
  }

}



function changePet_state() {
  display_tree.value = false;
  display_pet.value = true;
}

function changetree_state() {
  display_pet.value = false;
  display_tree.value = true;
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
      `./src/views/shop_page/img/${thing.item}/${two}5.png` : `./src/views/shop_page/img/${thing.item}/${two}6.png`;
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
    console.log(data);

    let jsondata = null;

    // Process and find specific user data
    for (let name of data) {
      if (name.username === 'ann2') {
        jsondata = {
          point: name.curr_points,
          current_tree: name.curr_tree_growing,
          trees_planted: name.trees_owned,
          curr_trees_points:name.curr_trees_points,
        };
        break;
      }
    }
    console.log(jsondata)

    // If data was found, perform further calculations
    if (jsondata) {
      if (jsondata.current_tree == undefined || jsondata.current_tree == null) {
        jsondata.current_tree = '';
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
      console.log(jsondata)
      // Calculate image paths based on tree names
      if(jsondata.trees_planted == null){
        jsondata.trees_planted =[]
      }
      else{
        jsondata.trees_planted.forEach(thing => {
        const two = thing.split("_").map(i => i[0]).join('');
        cal_data.value.trees_planted.push(
          thing.includes("tree")
            ? `src/views/shop_page/img/${thing}/${two}5.png`
            : `src/views/shop_page/img/${thing}/${two}6.png`
        );
      });
      }


      cal_data.value.current_points = jsondata.point;
      const counter = jsondata.current_tree.includes("tree")
        ? Math.floor(cal_data.value.percent / (100 / 5)) + 1
        : Math.floor(cal_data.value.percent / (100 / 6)) + 1;

      const name = cal_data.value.current_tree.split("_").map(i => i[0]).join('');
      console.log(counter)
      cal_data.value.picture = `src/views/shop_page/img/${cal_data.value.current_tree}/${name}${counter}.png`;


      start = true;
      console.log(cal_data)
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
#app {
  background-color: #54a186;
  min-height: 100vh;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
}

.close {
  position: absolute;
  right: 5%;
  top: 5%;
}

.fact_box {
  height: 30vw;
  width: 50vw;
  background-color: #4caf50;
  position: fixed;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  border-radius: 10%;
  z-index: 10;

}

#shopping_cart {
  position: fixed;
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
  background-image: url('/src/views/shop_page/img/grass.png');
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
  font-family: cursive;
  width: 70%;
  font-size: 40px;
  margin: auto;
  background-color: lightgreen;
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
  z-index: 10;
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

  width: 50%;
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


.shop {
  display: flex;
  background-color: #1c1c1c;
  color: white;
}

.sidebar {
  width: 250px;
  transition: width 0.3s ease;
  background-color: #2a2a2a;
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

.top-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;

}

.top-bar input[type=text] {
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 5px;
}



.filters {
  margin-right: 100px;
  margin-left: 20px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  width: 40%;
  background-color: white;
  height: 60%;
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
  background-color: #333;
  width: 100%;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
}

.item:hover {
  transform: scale(1.3) rotateZ(10deg);
  transition-duration: 500ms;

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
  .fact_box{
    height: 50vw;
    width: 50vw;
  }

  .top-bar {
    flex-wrap: wrap;
    width: 80%;
  }

  .filters {
    margin-top: 10px;
    width: 100%;
    margin-left: 0px;

  }

  .shop {
    width: 100vw;
  }

  #searchBar {
    width: 100%;
    height: 60%;
  }

}


@media (max-width: 992px) {
  .fact_box{
    height: 50vw;
    width: 50vw;
  }
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
  .fact_box{
    height: 50vh;
    width: 50vw;
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
</style>