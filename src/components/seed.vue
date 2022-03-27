<template>
    <div id='seed'>
        <a-date-picker
            v-model="seed.time.happen"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            placeholder="事件发生时间"
        />
        <div style="margin:20px"></div>
        <a-tag
            v-for="(tag, ti) in seed.tags"
            :index="ti"
            :key="tag"
            closable
            @close='remove_tag(tag)'
        >
            {{tag}}
        </a-tag>

        <div style="margin:10px"></div>
        <a-input
            v-if="status.new_tag.input.show"
            ref="new_tag_input"
            type="text"
            size="small"
            v-model="status.new_tag.input.text"
            @blur="status.new_tag.input.show=false; status.new_tag.input.text='';"
            @keyup.enter="confirm_new_tag"
            :style="{ width: '78px', height: '21px', 'margin-right': '9px' }"
            :value="status.new_tag.input.text"
        />
        <a-tag
            v-else-if="status.new_tag.show"
            style="background: #fff; borderStyle: dashed;"
            @click="show_new_tag_input"
        >
            <a-icon type="plus" />
        </a-tag>

        <div style="margin:20px"></div>
        <a-textarea
            v-model="seed.body.data"
            style='width:400px;height:200px'
            placeholder="请输入内容"
            :auto-size="{ minRows: 3, maxRows: 5 }"
        />

        <div style="margin:20px"></div>
        <a-button
            type="primary"
            @click="publish"
            :loading='status.loading'
        >
            保存
        </a-button>
    </div>
</template>

<script>
const uuid = require('uuid');
export default {
    data() {
        return {
            status: {
                new_tag: {
                    show: true,
                    input: {
                        show: false,
                        text: '',
                    },
                },
                loading: false,
            },
            seed: {
                uri: `harvest://seed/${uuid.v1().split('-').slice(0, 4).join('')}`,
                time: {
                    happen: null,
                    create: new Date().getTime(),
                    update: null,
                },
                body: {
                    type: 'text',
                    data: '',
                },
                tags: [],
            }
        }
    },
    methods: {
        async publish() {
            this.status.loading = true;
            try{
                const res = await this.$api.seed.publish([this.seed])
                if(200 === res.code) {
                    this.$message.success('保存成功');
                } else {
                    this.$message.error(res.message);
                }
            }
            finally{
                this.status.loading = false;
            }
        },
        show_new_tag_input() {
            this.status.new_tag.input.show = true;
            this.$nextTick(function() {
                this.$refs['new_tag_input'].focus();
            });
        },
        remove_tag(tag) {
            this.seed.tags = this.seed.tags.filter(t => t !== tag);
        },
        confirm_new_tag() {
            if(this.seed.tags.includes(this.status.new_tag.input.text)) {
                this.$message.error('标签已存在');
                return;
            }
            this.seed.tags.push(this.status.new_tag.input.text);
            Object.assign(
                this.status.new_tag.input,
                {
                    text: '',
                    show: false,
                }
            );
        },
    }
}
</script>

<style>
#seed {
    width: 600px,
}
</style>