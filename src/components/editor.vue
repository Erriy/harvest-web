<template>
    <div id='editor'>
        <a-row>
            <a-textarea
                v-model='seed.body.data'
                placeholder="记录点什么"
                :auto-size="{ minRows: 3, maxRows: 15}"
            />
        </a-row>
        <div style='margin:15px'></div>
        <a-row v-show='seed.body.data.length' type='flex'>
            <a-col flex='auto'>
                <a-tag
                    v-for='(tag, ti) in seed.tags'
                    :key='tag'
                    :index='ti'
                    closable
                    @close='remove_tag(tag)'
                >
                    {{ tag }}
                </a-tag>
                <a-input
                    v-if="tag.input.show"
                    ref="tag_input"
                    type="text"
                    size="small"
                    v-model="tag.input.value"
                    :style="{ width: '78px', height: '21px' }"
                    @blur="add_tag"
                    @keyup.enter="add_tag"
                />
                <a-tag v-else style="background: #fff; borderStyle: dashed;" @click="show_tag_input">
                    <a-icon type="plus" /> 添加标签
                </a-tag>
            </a-col>
            <a-col flex='200px'>
                <a-date-picker
                    v-model="happen.time"
                    :show-time='happen.show_time'
                    :format="happen.format[happen.show_time?1:0]"
                    placeholder="发生时间"
                    style="position: relative; top: -5px;"
                >
                    <template slot="renderExtraFooter">
                        <a-row>
                            <a-col>
                                <a-switch v-model='happen.show_time' checked-children="显示时间" un-checked-children="不显示时间" default-checked />
                            </a-col>
                        </a-row>
                    </template>
                    <span>
                        <a-button
                            type='link'
                            style="position: relative; top: 5px;"
                        >
                            {{happen.time? happen.time: '添加事件发生时间'}}
                        </a-button>
                    </span>
                </a-date-picker>
            </a-col>
            <a-col>
                <a-button
                    type='primary'
                    :loading='publishing'
                    @click='publish'
                >
                    发布
                </a-button>
            </a-col>
        </a-row>

    </div>
</template>

<script>
const uuid = require('uuid');
export default {
    data() {
        return {
            happen: {
                show_time: false,
                format: [
                    'YYYY-MM-DD',
                    'YYYY-MM-DD HH:mm:ss',
                ],
                time: null,
            },
            tag: {
                input: {
                    show: false,
                    value: '',
                }
            },
            publishing: false,
            seed: {
                uri: `seed://${uuid.v1()}`,
                time: {
                    create: new Date().getTime(),
                    happen: {
                        timestamp: null,
                        accuracy: 'second',
                    },
                },
                body: {
                    data: '',
                    type: 'text',
                },
                tags: [],
            }
        }
    },
    methods: {
        show_tag_input() {
            this.tag.input.value = ''
            this.tag.input.show = true;
            this.$nextTick(() => {
                this.$refs.tag_input.focus();
            });
        },
        add_tag() {
            if(this.tag.input.value.length && !this.seed.tags.includes(this.tag.input.value)) {
                this.seed.tags.push(this.tag.input.value);
            }
            this.tag.input.show = false;
        },
        remove_tag(tag) {
            this.seed.tags.splice(this.seed.tags.indexOf(tag), 1);
        },
        cleanup_seed() {
            this.seed = {
                uri: `seed://${uuid.v1()}`,
                time: {
                    create: new Date().getTime(),
                    happen: {
                        timestamp: null,
                        accuracy: 'second',
                    },
                },
                body: {
                    data: '',
                    type: 'text',
                },
                tags: [],
            };
        },
        async publish() {
            this.publishing = true;

            const seed = JSON.parse(JSON.stringify(this.seed));
            if(!this.happen.time) {
                delete seed.time.happen;
            }
            else {
                seed.time.happend = {
                    timestamp: this.happen.time.valueOf(),
                    accuracy: this.happen.show_time ? 'second' : 'day',
                }
            }

            try {
                const res = await this.$api.seed.publish([seed])
                if(200 === res.code) {
                    this.cleanup_seed();
                    this.$message.success('已发布');
                } else {
                    this.$message.error(res.message);
                }
            }
            finally {
                this.publishing = false;
            }
        }
    },
}
</script>

<style>

</style>