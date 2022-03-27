<template>
    <div id='seed-list'>
        <a-timeline>
            <a-timeline-item
                v-for="(seed, si) in seeds"
                :index='si'
                :key='seed'
            >
                {{JSON.stringify(seed)}}
            </a-timeline-item>
        </a-timeline>
    </div>
</template>

<script>
export default {
    data() {
        return {
            seeds: [],
        }
    },
    async mounted() {
        this.seeds = (await this.$api.seed.list()).seeds;
    }
}
</script>

<style>

</style>