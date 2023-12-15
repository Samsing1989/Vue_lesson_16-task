import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('driversList')
import { isMatchFilter } from '../helpers/helper.js'

export default {
    namespaced: true,
    state: {
        driversList: [],
        filter: {},

        loading: false,
        error: null,
    },
    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,

        getDriversList: (state) => state.driversList,
        getFilterDriverList: (state) => state.driversList.filter((driver) => isMatchFilter(driver, state.filter)),
        getDriverById: (state) => (driverId) => state.driversList.find((driver) => driver.id == driverId),
    },
    mutations: {
        setFilter(state, filter) {
            state.filter = filter
        },
        //========================================================================================================================================================
        setDriversList(state, itemsList) {
            state.driversList = itemsList
        },
        deleteDriver(state, driverId) {
            state.driversList = state.driversList.filter((item) => item.id !== driverId)
        },

        setLoading(state, value) {
            state.loading = value
        },
        setError(state, error) {
            state.error = error
        },
    },

    actions: {
        loadDriversList({ commit }) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .loadItemsList()
                .then((list) => {
                    commit('setDriversList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        addDrivers({ commit, dispatch }, item) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .addItem(item)
                .then(() => {
                    dispatch('loadDriversList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        deleteDrivers({ commit, dispatch }, driverId) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .deleteItem(driverId)
                .then(() => {
                    dispatch('loadDriversList').then(() => {
                        commit('deleteDriver', driverId)
                        dispatch('assignments/deleteAssignmentsByDriverId', driverId, { root: true })
                    })
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        updateDrivers({ commit, dispatch }, { driverId, data }) {
            console.log('driverId', driverId)
            console.log('driverData', data)

            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .updateItem(driverId, data)
                .then(() => {
                    dispatch('loadDriversList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        loadFilteredData({ commit }, { fieldTitle, compareOperator, valueToCompare }) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .loadFilteredData(fieldTitle, compareOperator, valueToCompare)
                .then((list) => {
                    commit('setDriversList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        updateFilter({ commit }, filter) {
            commit('setFilter', filter)
        },
    },
    modules: {},
}
