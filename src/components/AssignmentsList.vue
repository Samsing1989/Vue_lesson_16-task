<template>
    <div v-for="assignment in getFilledAssignmentsList" :key="assignment.id">
        {{ assignment.driver }}{{ assignment.bus }}
    </div>
    <div v-if="isLoading" class="loading">
        <font-awesome-icon :icon="['fas', 'spinner']" spin spin-reverse style="color: #142351" size="10x" />
    </div>
    <div v-else-if="hasError">Error</div>
    <div v-else>
        <h1 class="title">Призначення</h1>
        <v-table class="table">
            <thead>
                <tr>
                    <th class="text-center">Шофера</th>

                    <th class="text-center">Номера автобусів</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="assignment in getFilledAssignmentsList" :key="assignment.id">
                    <td>{{ assignment.driverName }}</td>
                    <td>{{ assignment.busNumber }}</td>
                    <div class="active">
                        <button @click="deleteAssignment(assignment.id)">
                            <font-awesome-icon :icon="['fas', 'trash']" size="2x" color="red" />
                        </button>
                    </div>
                </tr>
            </tbody>
        </v-table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'AssignmentsList',
    computed: {
        ...mapGetters('assignments', ['getFilledAssignmentsList', 'isLoading', 'hasError']),
    },
    created() {
        this.loadAssignmentsList()
    },
    methods: {
        ...mapActions('assignments', ['deleteAssignment', 'loadAssignmentsList']),
        ...mapActions('driver', ['loadDriversList']),
        ...mapActions('buses', ['loadBusList']),
    },
}
</script>

<style lang="scss" scoped></style>
