<template>
    <div>
        <!-- <a-button
            class="publisher"
            type="link"
        >
            {{seed._publisher}}
        </a-button> -->
        <a-popconfirm
            v-show="!edit_mode"
            placement="rightTop"
            title="确认删除？"
            ok-text="确定"
            cancel-text="取消"
            @confirm="delete_seed"
        >
            <a-button
                class="delete"
                type="link"
            >
                <a-icon type="close" />
            </a-button>
        </a-popconfirm>
        <a-row>
            <a-col v-if="edit_mode" >
                <a-textarea
                    v-model='seed.body.data'
                    placeholder='输入内容'
                    :autoSize='{minRows: 3, maxRows: 6}'
                ></a-textarea>
            </a-col>
            <a-col v-else>
                <div v-if="seed.body">
                    {{seed.body.data}}
                </div>
            </a-col>
        </a-row>
        <div style="margin:10px"></div>
        <a-row type='flex'>
            <a-col flex="auto">
                <a-tag
                    v-for='(tag, ti) in seed.tags'
                    :key='tag'
                    :index='ti'
                    :closable="edit_mode"
                    @close='remove_tag(tag)'
                    @click="click_tag(tag)"
                >
                    {{ tag }}
                </a-tag>
                <template v-if='edit_mode'>
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
                </template>
            </a-col>
            <a-col flex='200px'>
                <div v-if="!edit_mode">
                    <div v-if="seed.time.happen">
                        {{happen.time}}
                    </div>
                </div>
                <a-date-picker
                    v-else
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
                <div class="edit_or_save">
                    <a-button
                        v-if="!edit_mode"
                        type="link"
                        @click="edit_mode = true"
                    >
                        编辑
                    </a-button>
                    <a-button
                        v-else
                        type="link"
                        @click="save_seed"
                    >
                        保存
                    </a-button>
                </div>
            </a-col>
        </a-row>
    </div>
</template>

<script>
const uuid = require('uuid');
const moment = require("moment");

export default {
    props: {
        seed: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            edit_mode: false,
            tag: {
                input: {
                    show: false,
                    value: '',
                },
            },
            happen: {
                show_time: false,
                format: [
                    'YYYY-MM-DD',
                    'YYYY-MM-DD HH:mm:ss',
                ],
                time: null,
            },
            publishing: false,
        }
    },
    watch: {
        edit_mode(val) {
            if (val && this.seed.time.happen) {
                this.happen.time = new moment(this.seed.time.happen.timestamp);
                this.happen.show_time = this.seed.time.happen.acccuracy === 'second';
            }
        },
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
        click_tag(tag) {
            this.$emit('click_tag', tag);
        },
        async save_seed() {
            this.publishing = true;

            const seed = JSON.parse(JSON.stringify(this.seed));

            if(!this.happen.time) {
                delete seed.time.happen;
            }
            else {
                seed.time.happen = {
                    timestamp: this.happen.time.valueOf(),
                    accuracy: this.happen.show_time ? 'second' : 'day',
                }
            }
            try {
                const res = await this.$api.seed.publish([seed])

                if(200 === res.code) {
                    this.$message.success('已发布');
                    this.edit_mode = false;
                } else {
                    this.$message.error(res.message);
                }
            }
            finally {
                this.publishing = false;
            }
        },
        async delete_seed() {
            await this.$api.seed.delete(this.seed.uri);
            this.$message.success('已删除');
            this.$emit('delete');
        },
        init_data() {
            this.seed = {
                uri: `seed://${uuid.v1()}`,
                time: {
                    create: new Date().getTime(),
                },
                body: {
                    data: '',
                    type: 'text',
                },
                tags: [],
            }
        }
    },
    mounted() {
        if(!this.seed) {
            this.init_data();
        }
        if(this.seed.time.happen) {
            this.happen.time = new moment(this.seed.time.happen.timestamp);
        }
    }
}
</script>

<style>
.edit_or_save {
    float: right;
    position: relative;
    top: -8px;
    right: 10px;
    z-index: 999;
}
.publisher {
    float: right;
    position: relative;
    top: -15px;
    right: 10px;
    z-index: 999;
}
.delete {
    color: gray;
    float: right;
    position: relative;
    top: -10px;
    right: 10px;
    z-index: 999;
}
</style>