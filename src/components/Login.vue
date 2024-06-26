<template>
  <div class="wrapper">
    <h1>Visão de Tarefas</h1>
    <div class="container">
      <v-container class="username">{{ userStore.user.displayName
        }}</v-container>
      <v-btn v-if="!!userStore.isAuthenticated"
        @click="userStore.signOut">Logout</v-btn>
      <v-btn v-else @click="userStore.signIn">Login</v-btn>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  background-color: rgb(72, 72, 72);
  margin: 0;
  width: 100%;
  padding: 20px;
}

.container {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
  align-items: center;
}

.username {
  /* width: 500px; */
}
</style>