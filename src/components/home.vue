<template>
    <div id='home'>
        <a-layout>
            <a-layout-content>
                <editor/>
                <a-divider/>
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
#home {
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