import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { VueQueryPlugin } from '@tanstack/vue-query';

import './assets/main.css';

const app = createApp(App);

//Esto es para inicializar el store y que este en memoria
import '@/store/characters.store';

// app.use( VueQueryPlugin );
//Configuración global del vuequery
VueQueryPlugin.install( app, {
    queryClientConfig: {
        defaultOptions: {
            queries: {
                cacheTime: 1000 * 120, //2 minutos
                // cuando se pierde conexion y se esta offline, al reconectar se hace la peticion http
                refetchOnReconnect: 'always'
            }
        }
    }
})

app.use(router);

app.mount('#app');
