<template>
    <div>
        <div class="lable">
            <v-text-field v-model="busData.number" label="автобуса" :rules="rules" hide-details="auto"></v-text-field>
        </div>
        <div class="lable">
            <v-text-field
                v-model="busData.placesNumber"
                label=" Кількість місць"
                :rules="rules"
                hide-details="auto"
            ></v-text-field>
        </div>
        <div class="active">
            <v-btn elevation="8" size="x-large" @click="onAction">{{ actionButtonTitle }}</v-btn>
            <v-btn elevation="8" size="x-large" @click="onCancel">Очистити</v-btn>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    name: 'BusesEdit',
    data() {
        return {
            busData: {},
        }
    },
    computed: {
        ...mapGetters('buses', ['getBusById']),
        receivedBusId() {
            return this.$route.params.id
        },
        actionButtonTitle() {
            return this.receivedBusId ? 'зберегти' : 'Створити'
        },
    },
    created() {
        this.busData = { ...this.getBusById(this.receivedBusId) }
    },
    methods: {
        ...mapActions('buses', ['addBus', 'updateBus']),
        onAction() {
            if (this.receivedBusId) this.updateBus({ busId: this.receivedBusId, data: this.busData })
            else this.addBus(this.busData)

            this.$router.push({ name: 'buses' })
        },

        onCancel() {
            this.$router.push({ name: 'buses' })
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
