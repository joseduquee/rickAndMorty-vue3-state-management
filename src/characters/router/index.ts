import type { RouteRecordRaw } from 'vue-router'
import CharacterLayout from "@/characters/layout/CharaterLayout.vue";
import CharacterId from '@/characters/pages/CharacterId.vue';
import CharacterList from '@/characters/pages/CharacterList.vue';
import CharacterSearch from '@/characters/pages/CharacterSearch.vue';

const ROUTE_NAME = 'characters' 

export const charaterRoute: RouteRecordRaw = {
    path: `/${ ROUTE_NAME }`,
    redirect: `/${ ROUTE_NAME }/list`,
    component: CharacterLayout,
    children: [
        //no poner el / inicial porque te enruta a la ruta principal f.e /list
        { 
            //los : significan que el id es un argumento dinamico
            path: 'by/:id', 
            name: 'character-id',
            props: { title: 'Por Id', visible: false }, 
            component: CharacterId 
        },
        { 
            path: `/${ ROUTE_NAME }/list`, 
            name: 'character-list',
            props: { title: 'Lista de personajes', visible: true }, 
            component: CharacterList 
        },
        { 
            path: `/${ ROUTE_NAME }/search`, 
            name: 'character-search', 
            props: { title: 'Búsqueda', visible: true },
            component: CharacterSearch 
        }
    ]
}