import DbOperations from '../helpers/DbOperations'
const collectionDB = new DbOperations('assignmentsList')
export default {
    namespaced: true,
    state: {
        assignmentsList: [],
        loading: false,
        error: null,
    },
    getters: {
        isLoading: (state) => state.loading,
        hasError: (state) => state.error,

        getAssignmentsByDriverId: (state) => (driverId) =>
            state.assignmentsList.find((assignment) => assignment.driverId == driverId),
        getAssignmentsByBusId: (state) => (busId) =>
            state.assignmentsList.find((assignment) => assignment.busId == busId),
        getAssignmentsList: (state) => state.assignmentsList,
        getFilledAssignmentsList: (state, getters, rootState, rootGetters) =>
            state.assignmentsList.map((assignment) => ({
                id: assignment.id,
                driverName: rootGetters['driver/getDriverById'](assignment.driverId)?.name,
                busNumber: rootGetters['buses/getBusById'](assignment.busId)?.number,
            })),
    },
    mutations: {
        deleteAssignmentByBusId(state, busId) {
            state.assignmentsList = state.assignmentsList.filter((assignment) => assignment.busId !== busId)
        },
        deleteAssignmentByDriverId(state, driverId) {
            state.assignmentsList = state.assignmentsList.filter((assignment) => assignment.driverId !== driverId)
        },
        //========================================================================================================================================================
        setAssignmentsList(state, itemsList) {
            state.assignmentsList = itemsList
        },
        deleteAssignment(state, itemId) {
            state.assignmentsList = state.assignmentsList.filter((item) => item.id !== itemId)
        },

        setLoading(state, value) {
            state.loading = value
        },
        setError(state, error) {
            state.error = error
        },
    },
    actions: {
        loadAssignmentsList({ commit }) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .loadItemsList()
                .then((list) => {
                    commit('setAssignmentsList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        addAssignment({ commit, dispatch }, assignment) {
            commit('setError', null)
            commit('setLoading', true)
            collectionDB
                .addItem(assignment)
                .then(() => {
                    dispatch('loadAssignmentsList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        deleteAssignment({ commit }, itemId) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .deleteItem(itemId)
                .then(() => {
                    commit('deleteAssignment', itemId)
                    // dispatch('loadList')
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
        deleteAssignmentByBusId({ dispatch, getters }, busId) {
            const assignmentToDelete = getters.getAssignmentsByBusId(busId)
            if (assignmentToDelete) {
                let assignId = assignmentToDelete.id
                dispatch('deleteAssignment', assignId)
            }
        },
        deleteAssignmentsByDriverId({ dispatch, getters }, driverId) {
            const assignmentToDelete = getters.getAssignmentsByDriverId(driverId)
            if (assignmentToDelete) {
                let assignId = assignmentToDelete.id
                dispatch('deleteAssignment', assignId)
            }
        },
        updateAssignment({ commit, dispatch }, { itemId, data }) {
            commit('setError', null)
            commit('setLoading', true)

            collectionDB
                .updateItem(itemId, data)
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
                    commit('setItemsList', list)
                })
                .catch((error) => {
                    commit('setError', error)
                })
                .finally(() => {
                    commit('setLoading', false)
                })
        },
    },
    modules: {},
}
