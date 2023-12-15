import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('busesList')
export default {
    namespaced: true,
    state: () => ({
        busesList: [],

        loading: false,
        error: null,
    }),
    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,

        getBusList: (state) => state.busesList,
        getBusById: (state) => (busId) => state.busesList.find((bus) => bus.id == busId),
    },
    mutations: {
        setBusList(state, itemsList) {
            state.busesList = itemsList
        },
        deleteBus(state, busId) {
            state.busesList = state.busesList.filter((bus) => bus.id !== busId)
        },

        setLoading(state, value) {
            state.loading = value
        },
        setError(state, error) {
            state.error = error
        },
    },
    actions: {
        loadBusList({ commit }) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .loadItemsList()
                .then((list) => {
                    commit('setBusList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        addBus({ commit, dispatch }, item) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .addItem(item)
                .then(() => {
                    dispatch('loadBusList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        deleteBus({ commit, dispatch }, busId) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .deleteItem(busId)
                .then(() => {
                    dispatch('loadBusList').then(() => {
                        commit('deleteBus', busId)
                        dispatch('assignments/deleteAssignmentByBusId', busId, { root: true })
                    })
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        updateBus({ commit, dispatch }, { busId, data }) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .updateItem(busId, data)
                .then(() => {
                    dispatch('loadList')
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
                    commit('setBusList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
    },
}
