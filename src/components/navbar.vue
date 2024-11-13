<template>
  <header class="navbar">
    <v-toolbar flat :color="primaryColor">
      <div class="navbar__brand">
        <img
          src="../assets/images/logo.png"
          alt="RecycleLah Logo"
          class="navbar__logo"
        />
        <v-toolbar-title class="text-h5 font-weight-bold" :style="{ color: textColor }">
          RecycleLah
        </v-toolbar-title>
      </div>

    
      <div class="navbar__nav" :class="{ 'navbar__nav--hidden': isMobile }">
        <v-btn text to="/Dashboard" class="navbar__nav-btn">
          <v-icon left>mdi-home</v-icon>
          Home
        </v-btn>
        <v-btn text to="/Leaderboard" class="navbar__nav-btn">
          <v-icon left>mdi-trophy</v-icon>
          Leaderboard
        </v-btn>
        <v-btn text to="/Forest" class="navbar__nav-btn">
          <v-icon left>mdi-tree</v-icon>
          Forest
        </v-btn>
        <v-btn text to="/RecycleNow" class="navbar__nav-btn">
          <v-icon left>mdi-magnify</v-icon>
          RecycleNow
        </v-btn>
        <v-btn text to="/Education/Quiz" class="navbar__nav-btn">
          <v-icon left>mdi-help-circle</v-icon>
          Quiz
        </v-btn>
        <v-btn text to="/Education/Video" class="navbar__nav-btn">
          <v-icon left>mdi-book-open</v-icon>
          Education Hub
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-menu v-if="isMobile" offset-y>
        <template v-slot:activator="{ props }">
          <div class="navbar__burger" v-bind="props">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </template>
        <v-list class="navbar__mobile-menu">
          <v-list-item to="/Dashboard">
            <template v-slot:prepend>
              <v-icon>mdi-home</v-icon>
            </template>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/Leaderboard">
            <template v-slot:prepend>
              <v-icon>mdi-trophy</v-icon>
            </template>
            <v-list-item-title>Leaderboard</v-list-item-title>
          </v-list-item>
          <v-list-item to="/Forest">
            <template v-slot:prepend>
              <v-icon>mdi-tree</v-icon>
            </template>
            <v-list-item-title>Forest</v-list-item-title>
          </v-list-item>
          <v-list-item to="/RecycleNow">
            <template v-slot:prepend>
              <v-icon>mdi-magnify</v-icon>
            </template>
            <v-list-item-title>RecycleNow</v-list-item-title>
          </v-list-item>
          <v-list-item to="/Education/Quiz">
            <template v-slot:prepend>
              <v-icon>mdi-help-circle</v-icon>
            </template>
            <v-list-item-title>Quiz</v-list-item-title>
          </v-list-item>
          <v-list-item to="/Education/Video">
            <template v-slot:prepend>
              <v-icon>mdi-play-circle</v-icon>
            </template>
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
            class="navbar__avatar"
          >
            <v-icon :color="textColor" size="40">mdi-account-circle</v-icon>
          </v-avatar>
        </template>
        <v-list class="navbar__user-menu">
          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-account</v-icon>
            </template>
            <v-list-item-title>Signed in as</v-list-item-title>
            <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <template v-slot:prepend>
              <v-icon>mdi-account-details</v-icon>
            </template>
            <v-list-item-title>Username: {{ userName }}</v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item @click="handleDeleteAccount" class="navbar__menu-item--danger">
            <template v-slot:prepend>
              <v-icon color="error">mdi-account-remove</v-icon>
            </template>
            <v-list-item-title>Delete Account</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleSignOut" class="navbar__menu-item--danger">
            <template v-slot:prepend>
              <v-icon color="error">mdi-logout</v-icon>
            </template>
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <!-- Delete Account Dialog -->
      <v-dialog v-model="showDeleteDialog" max-width="400">
        <v-card>
          <v-card-title class="text-h5">Delete Account</v-card-title>
          <v-card-text>
            Are you sure you want to delete your account? This action cannot be undone.
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="showDeleteDialog = false">Cancel</v-btn>
            <v-btn color="error" text @click="confirmDeleteAccount">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  VAvatar,
  VIcon,
  VDialog,
  VCard,
  VCardTitle,
  VCardText,
  VCardActions,
  VDivider
} from 'vuetify/components'

const { userEmail, userName, logout, deleteUser } = useAuth()
const router = useRouter()
const isMobile = ref(window.innerWidth < 1100)
const showDeleteDialog = ref(false)

const primaryColor = '#798645'
const textColor = '#FEFAE0'

const handleResize = () => {
  isMobile.value = window.innerWidth < 1100
}

const handleSignOut = async () => {
  await logout()
  router.push('/')
}

const handleDeleteAccount = () => {
  showDeleteDialog.value = true
}

const confirmDeleteAccount = async () => {
  await deleteUser()
  showDeleteDialog.value = false
  router.push('/')
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style lang="sass" scoped>
@import './_navbar.sass'
</style>
