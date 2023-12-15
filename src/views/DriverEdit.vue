<template>
    <div>
        <div class="lable">
            <v-text-field v-model="currentDriver.name" label="Імя" :rules="rules" hide-details="auto"></v-text-field>
        </div>
        <div class="lable">
            <v-text-field v-model="currentDriver.exp" label="Стаж" :rules="rules" hide-details="auto"></v-text-field>
        </div>

        <div class="active">
            <v-btn elevation="8" size="x-large" @click="onDriverAction">{{ buttonTitle }}</v-btn>
            <v-btn elevation="8" size="x-large" @click="onCancel">Очистити</v-btn>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'DriverEdit',
    data() {
        return {
            currentDriver: {},
        }
    },

    computed: {
        ...mapGetters('driver', ['getDriverById']),
        isEdition() {
            return this.$route.params.id
        },
        buttonTitle() {
            return this.isEdition ? 'Зберегти' : 'Додати водія'
        },
    },
    created() {
        this.currentDriver = { ...this.getDriverById(this.isEdition) }
    },
    methods: {
        ...mapActions('driver', ['addDrivers', 'updateDrivers']),

        onDriverAction() {
            if (this.isEdition) this.updateDrivers({ driverId: this.isEdition, data: this.currentDriver })
            else this.addDrivers(this.currentDriver)
            this.$router.push({
                name: 'driver',
            })
        },
        onCancel() {
            this.$router.push({
                name: 'driver',
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.lable {
    max-width: 400px;
    margin: 0 auto;
    margin-bottom: 20px;
}
.active {
    display: flex;
    justify-content: center;
    gap: 20px;
}
</style>
