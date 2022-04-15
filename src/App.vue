<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    name: 'App',
    components: {
    },
    mounted() {
        this.$api.user.already_login().then(logined => {
            if(logined) {
                this.$message.success('已登录');
                this.$router.push('/home');
            }
        });
    }
}
</script>

<style>
</style>
