<template>
    <div>
        <div
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="disable"
            infinite-scroll-distance="10"
        >
            <div v-for="(s, index) in seeds" :key="index" >
                <a-button
                    class="publisher"
                    type="link"
                >
                    {{s._publisher}}
                </a-button>
                <div v-if="s.body">
                    {{s.body.data}}
                </div>
                <div style="margin: 20px"></div>
                <a-tag v-for="(tag, ti) in s.tags" :key="ti">
                    {{tag}}
                </a-tag>
                <a-divider dashed />
            </div>
        </div>
        <a-spin :spinning="loading" id='spin' tip="加载中" />
        <div v-if="disable && !loading" style="text-align: center; color:gray; margin: 20px;">已经到底了</div>
    </div>
</template>

<script>
export default {
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
.publisher {
    float: right;
    position: relative;
    top: -15px;
    right: 10px;
    z-index: 999;
}
</style>