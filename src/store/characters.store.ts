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

    //Metodos
    startLoadingCharacters: () => void;
    loadedCharacters: ( data: Characters[] ) => void;
    loadedCharactersFailed: ( error: string ) => void;
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

    //Metodos
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
})

characterStore.startLoadingCharacters()

export default characterStore;