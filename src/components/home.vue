<template>
    <div id='home'>
        <div style="margin:20px"></div>
        <a-layout>
            <a-layout-content>
                <editor/>
                <div id='divider'>
                    <a-divider />
                </div>
                <result/>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script>
import editor from './editor.vue'
import result from './result.vue'

export default {
    components: {
        editor,
        result,
    }
}
</script>

<style>
#divider {
    width: 720px;
    margin: 0 auto;
}
.ant-layout-sider {
    background: #fff;
}
.ant-layout-content {
    background: #fff;
}
</style>