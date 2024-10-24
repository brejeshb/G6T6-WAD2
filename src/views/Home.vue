<template>
    <div>
      <h1>Home Page</h1>

    <ul>
      <li v-for="user in AuthTable" :key="user.id">{{ user.id }} {{ user.username }}
        {{ AuthTable.password }}</li>
    </ul>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { supabase } from '../lib/supabaseClient'

  const AuthTable = ref([])

  async function getCountries() {
    const { data } = await supabase.from('AuthTable').select()
    AuthTable.value = data
  }

  onMounted(() => {
    getCountries()
  })
  </script>

