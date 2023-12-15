<template>
    <div>
        <div v-if="isLoading" class="loading">
            <font-awesome-icon :icon="['fas', 'spinner']" spin spin-reverse style="color: #142351" size="10x" />
        </div>
        <div v-else-if="hasError">Error</div>
        <div v-else>
            <h1 class="title">Наші автобуси</h1>
            <v-table class="table">
                <thead>
                    <tr>
                        <th class="text-center">Номер</th>
                        <th class="text-center">Кількість мість</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="bus in getBusList" :key="bus.id">
                        <td>{{ bus.number }}</td>
                        <td>{{ bus.placesNumber }}</td>
                        <div class="active">
                            <button @click="onEdit(bus.id)">
                                <font-awesome-icon :icon="['fas', 'pen-to-square']" size="2x" color="green" />
                            </button>
                            <button @click="deleteBus(bus.id)">
                                <font-awesome-icon :icon="['fas', 'trash']" size="2x" color="red" />
                            </button>
                        </div>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <router-link :to="{ name: 'buses-config' }" class="link">Додати автобус</router-link>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'BusesView',

    computed: {
        ...mapGetters('buses', ['getBusList', 'isLoading', 'hasError']),
    },
    created() {
        this.loadBusList()
    },
    methods: {
        ...mapActions('buses', ['loadBusList', 'deleteBus']),

        onEdit(busId) {
            this.$router.push({
                name: 'buses-config',
                params: {
                    id: busId,
                },
            })
        },
    },
}
</script>

<style lang="scss" scoped></style>
