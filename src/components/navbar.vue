<template>
  <header class="navbar">
    <v-toolbar flat :color="primaryColor">
      <!-- Logo and Brand -->
      <div class="d-flex align-center">
        <img
          src="../assets/images/logo.png"
          alt="RecycleLah Logo"
          class="navbar-logo mr-2"
        />
        <v-toolbar-title class="text-h5 font-weight-bold" :style="{ color: textColor }">
          RecycleLah
        </v-toolbar-title>
      </div>

      <!-- Navigation Buttons -->
      <div class="nav-buttons" :class="{ 'hide-nav': isMobile }">
        <v-btn text to="/Dashboard" :style="{ color: textColor }">Home</v-btn>
        <v-btn text to="/Leaderboard" :style="{ color: textColor }">Leaderboard</v-btn>
        <v-btn text to="/Forest" :style="{ color: textColor }">Forest</v-btn>
        <v-btn text to="/ItemIdentifier" :style="{ color: textColor }">Item Identifier</v-btn>
        <v-btn text to="/Education/Quiz" :style="{ color: textColor }">Quiz</v-btn>
        <v-btn text to="/Education/Video" :style="{ color: textColor }">Video</v-btn>
      </div>

      <v-spacer></v-spacer>

      <!-- Burger Menu (Mobile) -->
      <v-menu v-if="isMobile" offset-y>
        <template v-slot:activator="{ props }">
          <div class="burger" v-bind="props">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </template>
        <v-list>
          <v-list-item to="/Dashboard">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/Leaderboard">
            <v-list-item-title>Leaderboard</v-list-item-title>
          </v-list-item>
          <v-list-item to="/Forest">
            <v-list-item-title>Forest</v-list-item-title>
          </v-list-item>
          <v-list-item to="/ItemIdentifier">
            <v-list-item-title>Item Identifier</v-list-item-title>
          </v-list-item>
          <v-list-item to="/Education/Quiz">
            <v-list-item-title>Quiz</v-list-item-title>
          </v-list-item>
          <v-list-item to="/Education/Video">
            <v-list-item-title>Video</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- User Menu -->
      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-avatar
            v-bind="props"
            size="40"
            class="user-avatar"
          >
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" />
          </v-avatar>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Signed in as</v-list-item-title>
            <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>Username: {{ userName }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleSignOut" class="red--text">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuth } from '../lib/auth'
import { useRouter } from 'vue-router'
import { 
  VToolbar,
  VToolbarTitle,
  VBtn,
  VSpacer,
  VMenu,
  VList,
  VListItem,
  VListItemTitle,
  VListItemSubtitle,
  VAvatar
} from 'vuetify/components'

const { userEmail, userName, logout } = useAuth()
const router = useRouter()
const isMobile = ref(window.innerWidth < 960)

const primaryColor = '#798645'
const textColor = '#FEFAE0'

const handleResize = () => {
  isMobile.value = window.innerWidth < 960
}

const handleSignOut = async () => {
  await logout()
  router.push('/')
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.navbar {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: '#798645';
  background-clip: content-box; /* <---- */
  box-shadow: inset 0 0 0 20px  #798645;/* <-- 10px spread radius */
  padding: 0 20px;
  z-index: 9999;
}

.v-toolbar {
  padding-left: 0 !important;
  padding-right: 0 !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.navbar-logo {
  height: 40px;
  width: auto;
  margin-right: 12px;
}

.nav-buttons {
  margin-left: 20px;
}

.user-avatar {
  margin-left: 16px;
  cursor: pointer;
}

.burger {
  width: 40px;
  height: 30px;
  margin-right: 16px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 5px 0;
}

.burger span {
  display: block;
  height: 4px;
  width: 100%;
  background: #FEFAE0;
  border-radius: 9px;
  transition: .25s ease-in-out;
}

@media (max-width: 960px) {
  .hide-nav {
    display: none;
  }
}

@media (min-width: 961px) {
  .burger {
    display: none;
  }
}
</style>
