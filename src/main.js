import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './assets/style.css'
import App from './App.vue'
import Home from '@/views/Home.vue'
// import StartScreen from '@/views/StartScreen.vue'
// import Quiz from '@/views/Quiz.vue'
// import Return from '@/views/Return.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/startScreen', name: 'Start Screen', component: () => import('@/views/StartScreen.vue') },
    { path: '/quiz/:level', name: 'Quiz', component: () => import('@/views/Quiz.vue') },
    { path: '/return', name: 'Return', component: () => import('@/views/Return.vue') },
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'Start Screen' && !localStorage.getItem('userData')) {
        next({ name: 'Start Screen' })
    } else if (to.name === 'Quiz' && from.name !== 'Home') {
        next({ name: 'Home' })
    } else if (to.name === ' Return' && from.name !== 'Quiz') {
        next({ name: 'Home' })
    }
    else {
        next()
    }
})

createApp(App)
    .use(router)
    .mount('#app')
