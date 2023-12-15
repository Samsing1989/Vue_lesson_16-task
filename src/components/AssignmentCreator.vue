<template>
    <h2 class="title">Нове презначення</h2>

    <div class="selected">
        <div class="item">
            <v-select
                v-model="assignment.driverId"
                label="Ім'я водія"
                :items="getDriversList"
                item-value="id"
                variant="solo"
                item-title="name"
                clearable
            >
                <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :value="item.raw.id" :subtitle="item.raw.exp"></v-list-item>
                </template>
            </v-select>
        </div>
        <div class="item">
            <v-select
                v-model="assignment.busId"
                label="Номер автобуса"
                :items="getBusList"
                item-value="id"
                variant="solo"
                item-title="number"
                clearable
            >
                <template v-slot:item="{ props, item }">
                    <v-list-item v-bind="props" :value="item.raw.id" :subtitle="item.raw.placesNumber"> </v-list-item>
                </template>
            </v-select>
        </div>
    </div>
    <v-btn elevation="8" size="x-large" @click="onAdd">Додати призначення</v-btn>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
    name: 'AssignmentCreator',

    data() {
        return {
            assignment: {},
        }
    },
    computed: {
        ...mapGetters('driver', ['getDriversList']),
        ...mapGetters('buses', ['getBusList']),
    },
    created() {
        this.loadDriversList()
        this.loadBusList()
    },
    methods: {
        ...mapActions('assignments', ['addAssignment']),
        ...mapActions('driver', ['loadDriversList']),
        ...mapActions('buses', ['loadBusList']),
        onAdd() {
            this.addAssignment(this.assignment)
            this.assignment = {}
        },
    },
}
</script>

<style lang="scss" scoped>
.selected {
    display: flex;
    justify-content: center;
    gap: 30px;
}
.item {
    width: 300px;
}
</style>
