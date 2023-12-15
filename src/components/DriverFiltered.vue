<template>
    <h2 class="title">Фільтер</h2>
    <div>
        <div class="filter">
            <div class="input">
                <v-text-field
                    v-model="searchDriver.name"
                    label=" ПІБ шофера:"
                    :rules="rules"
                    hide-details="auto"
                ></v-text-field>
            </div>
            <div class="input">
                <div class="input-small">
                    <v-text-field
                        v-model="searchDriver.expFrom"
                        label="  Від:"
                        :rules="rules"
                        hide-details="auto"
                    ></v-text-field>
                    <v-text-field
                        v-model="searchDriver.expTo"
                        label="  До:"
                        :rules="rules"
                        hide-details="auto"
                    ></v-text-field>
                </div>
            </div>
            <v-btn elevation="8" size="x-large" @click="onClearFilter">Обнулити</v-btn>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'DriverFiltered',
    data() {
        return {
            searchDriver: {
                expFrom: null,
                expTo: null,
                name: null,
            },
        }
    },
    watch: {
        searchDriver: {
            handler(newValue) {
                this.updateFilter(newValue)
            },
            deep: true,
        },
    },

    methods: {
        ...mapActions('driver', ['updateFilter']),
        onClearFilter() {
            this.searchDriver = {}
        },
    },
}
</script>

<style lang="scss" scoped>
.filter {
    display: flex;
    gap: 30px;
    margin-bottom: 20px;
}
.input {
    width: 500px;
}
.input-small {
    display: flex;
    max-width: 300px;
    gap: 10px;
}
</style>
