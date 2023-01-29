import { charaterRoute } from "@/characters/router";
import AboutPage from "@/shared/pages/AboutPage.vue";
import HomePage from "@/shared/pages/HomePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory( import.meta.env.BASE_URL ), 
    routes: [
        // Public
        { path: '/', name: 'home', component: HomePage },
        { path: '/about', name: 'about', component: AboutPage },

        //Characters rutas

        {
            ...charaterRoute,
            path: '/characters'
        },


        //una forma de hacerlo es:
        //charaterRoute,


        // { 
        //     path: '/characters', 
        //     name: 'characters', 
        //     component: () => import('@/characters/layout/CharaterLayout.vue') 
        // },

        //Default
        { path: '/:pathMatch(.*)*', redirect: () => ({ name: 'home' }) },
        
    ]
});


//path: './characters'
// otra forma es:
// router.addRoute( characterRoute )

export default router;