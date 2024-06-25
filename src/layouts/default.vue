<template>
  <v-app>
    <Login />
    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script setup>
import Login from '@/components/Login.vue';

//
</script>
