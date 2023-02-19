import { ref, computed } from "vue";
import type { Result as Character } from "@/characters/interfaces/character";
import rickAndMortyApi from '@/api/rickAndMortyApi';
import { useQuery } from '@tanstack/vue-query';

const characterSet = ref<{[id: string]: Character}>({});
const hasError = ref<boolean>(false);
const  errorMessage = ref<string|null>(null);

const getCharacter = async( id: string ):Promise<Character> => {
    // Con esto evito que se vuelva hacer de nuevo la peticion
    if( characterSet.value[id] ) 
        return characterSet.value[id];
    
    try {
        const { data } = await rickAndMortyApi.get<Character>(`/character/${ id }`);
        return data;
    } catch (erro : any) {
        throw new Error(`No se encontro un persona con el id ${ id }`)
    }
}

const loadedCharacter = ( character: Character ) => {
    hasError.value = false;
    errorMessage.value = null;
    characterSet.value[character.id] = character;
}

const loadedError = ( error: string ) => {
    hasError.value = true;
    errorMessage.value = error;
}

const useCharacter = ( id: string ) => {
    
    const { isLoading } = useQuery(
        //Cache
        ['characters', id],
        // ()=> esyto al comienzo es para que se ejecute la funcion y se le paso el argumento
        () => getCharacter( id ),
        {
            onSuccess: loadedCharacter,
            onError(error: string) {
                loadedError(error)
            }
        }
    )


    return {
        // Properties
        //no se usa computed porque se envia las referencias de las mismas
        errorMessage,
        hasError,
        isLoading,
        list: characterSet,

        // Getters
        character: computed<Character | null>(() => characterSet.value[id]),
    }
}

export default useCharacter;