<script setup>
import { RouterLink, RouterView } from 'vue-router'
import UserGitHubProfile from './components/UserGitHubProfile.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <UserGitHubProfile />

      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>
  </header>

  <RouterView />
</template>