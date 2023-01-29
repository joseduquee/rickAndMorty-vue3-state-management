<script setup lang="ts">
import CharacterCard from './CharacterCard.vue';
import type { Result } from '@/characters/interfaces/character';

// -----------Ejemplo numero 1 con suspense
// const { data: characters } = await rickAndMortyApi.get<Character>('/character');

// -----------Ejemplo numero 2 composable function
// const { isLoading, characters, hasError, errorMessage } = useCharacters();

// -----------Ejemplo numero 3 TanStack Query

// const getCharactersSlow = async():Promise<Character> => {

//     return new Promise( (resolve) => {
//         setTimeout(async() => {
//             const { data } = await rickAndMortyApi.get<Character>('/character');
//             resolve(data);
//         }, 1);
//     })
// }

// const { isLoading, isError, data: characters, error } = useQuery(
//     ['characters'],
//     getCharactersSlow,
//     // {
//     //     // 1000 significa 1 segundo
//     //     cacheTime: 1000,
//     //     refetchOnReconnect: 'always'
//     // }
// );

//Esto es lo que viene del padre
const props = defineProps<{ characters: Result[] }>();

</script>

<template>
    <div class="card-list">
        <CharacterCard   
            v-for="character of props.characters"
            :key="character.id"
            :character="character"            
        />
    </div>
</template>


<style scoped>
.card-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>