import rickAndMortyApi from "@/api/rickAndMortyApi";
import type { Result as Characters, Character } from "@/characters/interfaces/character"
import { reactive } from "vue";

interface Store {
    characters: {
        list: Characters[];
        count: number;
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },
    ids: {
        list: {
            [id: string]: Characters
        }
        isLoading: boolean;
        hasError: boolean;
        errorMessage: string | null;
    },

    //Metodos de Characters
    startLoadingCharacters: () => void;
    loadedCharacters: ( data: Characters[] ) => void;
    loadedCharactersFailed: ( error: string ) => void;

    //Metodos de Characters por IDs
    startLoadingCharacter: () => void;
    checkIdInStore: ( id: string ) => boolean;
    loadedCharacter: ( character: Characters ) => void;
}

//Initial state
const characterStore = reactive<Store>({
    characters: {
        count: 0,
        errorMessage: null,
        hasError: false,
        isLoading: true,
        list: []
    },

    ids: {
        list: {},
        isLoading: false,
        hasError: false,
        errorMessage: null,
    },

    //Metodos de Characters
    async startLoadingCharacters(){
        const { data } = await rickAndMortyApi.get<Character>('/character');
        
        this.loadedCharacters( data.results )   
    },
    loadedCharacters(data: Characters[]){
        //console.log( data );
        this.characters = {
            count: data.length,
            errorMessage: null,
            hasError: false,
            isLoading: false,
            list: data
        }
    },
    loadedCharactersFailed(error: any) {
        this.characters = {
            count: 0,
            errorMessage: error,
            hasError: true,
            isLoading: false,
            list: []
        }
    },

        //Metodos de Characters por IDs
    startLoadingCharacter() {
        this.ids = {
            ...this.ids,
            isLoading: true,
            hasError: false,
            errorMessage: null
        }
    },
    checkIdInStore( id: string ) {
        // doble negacion para convertirlo en boolean
        //con ! solo si existe devuelve un false
        //la negacion de un false es tru
        return !!this.ids.list[id]
    },
    loadedCharacter( character: Characters ) {
        this.ids.isLoading = false;
        this.ids.list[character.id] = character;
    }
})

characterStore.startLoadingCharacters()

export default characterStore;