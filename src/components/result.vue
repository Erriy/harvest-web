<template>
    <div>
        <div id="search_box">
            <a-switch 
                v-model='search_tag_or_mode'
                checked-children="并集" 
                un-checked-children="交集" 
                default-checked 
            />
            <a-tag
                v-for='(tag, ti) in tags'
                :key='tag'
                :index='ti'
                closable
                @close='remove_tag(tag)'
            >
                {{ tag }}
            </a-tag>
        </div>
        <div id="result">
            <div
                v-infinite-scroll="loadMore"
                infinite-scroll-disabled="disable"
                infinite-scroll-distance="10"
            >
                <div v-for="(s, index) in seeds" :key="index" >
                    <seed
                        :seed="s"
                        @delete="delete_seed(index)"
                        @click_tag="search_tag"
                    />
                    <a-divider dashed />
                </div>
            </div>
            <a-spin :spinning="loading" id='spin' tip="加载中" />
            <div v-if="disable && !loading" style="text-align: center; color:gray; margin: 20px;">已经到底了</div>
        </div>
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
            tags: [],
            search_tag_or_mode: true,
            ending: 'desc',
            loading: false,
            disable: false,
        }
    },
    watch: {
        search_tag_or_mode() {
            if(this.tags.length > 1) {
                this.refresh();
            }
        },
    },
    methods: {
        refresh() {
            this.seeds = [];
            this.page = 1;
            this.loading = false;
            this.disable = false;
        },
        delete_seed(index) {
            this.seeds.splice(index, 1);
        },
        remove_tag(tag) {
            this.tags.splice(this.tags.indexOf(tag), 1);
        },
        search_tag(tag) {
            if(this.tags.includes(tag)) {
                return;
            }
            this.tags.push(tag);
            this.refresh();
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
                    tags: this.tags,
                    mode: this.search_tag_or_mode ? 'or': 'and',
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
#search_box {
    position: fixed;
}
#result {
    width: 720px;
    margin: 0 auto;
}

</style>