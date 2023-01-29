<script setup lang="ts">
import type { RouterLink } from '@/router/link-routes';

// const props = defineProps({
//     title: {
//         type: String,
//         required: true
//     }
// });

interface Props {
    title?: string;
    links: RouterLink[];
    showIcon?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    showIcon: true,
    links: () => []
});

</script>


<template>
    <nav>
        <img v-if="props.showIcon" src="@/assets/logo.svg" alt="Vue logo" height="25" width="25"/>
        <span v-if="props.title">{{ props.title }}</span>

        <RouterLink
            v-for="link of props.links"
            :key="link.path"
            :to="link.path"
        >
            {{ link.title }}
        </RouterLink>

        <!-- <RouterLink to="/">Inicio</RouterLink>
        <RouterLink to="/about">Sobre</RouterLink> -->
    </nav>
</template>


<style scoped>

nav {
    align-items: flex-start;
    display: flex;
    font-size: 12px;
    margin-top: 2rem;
    text-align: center;
    width: 100%;
}

img {
    margin-right: 10px;
}

span {
    margin-right: 10px;
}

a {
    margin-right: 5px;
}

</style>