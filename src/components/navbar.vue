<template>
  <header class="navbar">
    <v-toolbar flat>
      <v-toolbar-title>RecycleLah</v-toolbar-title>

      <v-btn text to="/Home">Home</v-btn>
      <v-btn text to="/Leaderboard">Leaderboard</v-btn>
      <v-btn text to="/Forest">Forest</v-btn>
      <v-btn text to="/ItemIdentifier">ItemIdentifier</v-btn>
      <v-btn text to="/Education/Quiz">Quiz</v-btn>
      <v-btn text to="/Education/Video">Video</v-btn>

      <v-menu offset-y>
        <template v-slot:activator="{ props }">
          <v-avatar v-bind="props" size="40" class="ml-4">
            <img
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              alt="Avatar"
            />
          </v-avatar>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title>Signed in as</v-list-item-title>
            <v-list-item-subtitle>{{ userEmail }}</v-list-item-subtitle>
          </v-list-item>
          <v-list-item @click="">
            <v-list-item-title>My Settings</v-list-item-title>
          </v-list-item>
          <v-list-item @click="">
            <v-list-item-title>Team Settings</v-list-item-title>
          </v-list-item>
          <v-list-item @click="">
            <v-list-item-title>Analytics</v-list-item-title>
          </v-list-item>
          <v-list-item @click="">
            <v-list-item-title>System</v-list-item-title>
          </v-list-item>
          <v-list-item @click="">
            <v-list-item-title>Configurations</v-list-item-title>
          </v-list-item>
          <v-list-item @click="">
            <v-list-item-title>Help & Feedback</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleSignOut" class="red--text">
            <v-list-item-title>Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
  </header>
</template>

<script>
import {
  VToolbar,
  VToolbarTitle,
  VBtn,
  VMenu,
  VAvatar,
  VList,
  VListItem,
  VListItemTitle,
  VListItemSubtitle,
} from 'vuetify/components';
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "vue-router";

export default {
  components: {
    VToolbar,
    VToolbarTitle,
    VBtn,
    VMenu,
    VAvatar,
    VList,
    VListItem,
    VListItemTitle,
    VListItemSubtitle,
  },
  setup() {
    const userEmail = ref('zoey@example.com');
    const auth = getAuth();
    const router = useRouter();

    onMounted(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          userEmail.value = user.email;
        }
      });
    });

    const handleSignOut = () => {
      signOut(auth)
        .then(() => {
          console.log("Successfully logged out!");
          router.push("/");
        })
        .catch((error) => {
          console.error("Sign Out Error", error);
        });
    };

    return { userEmail, handleSignOut };
  },
};
</script>

<style scoped>
.navbar {
  z-index: 1000; /* Ensure it is above other elements */
  top: 0;
  left: 0;
  right: 0;
  background-color: #1976d2; /* Vuetify primary color */
  color: white;
}

.main-content {
  margin-top: 64px; /* Adjust this if needed based on your layout */
}
</style>
