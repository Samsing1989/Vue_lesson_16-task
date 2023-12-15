<template>
    <div>
        <div v-if="isLoading" class="loading">
            <font-awesome-icon :icon="['fas', 'spinner']" spin spin-reverse style="color: #142351" size="10x" />
        </div>
        <div v-else-if="hasError">Error</div>
        <div v-else>
            <driver-filtered />
            <div class="contanir-filter">
                <v-table class="table">
                    <thead>
                        <tr>
                            <th class="text-center">ПІБ</th>
                            <th class="text-center">Стаж водіння</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="driver in getFilterDriverList" :key="driver.id">
                            <td>{{ driver.name }}</td>
                            <td>{{ driver.exp }}</td>
                            <div class="active">
                                <button @click="onEdit(driver.id)">
                                    <font-awesome-icon :icon="['fas', 'pen-to-square']" size="2x" color="green" />
                                </button>
                                <button @click="deleteDrivers(driver.id)">
                                    <font-awesome-icon :icon="['fas', 'trash']" size="2x" color="red" />
                                </button>
                            </div>
                        </tr>
                    </tbody>
                </v-table>
            </div>
        </div>
        <router-link :to="{ name: 'driver-config' }" class="link">додати водія</router-link>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import DriverFiltered from '@/components/DriverFiltered.vue'
export default {
    name: 'DriverView',
    components: {
        DriverFiltered,
    },
    computed: {
        ...mapGetters('driver', ['getFilterDriverList', 'isLoading', 'hasError']),
    },
    created() {
        this.loadDriversList()
    },
    methods: {
        ...mapActions('driver', ['deleteDrivers', 'loadDriversList']),

        onEdit(driverId) {
            this.$router.push({
                name: 'driver-config',
                params: { id: driverId },
            })
        },
    },
}
</script>

<style lang="scss" scoped></style>
