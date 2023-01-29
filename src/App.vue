<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavBar from '@/shared/components/NavBar.vue';
import { routerLinks } from './router/link-routes';

</script>

<template>
  <div class="wrapper">
    <header>
        <NavBar 
          title="Rick and Morty"
          :links="routerLinks" 
        />
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
}
</style>
