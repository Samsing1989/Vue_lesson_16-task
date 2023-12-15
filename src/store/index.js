import { createStore } from 'vuex'
import driver from './modules/driver'
import buses from './modules/buses'
import assignments from './modules/assignments'
export default createStore({
    namespaced: true,

    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: { driver, buses, assignments },
})
