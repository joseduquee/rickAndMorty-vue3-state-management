import rickAndMortyApi from "@/api/rickAndMortyApi";
import { ref, onMounted } from "vue";
import type { Result, Character } from "../interfaces/character";
import axios from 'axios';

const characters = ref<Result[]>([]);
const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(false);
const errorMessage = ref<string>();

//Tecnicamente no se recomienda que los cmposables devuelvan promesas
export const useCharactersOld = () => {

    onMounted( async() => {
       await loadCharacters();
    });

    const loadCharacters = async() => {

        if( characters.value.length > 0 ) return;
        isLoading.value = true;

        try {

            const { data } =  await rickAndMortyApi.get<Character>('/character');
            characters.value = data.results;
            isLoading.value = false;
            
        } catch (error) {
            hasError.value = true;
            isLoading.value = false;

            if( axios.isAxiosError(error) ) {
                return errorMessage.value = error.message;
            }

            errorMessage.value = JSON.stringify(error);
        }
    }

    return {
        characters,
        isLoading,
        hasError,
        errorMessage
    }

}