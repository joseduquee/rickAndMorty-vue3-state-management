<script setup lang="ts">
import rickAndMortyApi from '@/api/rickAndMortyApi';
import characterStore from '@/store/characters.store';
import { useQuery } from '@tanstack/vue-query';
import { useRoute } from 'vue-router';
import type { Result as Character } from '../interfaces/character';

const route = useRoute();

const { id } = route.params as { id:string };

const getCharacterCacheFirst = async( characterId: string ):Promise<Character> => {
    // Con esto evito que se vuelva hacer de nuevo la peticion
    if(characterStore.checkIdInStore( characterId)) {
        return characterStore.ids.list[characterId];
    }

    const { data } = await rickAndMortyApi.get<Character>(`/character/${ characterId }`);
    return data;
}

const { data } = useQuery(
    //Cache
    ['characters', id],
    // ()=> esyto al comienzo es para que se ejecute la funcion y se le paso el argumento
    () => getCharacterCacheFirst( id ),
    {
        onSuccess( character ) {
            characterStore.loadedCharacter( character )
        }
    }
)

</script>


<template>

    <h1 v-if="!data">Loading...</h1>

    <div v-else>
        <h1>{{ data.name }}</h1>
        <div class="character-container">
            <img :src="data.image" :alt="data.name" />
            <ul>
                <li>Genero: {{ data.gender }}</li>
                <li>Estatus: {{ data.status }}</li>
                <li>Genero: {{ data.episode.join(', ') }}</li>
                <li>Especie: {{ data.species }}</li>
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