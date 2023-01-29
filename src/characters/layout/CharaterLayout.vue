<script setup lang="ts">
import type { RouterLink } from '@/router/link-routes';
import NavBar from '@/shared/components/NavBar.vue';
import { charaterRoute } from '../router';

// con esto accedemos a las rutas hijas
//console.log(charaterRoute.children)

const routeLinks: RouterLink[] = charaterRoute.children!
    // Aqui filtramos que componentes mostrar o no, y casteamos para que
    //ts lo reconozca
    .filter(route => (route.props as { visible: boolean }).visible)
    //Aqui mapesmos el objeto para que lo lea nuestro navbar correctamente
    .map(route => {
        return {
            name: route.name as string,
            path: route.path,
            title: (route.props as { title: string, visible: boolean }).title
        }
    });

</script>


<template>

    <h1>Personajes</h1>

    <!-- Navbar -->
    <NavBar :show-icon="false" :links="routeLinks" />

    <!-- RouterView + Suspense -->
    <!-- <Suspense> -->
    <RouterView />
    <!-- </Suspense> -->

</template>


<style scoped>

</style>