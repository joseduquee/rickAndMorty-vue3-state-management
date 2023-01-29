<script setup lang="ts">
import rickAndMortyApi from '@/api/rickAndMortyApi';
import CardList from '@/characters/components/CardList.vue';
import characterStore from '@/store/characters.store';
import { useQuery } from '@tanstack/vue-query';
import type { Character, Result } from '../interfaces/character';

const props = defineProps<{ title: string, visible: boolean }>();

const getCharactersCacheFirst = async(): Promise<Result[]> => {
    
    if( characterStore.characters.count > 0) {
        return characterStore.characters.list;
    }
    
    const { data } = await rickAndMortyApi.get<Character>('/character');
    return data.results;
}

useQuery(
    //Este es el cache
    ['characters'],
    //Peticion
    getCharactersCacheFirst,
    //el tercer parametro es un objeto de configuracion
    {
        onSuccess( data ) {
            characterStore.loadedCharacters ( data )
        },
        onError( error: any  ) {
           //Aqui se maneja el error
           //console.log(error);
           characterStore.loadedCharactersFailed( error.response.data )
        }
    }
);

</script>


<template>

    <h1 v-if="characterStore.characters.isLoading">Loading...</h1>

    <div v-else-if="characterStore.characters.hasError">
        <h1>Error al cargar</h1>
        <p>{{ characterStore.characters.errorMessage }}</p>
    </div>

    <template v-else>
        <h2>{{ props.title }}</h2>
        <CardList :characters="characterStore.characters.list" />
    </template>


</template>


<style scoped>

</style>