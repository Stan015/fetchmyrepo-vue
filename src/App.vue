<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UserGitHubProfile from './components/UserGitHubProfile.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <UserGitHubProfile />
    </div>
  </header>

  <RouterView />
</template>