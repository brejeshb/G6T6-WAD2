<template>
    <div style="  background-color: #fffce4;   background-attachment: fixed;
  background-image: url('/img/quiz.webp');
  background-size: 100vw auto;">
      <section class="py-5 text-center top_section" data-aos="fade-up">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <p class="title">Quiz Application</p>

          <!--<p>
            <router-link to="./video" class="btn btn-primary my-2 mx-4" data-aos="zoom-in">Watch some educational videos</router-link>
            <router-link to="./quiz" class="btn btn-secondary my-2 mx-4" data-aos="zoom-in">Do some quizzes for points</router-link>
          </p>-->
        </div>
      </div>
    </section>
  <div id="app">
    <!-- Top Section with AOS animation -->


    <!-- Main Content Section with Filter and Search Bar -->
    <div id="main_content" class="container pt-5" data-aos="fade-up">
      <div id="nav-bar">
        <nav class="navbar navbar-expand-lg bg-body-tertiary flex-column" data-aos="fade-left">
          <div class="container-fluid">
            <a class="navbar-brand ms-5" href="#">Filter</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item" data-aos="fade-right">
                  <a href="#" class="nav-link" :class="{ 'active-filter': activeFilter === 'all' }" @click.prevent="activeFilter = 'all'">All</a>
                </li>
                <li class="nav-item" data-aos="fade-right">
                  <a href="#" class="nav-link" :class="{ 'active-filter': activeFilter === 'recycling' }" @click.prevent="activeFilter = 'recycling'">Recycle</a>
                </li>
                <li class="nav-item" data-aos="fade-right">
                  <a href="#" class="nav-link" :class="{ 'active-filter': activeFilter === 'upcycling' }" @click.prevent="activeFilter = 'upcycling'">Upcycle</a>
                </li>
              </ul>
              <form class="d-flex" role="search" @submit.prevent data-aos="fade-left">
                <input class="form-control me-3" type="search" placeholder="Search" aria-label="Search" v-model="search">
                <button class="btn btn-outline-success" type="button" @click="search = ''">Reset</button>
              </form>
            </div>
          </div>
        </nav>
      </div>

      <!-- Quiz Card Section with AOS animation -->
      <div id="videos" class="mt-4 shadow p-3 mb-5 rounded" data-aos="fade-up">
        <div v-if="!isQuizActive">
          <h2 class="text-center" data-aos="fade-in">Available Quizzes</h2>
          <div class="row">
            <div class="col-xl-3 col-lg-4 col-md-6 mb-4" v-for="quiz in filteredQuizzes" :key="quiz.id" data-aos="zoom-in">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">{{ quiz.category.charAt(0).toUpperCase() + quiz.category.slice(1) }} Quiz</h5>
                  <p class="card-text">{{ quiz.title }}</p>
                  <div class="mb-3">
                    <p class="text-info mb-1">
                      Attempts: {{ quizAttempts[quiz.id].attempts }} | Last Score: {{ quizAttempts[quiz.id].score }}/{{ quiz.questions.length }}
                    </p>
                    <div class="progress">
                      <div class="progress-bar" :style="{ width: getScorePercentage(quiz.id) + '%' }" role="progressbar" :aria-valuenow="getScorePercentage(quiz.id)" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    
                  </div>
                  <button class="btn btn-primary mt-2" @click="startQuiz(quiz)" v-if="!quizAttempts[quiz.id]?.completed" >Start Quiz</button>
                  <span class="d-inline-block" v-else data-bs-toggle="tooltip" data-bs-placement="top" tabindex="0" data-bs-custom-class="custom-tooltip" data-bs-title="You can no longer gain points from completing this quiz until next month">
                  <button class="btn btn-primary mt-2" @click="startQuiz(quiz)"  :disabled="quizAttempts[quiz.id] && quizAttempts[quiz.id].completed"         >Start Quiz</button></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Quiz Question Section with AOS animation -->
        <div v-else>
          <h2 class="text-center" data-aos="fade-down">{{ currentQuiz.title }}</h2>
          <div v-for="(question, index) in currentQuiz.questions" :key="index" class="mb-4" data-aos="fade-right">
            <h5>{{ question.question }}</h5>
            <div v-for="(option, idx) in question.options" :key="idx">
              <label>
                <input type="radio" :name="'question' + index" :value="option" v-model="selectedAnswers[index]">
                {{ option }}
              </label>
            </div>
          </div>
          <button class="btn btn-success" @click="submitQuiz" >Submit Quiz</button>
          <button class="btn btn-secondary ms-2" @click="goBack" >Back to Quizzes</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

  

  
  <script setup>
  import { reactive, ref, computed,onMounted, nextTick,onUpdated  } from 'vue'
  import { supabase } from '/src/lib/supabaseClient.js'
  import { useAuth } from '../../lib/auth'
  import AOS from "aos";
import "aos/dist/aos.css";

onMounted(async() => {
  AOS.init({
    duration: 1000,  // Animation duration in ms
    easing: "ease-in-out",  // Animation easing style
    once: false,  // Whether animation should happen only once
  });
  await nextTick();
  
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  

});
onUpdated(() => {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = Array.from(tooltipTriggerList).map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
});

  const { userName } = useAuth();

var currUser = userName;

  
  const quizzes = [
    { 
        id: 1, 
        category: 'recycling', 
        title: 'Recycling Basics Quiz', 
        questions: [
            { question: 'What symbol is commonly used to indicate recyclable materials?', options: ['Heart', 'Triangle', 'Square', 'Circle'], answer: 'Triangle' },
            { question: 'Which of these materials is commonly recycled?', options: ['Plastic', 'Styrofoam', 'Food Waste', 'Wood'], answer: 'Plastic' },
            { question: 'Which color bin is usually designated for recyclables?', options: ['Blue', 'Red', 'Green', 'Yellow'], answer: 'Blue' },
            { question: 'What material is NOT typically recyclable?', options: ['Glass', 'Aluminum', 'Food Waste', 'Paper'], answer: 'Food Waste' },
            { question: 'Which material has a higher recycling rate?', options: ['Glass', 'Plastic', 'Paper', 'Wood'], answer: 'Paper' },
            { question: 'What is the first step in recycling?', options: ['Shredding', 'Separation', 'Collection', 'Melting'], answer: 'Collection' },
            { question: 'Which item can be recycled indefinitely?', options: ['Glass', 'Plastic', 'Paper', 'Wood'], answer: 'Glass' },
            { question: 'How many times can paper typically be recycled?', options: ['Once', 'Up to 5 times', 'Up to 10 times', 'Indefinitely'], answer: 'Up to 5 times' },
            { question: 'Recycling helps in reducing what major environmental issue?', options: ['Deforestation', 'Ozone depletion', 'Air pollution', 'All of the above'], answer: 'All of the above' },
            { question: 'Which of these items should never go in a recycling bin?', options: ['Glass jars', 'Plastic bottles', 'Pizza boxes', 'Newspapers'], answer: 'Pizza boxes' },
        ]
    },
    { 
        id: 2, 
        category: 'recycling', 
        title: 'Plastic Recycling Quiz', 
        questions: [
            { question: 'What type of plastic is commonly used for water bottles?', options: ['HDPE', 'PET', 'LDPE', 'PVC'], answer: 'PET' },
            { question: 'What is the recycling code for polypropylene?', options: ['1', '5', '2', '4'], answer: '5' },
            { question: 'Which plastic type is difficult to recycle?', options: ['HDPE', 'PET', 'PVC', 'PP'], answer: 'PVC' },
            { question: 'Which plastic recycling number is most widely accepted?', options: ['1', '3', '5', '7'], answer: '1' },
            { question: 'How many times can PET plastic be recycled?', options: ['Once', '2-3 times', 'Indefinitely', 'Never'], answer: '2-3 times' },
            { question: 'Which country recycles the highest percentage of plastic waste?', options: ['Germany', 'USA', 'China', 'Japan'], answer: 'Germany' },
            { question: 'Which plastic item is usually non-recyclable?', options: ['Water bottle', 'Plastic bag', 'Milk jug', 'Plastic chair'], answer: 'Plastic bag' },
            { question: 'What process is used to break down plastics into smaller components?', options: ['Incineration', 'Pyrolysis', 'Shredding', 'Burying'], answer: 'Pyrolysis' },
            { question: 'What is a major environmental issue caused by plastic waste?', options: ['Deforestation', 'Air pollution', 'Ocean pollution', 'Soil degradation'], answer: 'Ocean pollution' },
            { question: 'Which organization actively promotes recycling globally?', options: ['WHO', 'UNICEF', 'Greenpeace', 'NATO'], answer: 'Greenpeace' },
        ]
    },
    { 
        id: 3, 
        category: 'recycling', 
        title: 'Paper Recycling Quiz', 
        questions: [
            { question: 'Can glossy magazines be recycled in most facilities?', options: ['Yes', 'No'], answer: 'Yes' },
            { question: 'Which paper product can usually be recycled?', options: ['Tissue paper', 'Cardboard', 'Napkins', 'Wax paper'], answer: 'Cardboard' },
            { question: 'How many times can paper be recycled before fibers break down?', options: ['1-2 times', '5-7 times', '10 times', 'Indefinitely'], answer: '5-7 times' },
            { question: 'What is the recycling process for paper?', options: ['Pulping', 'Melting', 'Shredding', 'Burying'], answer: 'Pulping' },
            { question: 'What is the main benefit of recycling paper?', options: ['Preserving water', 'Saving trees', 'Reducing air pollution', 'Saving metal'], answer: 'Saving trees' },
            { question: 'Which type of paper is most widely recycled?', options: ['Tissue', 'Cardboard', 'Glossy paper', 'Napkins'], answer: 'Cardboard' },
            { question: 'Which paper product is NOT recyclable?', options: ['Printer paper', 'Newspapers', 'Used paper towels', 'Cardboard'], answer: 'Used paper towels' },
            { question: 'What percentage of paper can typically be recycled?', options: ['10%', '30%', '60%', '100%'], answer: '100%' },
            { question: 'Why should staples be removed from paper before recycling?', options: ['They are toxic', 'They are non-recyclable metal', 'They interfere with recycling equipment', 'They reduce paper quality'], answer: 'They interfere with recycling equipment' },
            { question: 'Which of these products can be made from recycled paper?', options: ['Books', 'Glass', 'Plastic', 'Concrete'], answer: 'Books' },
        ]
    },
    { 
        id: 4, 
        category: 'upcycling', 
        title: 'Upcycling Basics Quiz', 
        questions: [
            { question: 'Which of these best describes upcycling?', options: ['Throwing items away', 'Turning waste into new items', 'Recycling items', 'Burning waste materials'], answer: 'Turning waste into new items' },
            { question: 'Which material is commonly used in upcycling projects?', options: ['Fresh wood', 'Old magazines', 'New plastic', 'Metal scraps'], answer: 'Old magazines' },
            { question: 'What is a benefit of upcycling?', options: ['Reduces waste', 'Increases waste', 'Uses more resources', 'Destroys materials'], answer: 'Reduces waste' },
            { question: 'Which item is often upcycled?', options: ['Broken phone', 'Glass bottle', 'Paper', 'Unused food'], answer: 'Glass bottle' },
            { question: 'What type of material can often be used in furniture upcycling?', options: ['Fabric', 'Plastic', 'Electronics', 'None'], answer: 'Fabric' },
            { question: 'Which item could you upcycle into a lamp?', options: ['Glass jar', 'Paper', 'Food', 'Wood chips'], answer: 'Glass jar' },
            { question: 'Upcycling helps in reducing the need for what?', options: ['New materials', 'Recycled items', 'Electronics', 'Chemicals'], answer: 'New materials' },
            { question: 'How can upcycling help with personal finances?', options: ['It requires no cost', 'It uses items already owned', 'It wastes resources', 'It is expensive'], answer: 'It uses items already owned' },
            { question: 'Which material is commonly upcycled in art?', options: ['Paint', 'Fabric scraps', 'Gold', 'Fresh wood'], answer: 'Fabric scraps' },
            { question: 'What is a major difference between recycling and upcycling?', options: ['Upcycling enhances value', 'Recycling destroys items', 'Recycling doesn’t save resources', 'Upcycling costs more'], answer: 'Upcycling enhances value' },
        ]
    },
    {
    "id": 5,
    "category": "upcycling",
    "title": "Upcycling Materials Quiz",
    "questions": [
        { "question": "Which material is frequently upcycled into jewelry?", "options": ["Plastic bottles", "Cardboard", "Old wood", "Steel scraps"], "answer": "Plastic bottles" },
        { "question": "What kind of item can old t-shirts be upcycled into?", "options": ["New furniture", "Cleaning rags", "Cardboard boxes", "Plastic bags"], "answer": "Cleaning rags" },
        { "question": "Which of these can be upcycled to make eco-friendly planters?", "options": ["Used plastic bottles", "Paper towels", "Ceramic mugs", "Newspaper"], "answer": "Used plastic bottles" },
        { "question": "What kind of wood is commonly upcycled?", "options": ["Driftwood", "New lumber", "Fresh wood", "Plastic composite"], "answer": "Driftwood" },
        { "question": "Old magazines can be upcycled into what?", "options": ["Paper mache crafts", "New plastic", "Metal parts", "Electronics"], "answer": "Paper mache crafts" },
        { "question": "Which type of metal is often upcycled into art?", "options": ["Copper", "Fresh steel", "Plastic", "Glass"], "answer": "Copper" },
        { "question": "How can cardboard boxes be upcycled?", "options": ["Furniture organizers", "Glass vases", "Electronics", "Newspapers"], "answer": "Furniture organizers" },
        { "question": "Which kitchen item is commonly upcycled into storage containers?", "options": ["Glass jars", "Plastic wrappers", "Towels", "Ceramic bowls"], "answer": "Glass jars" },
        { "question": "Which type of plastic is often upcycled?", "options": ["PET bottles", "Ceramic", "Silicone", "Wood"], "answer": "PET bottles" },
        { "question": "What can wooden pallets be upcycled into?", "options": ["Furniture", "Shoes", "Bottles", "Food packaging"], "answer": "Furniture" }
    ]
},
{
    "id": 6,
    "category": "upcycling",
    "title": "Upcycling Benefits Quiz",
    "questions": [
        { "question": "How does upcycling affect pollution?", "options": ["Increases pollution", "Reduces pollution", "No effect", "Makes pollution worse"], "answer": "Reduces pollution" },
        { "question": "What is a financial benefit of upcycling?", "options": ["Increases expenses", "Saves money on new items", "Creates waste", "Requires more resources"], "answer": "Saves money on new items" },
        { "question": "Which aspect of sustainability does upcycling support?", "options": ["Resource conservation", "Deforestation", "Waste increase", "High energy use"], "answer": "Resource conservation" },
        { "question": "Upcycling can help reduce the demand for what?", "options": ["New raw materials", "Secondhand items", "Recycled products", "Unnecessary packaging"], "answer": "New raw materials" },
        { "question": "Which of these is a community benefit of upcycling?", "options": ["Builds local businesses", "Promotes waste", "Increases landfill use", "Increases costs"], "answer": "Builds local businesses" },
        { "question": "What type of pollution is reduced by upcycling plastic waste?", "options": ["Air", "Plastic", "Sound", "Light"], "answer": "Plastic" },
        { "question": "How does upcycling affect landfill waste?", "options": ["Increases it", "Reduces it", "No impact", "Doubles it"], "answer": "Reduces it" },
        { "question": "What is a common way upcycling promotes creativity?", "options": ["Art projects", "Increased waste", "More spending", "Strict guidelines"], "answer": "Art projects" },
        { "question": "Which of these is a personal benefit of upcycling?", "options": ["Develops new skills", "Requires extra spending", "Encourages buying more", "Produces pollution"], "answer": "Develops new skills" },
        { "question": "Upcycling helps reduce the need for products made from which resource?", "options": ["Virgin materials", "Reused metals", "Recycled plastics", "None"], "answer": "Virgin materials" }
    ]
},
{
    "id": 7,
    "category": "upcycling",
    "title": "Creative Upcycling Ideas Quiz",
    "questions": [
        { "question": "What can old jeans be upcycled into?", "options": ["Flower pots", "Rugs", "Phone cases", "All of the above"], "answer": "All of the above" },
        { "question": "Which item can be upcycled into a bookshelf?", "options": ["Wooden crates", "Plastic bags", "Fabric scraps", "Glass jars"], "answer": "Wooden crates" },
        { "question": "Wine corks can be upcycled into which of these?", "options": ["Coasters", "Flower pots", "Picture frames", "Shoes"], "answer": "Coasters" },
        { "question": "Which upcycled item can be turned into outdoor lighting?", "options": ["Tin cans", "Plastic wrappers", "Fabric", "Newspaper"], "answer": "Tin cans" },
        { "question": "Which item can old coffee grounds be upcycled into?", "options": ["Body scrub", "Packaging material", "New coffee beans", "Garden soil"], "answer": "Body scrub" },
        { "question": "Which of these items could you turn into a bird feeder?", "options": ["Milk jug", "Cardboard", "T-shirt", "Carpet"], "answer": "Milk jug" },
        { "question": "Which kitchen item can be upcycled into a candle holder?", "options": ["Mason jar", "Sponge", "Cardboard box", "Plastic bag"], "answer": "Mason jar" },
        { "question": "Old belts can be upcycled into which home item?", "options": ["Shelf brackets", "Flower pots", "Mirror frame", "Chair legs"], "answer": "Shelf brackets" },
        { "question": "What can you upcycle tin cans into?", "options": ["Planters", "Shoes", "Clothes", "Food"], "answer": "Planters" },
        { "question": "What can old sweaters be upcycled into?", "options": ["Pillows", "Plastic bags", "Glass jars", "Tables"], "answer": "Pillows" }
    ]
},
{
    "id": 8,
    "category": "upcycling",
    "title": "Upcycling in Fashion Quiz",
    "questions": [
        { "question": "What type of fabric is often upcycled in fashion?", "options": ["Denim", "New silk", "Polyester", "Linen"], "answer": "Denim" },
        { "question": "Old t-shirts can be upcycled into which accessory?", "options": ["Bags", "Tables", "Mirrors", "Jewelry"], "answer": "Bags" },
        { "question": "Which of these can be upcycled into patches for clothing?", "options": ["Fabric scraps", "Glass", "Wood", "Paper"], "answer": "Fabric scraps" },
        { "question": "Upcycling helps reduce what in the fashion industry?", "options": ["Waste", "New trends", "Sales", "Colors"], "answer": "Waste" },
        { "question": "Old sweaters can be upcycled into which item?", "options": ["Scarves", "Shoes", "Plastic items", "Hats"], "answer": "Scarves" },
        { "question": "What accessory can old leather jackets be upcycled into?", "options": ["Bags", "Shoes", "Bracelets", "Hats"], "answer": "Bags" },
        { "question": "Which of these is a popular upcycled fashion item?", "options": ["Patchwork jeans", "New denim", "Brand-new sweaters", "Expensive shoes"], "answer": "Patchwork jeans" },
        { "question": "What can old ties be upcycled into?", "options": ["Headbands", "Shoes", "Paper", "Tablecloths"], "answer": "Headbands" },
        { "question": "Which material from shoes can be reused in upcycling?", "options": ["Rubber soles", "New laces", "Plastic wrapping", "Boxes"], "answer": "Rubber soles" },
        { "question": "Old bandanas are often upcycled into which item?", "options": ["Hair accessories", "Phone cases", "Umbrellas", "Wood furniture"], "answer": "Hair accessories" }
    ]
},
{
    "id": 9,
    "category": "upcycling",
    "title": "Environmental Impact of Upcycling Quiz",
    "questions": [
        { "question": "Upcycling helps to reduce which of the following?", "options": ["Carbon footprint", "Energy usage", "New item costs", "All of the above"], "answer": "All of the above" },
        { "question": "Which greenhouse gas emission is reduced by upcycling?", "options": ["CO2", "Methane", "Ozone", "Nitrogen oxide"], "answer": "CO2" },
        { "question": "Upcycling can help reduce waste in which of these?", "options": ["Landfills", "Rivers", "Buildings", "Forests"], "answer": "Landfills" },
        { "question": "Upcycling promotes which type of economy?", "options": ["Circular", "Linear", "Disposable", "One-time use"], "answer": "Circular" },
        { "question": "Which type of pollution is reduced by upcycling materials like plastic?", "options": ["Plastic pollution", "Water pollution", "Sound pollution", "None"], "answer": "Plastic pollution" },
        { "question": "What is a major benefit of upcycling for ecosystems?", "options": ["Conserves natural resources", "Destroys habitats", "Increases landfill use", "Creates air pollution"], "answer": "Conserves natural resources" },
        { "question": "How does upcycling impact water usage?", "options": ["Reduces it", "Increases it", "No effect", "Depends on materials"], "answer": "Reduces it" },
        { "question": "By upcycling metals, we reduce the need for what process?", "options": ["Mining", "Deforestation", "Fishing", "Manufacturing"], "answer": "Mining" },
        { "question": "Which of these is an energy-saving benefit of upcycling?", "options": ["Reduces manufacturing demand", "Requires more factories", "Increases transportation needs", "Uses high heat processes"], "answer": "Reduces manufacturing demand" },
        { "question": "Upcycling helps prevent which kind of pollution in oceans?", "options": ["Plastic waste", "Sound", "Light", "Air"], "answer": "Plastic waste" }
    ]
}

];

  
const isQuizActive = ref(false);
const currentQuiz = ref({});
const selectedAnswers = ref([]);
const quizAttempts = reactive({});
const activeFilter = ref('all');
const search = ref('');

for (let i of quizzes){
  quizAttempts[i.id] = {
          attempts: 0,
          score: 0,
          lastScore: 0,
          completed: false, // Check if full score was achieved
          month_done: -1
}

}

// Computed properties
const filteredQuizzes = computed(() => {
  return quizzes.filter(quiz => {
    const matchesCategory = activeFilter.value === 'all' || quiz.category === activeFilter.value;
    const matchesSearch = quiz.title.toLowerCase().includes(search.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});
//updatePoint(10)
async function updatePoint(add_point){
    const { data: tree_data, error: treeError } = await supabase
    .from('UserTreesStats')
    .select('*');

  if (treeError) {
    console.error("Error fetching tree data:", treeError);
    return;
  }

  // Fetch user cumulative data
  const { data: cul_data, error: culError } = await supabase
    .from('UserOverallStatsTable')
    .select('*');

  if (culError) {
    console.error("Error fetching cumulative data:", culError);
    return;
  }

  for(let user of tree_data){
    if(user.username==currUser.value){
        let curr_point = user.curr_points +add_point
        const { update_curr_point } = await supabase
      .from('UserTreesStats')
      .update({ curr_points:curr_point })
      .eq('username', currUser.value)
      break;

}

    }
    for(let user of cul_data){
    if(user.username==currUser.value){
        let cul_point = user.total_points_accumulated +add_point
        const { update_total_point } = await supabase
      .from('UserOverallStatsTable')
      .update({ total_points_accumulated:cul_point })
      .eq('username', currUser.value)
      break;

}

    }
  }
  





async function insertCol(name,attempt,score){
    let d =new Date()
    let month = d.getMonth()

    const { data, error } = await supabase
  .from('UserQuizDataTable')
  .upsert([
    { username: currUser.value, quiz_name: name,num_attempts:attempt,last_recorded_quiz_score:0,current_quiz_score:score,month:month },
  ])
  .select()


}

async function updateDate(quiz,date){
    const { update_tree_list } = await supabase
      .from('UserQuizDataTable')
      .update({ current_quiz_score: 0 ,month:date})
      .eq('username', currUser.value)
      .eq('quiz_name', quiz);
}
readData();
async function readData() {


  let { data, error } = await supabase
    .from('UserQuizDataTable')
    .select('*');
  
  if (error) {
    console.error("Error fetching data:", error);
    return;
  }
  let reset = false;
  let d = new Date()


  // Process data for each user
  data.forEach(user => {
    if (user.username === currUser.value) {
      // Extract relevant data
      const { current_quiz_score, last_recorded_quiz_score, num_attempts, quiz_name, month } = user;

      // Find the quiz by name
      const quiz = quizzes.find(q => q.title === quiz_name);
      
      
      if (quiz) {
        // Update or initialize the quizAttempts entry for the specific quiz
        quizAttempts[quiz.id] = {
          attempts: num_attempts,
          score: current_quiz_score,
          lastScore: last_recorded_quiz_score,
          completed: current_quiz_score === quiz.questions.length, // Check if full score was achieved
          month_done: month
        };
        
        if(month!= d.getMonth()){

            updateDate(quiz_name,d.getMonth());
            reset =true;
        }
        // Log the updated entry for debugging

      }

      

    }
  }

)

if(reset){
    readData()
  };


  return data;
}

// Methods
function startQuiz(quiz) {
  currentQuiz.value = quiz;
  selectedAnswers.value = new Array(quiz.questions.length).fill(null);
  isQuizActive.value = true;
}

function submitQuiz() {
  let score = 0;
  const quizName = currentQuiz.value.title; // Declare the quiz name variable

  currentQuiz.value.questions.forEach((question, index) => {
    if (selectedAnswers.value[index] === question.answer) {
      score++;
    }
  });

  const quizId = currentQuiz.value.id;
  const maxScore = currentQuiz.value.questions.length;

  if (quizAttempts[quizId]?.completed) {
    isQuizActive.value = false;
    return;
  }

  if (quizAttempts[quizId]) {
    quizAttempts[quizId].attempts++;
    quizAttempts[quizId].score = score;
  } else {
    quizAttempts[quizId] = { attempts: 1, score: score, completedAt: null }; // Initialize completedAt
  }

  // Check if full marks are achieved
  if (score === maxScore) {
    quizAttempts[quizId].completed = true;
    quizAttempts[quizId].completedAt = new Date().toLocaleString('default', { month: 'long', year: 'numeric' }); // Store the month and year
    updatePoint(10)
  }

  isQuizActive.value = false;
  
  // Use quizName in the insertCol function call
  insertCol(quizName, quizAttempts[quizId].attempts, quizAttempts[quizId].score);
}


function goBack() {
  isQuizActive.value = false;
}

function getScorePercentage(quizId) {
  const attempt = quizAttempts[quizId];
  return attempt ? Math.round((attempt.score / quizzes.find(q => q.id === quizId).questions.length) * 100) : 0;
}
  </script>
  
  <style scoped>
  /* General Styling */
  body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f9;
  }
  
  /* Top Section - Banner */
  .top_section {
    height: 50vw;  
  
  }
  
  .top_section h1 {
      font-size: 2.5rem;
      color: #333;
  }
  
  .top_section p.lead {
      color: #555;
  }
  
  .top_section .btn-primary {
      background-color: #4CAF50;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 20px;
  }
  
  .top_section .btn-secondary {
      background-color: #ff9800;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 20px;
      color: white;
  }
  
  /* Navbar and Filter Buttons */
  #nav-bar{
  position: sticky;
  top: 60px;
  z-index: 20;
}
  #nav-bar .navbar {
      background-color: #fff;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1rem;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  #nav-bar .navbar-brand {
      font-weight: bold;
      color: #4CAF50;
  }
  
  #nav-bar .nav-link {
      color: #555;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      transition: background-color 0.2s ease;
  }
  
  #nav-bar .nav-link:hover {
      background-color: #e0f7f4;
      color: #333;
  }
  
  #nav-bar .nav-link.active {
      background-color: #4CAF50;
      color: white;
  }
  
  /* Search and Reset Button */
  #nav-bar .form-control {
      border-radius: 20px;
      padding: 0.5rem 1rem;
  }
  
  #nav-bar .btn-outline-success {
      border-radius: 20px;
      color: #4CAF50;
      border-color: #4CAF50;
      padding: 0.5rem 1rem;
  }
  
  #nav-bar .btn-outline-success:hover {
      background-color: #4CAF50;
      color: white;
      border-color: #4CAF50;
  }
  
  /* Quiz Cards */
  .card {
      border: none;
      border-radius: 8px;
      box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .card:hover {
      transform: translateY(-4px);
      box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  .card-title {
      font-weight: bold;
      color: #333;
  }
  
  .card-text {
      color: #666;
  }
  
  /* Start Quiz Button */
  .btn-primary {
      background-color: #4CAF50;
      border: none;
      border-radius: 8px;
      padding: 0.5rem 1rem;
  }
  
  .btn-primary:hover {
      background-color: #388E3C;
      color: #fff;
  }
  .btn-secondary:hover {
      background-color:orange;
      color: #fff;
  }
  
  /* Progress Bar */
  .progress {
      height: 8px;
      border-radius: 20px;
  }
  
  .progress-bar {
      background-color: #4CAF50;
  }
  
  /* Submit and Back Buttons */
  .btn-success {
      background-color: #4CAF50;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
  }
  
  .btn-secondary {
      background-color: #ff9800;
      border: none;
      padding: 0.75rem 1.5rem;
      color: white;
      border-radius: 8px;
  }
  
  /* Responsive Spacing */
  @media (max-width: 768px) {
      .top_section {
          padding: 1.5rem;
      }
      .card {
          margin-bottom: 1.5rem;
      }
  }
  /* Active Filter Styling */
.active-filter {
    background-color: #4CAF50; /* Green fill for active filter */
    color: white; /* White text for better contrast */
    border-radius: 20px;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease, color 0.3s ease;
}

/* Standard nav-link styling (non-active state) */
.nav-link {
    color: #555;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link:hover {
    background-color: #e0f7f4;
    color: #333;
}
#app{
  background-color: #fffce4;
  min-height: 100vh;
}
.card{
  background-color: #fffce4;
}
#videos{
  background-color: #798645;
}
.quiz_active{
  background-color: #e0f7f4;

}
.title{
  font-size: 10vw;
  font-weight: bold;
}
.title-text{
  font-size: 2.9vw;
}
  </style>
  