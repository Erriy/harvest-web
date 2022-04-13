<template>
    <div>
        <div
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="disable"
            infinite-scroll-distance="10"
        >
            <div v-for="(s, index) in seeds" :key="index" >
                {{JSON.stringify(s)}}
            </div>
        </div>
        <a-spin :spinning="loading" id='spin' tip="加载中" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            seeds: [],
            page: 1,
            limit: 1,
            loading: false,
            disable: false,
        }
    },
    methods: {
        async loadMore() {
            let has_more = true;
            this.disable = true;
            this.loading = true
            try {
                const result = await this.$api.seed.list({
                    page: this.page,
                    limit: this.limit,
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