<template>
  <v-container>
    <v-btn @click="loginWithGoogle">Login with Google</v-btn>
  </v-container>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const loginWithGoogle = async () => {
  try {
    await userStore.signIn();
    console.log("User logged in:", userStore.user);
  } catch (error) {
    console.error("Error logging in:", error);
  }
};
</script>
