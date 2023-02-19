<script setup lang="ts">
import { watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useCharacter from '@/characters/composables/useCharacter';

const route = useRoute();
const router = useRouter();

const { id } = route.params as { id:string };

const { character, hasError, errorMessage, isLoading } = useCharacter( id );

watchEffect(() => {
    if( !isLoading.value && hasError.value){
        //Redireccion,  replace no crea historial de navegacion, push si
        router.replace('/characters')
    }
})

</script>


<template>

    <h1 v-if="isLoading">Loading...</h1>
    <h1 v-else-if="hasError">{{ errorMessage }}</h1>

    <div v-else-if="character">
        <h1>{{ character.name }}</h1>
        <div class="character-container">
            <img :src="character.image" :alt="character.name" />
            <ul>
                <li>Genero: {{ character.gender }}</li>
                <li>Estatus: {{ character.status }}</li>
                <li>Genero: {{ character.episode.join(', ') }}</li>
                <li>Especie: {{ character.species }}</li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
.character-container{
    display: flex;
    flex-direction: row;
}

img {
    width: 150px;
    border-radius: 5px;
}
</style>