<template>
    <div>
        <div
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="disable"
            infinite-scroll-distance="10"
        >
            <div v-for="(s, index) in seeds" :key="index" >
                <seed :seed="s" @delete="delete_seed(index)" />
                <a-divider dashed />
            </div>
        </div>
        <a-spin :spinning="loading" id='spin' tip="加载中" />
        <div v-if="disable && !loading" style="text-align: center; color:gray; margin: 20px;">已经到底了</div>
    </div>
</template>

<script>
import seed from './seed.vue';

export default {
    components: {
        seed,
    },
    data() {
        return {
            seeds: [],
            page: 1,
            limit: 20,
            ending: 'desc',
            loading: false,
            disable: false,
        }
    },
    methods: {
        delete_seed(index) {
            this.seeds.splice(index, 1);
        },
        async loadMore() {
            let has_more = true;
            this.disable = true;
            this.loading = true
            try {
                const result = await this.$api.seed.list({
                    page: this.page,
                    limit: this.limit,
                    ending: this.ending,
                });
                if(result.seeds.length  === 0) {
                    has_more = false;
                } else {
                    this.seeds = this.seeds.concat(result.seeds);
                    this.page++;
                }
            }
            finally{
                this.disable = !has_more;
                this.loading = false
            }
        }
    },
}
</script>

<style>
#spin {
    margin: auto;
    position: absolute;
    width: 720px;
}
</style>