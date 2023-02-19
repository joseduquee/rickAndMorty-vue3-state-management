import { ref, computed } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import type { Character, Result } from '@/characters/interfaces/character';
import rickAndMortyApi from '@/api/rickAndMortyApi';

const characters = ref<Result[]>([]);
const hasError = ref<boolean>(false);
const errorMessage = ref<string | null>(null);

const getCharacters = async(): Promise<Result[]> => {
    
    if( characters.value.length > 0) {
        return characters.value;
    }
    
    const { data } = await rickAndMortyApi.get<Character>('/character');
    return data.results;
}

const loadedCharacters = (data: Result[]) => {
    hasError.value = false;
    errorMessage.value = null;
    characters.value = data;
}

//Composables son funciones que retornar variables reactivas
const useCharacters = () => {

    const { isLoading} = useQuery(
        //Este es el cache
        ['characters'],
        //Peticion
        getCharacters,
        //el tercer parametro es un objeto de configuracion
        {
            onSuccess: loadedCharacters,
            //Esto es lo mismo que esto
            //onSucces ( data ) { loadedCharacters(data)}
        }
    );
    

    return {
        // Properties
        characters,
        errorMessage,
        hasError,
        isLoading,

        // Getters
        //Al utilizar el value y no la variable reactiva entera ref
        //debo utilizar una propiedad computada para mantenerla reactiva
        count: computed( () => characters.value.length ),

        // Methods
    }
}

export default useCharacters;