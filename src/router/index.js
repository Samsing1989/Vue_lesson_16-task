import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DriverView from '../views/DriverView.vue'
import BusesView from '../views/BusesView.vue'
import DefinitionView from '../views/DefinitionView.vue'
import ContactsVies from '../views/ContactsVies.vue'
import DriverEdit from '../views/DriverEdit.vue'
import BusesEdit from '../views/BusesEdit.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/driver',
        name: 'driver',
        component: DriverView,
    },
    {
        path: '/driver/edit/:id?',
        name: 'driver-config',
        component: DriverEdit,
    },
    {
        path: '/buses',
        name: 'buses',
        component: BusesView,
    },
    {
        path: '/buses/edit/:id?',
        name: 'buses-config',
        component: BusesEdit,
    },
    {
        path: '/definition',
        name: 'definition',
        component: DefinitionView,
    },
    {
        path: '/contacts',
        name: 'contacts',
        component: ContactsVies,
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router
