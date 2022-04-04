<template>
    <div id='login'>
        <a-input ref="userNameInput" v-model="username" placeholder="请输入用户名">
            <a-icon slot="prefix" type="user" />
        </a-input>
        <div style="margin:20px"></div>
        <a-input-password v-model="password" placeholder="请输入密码">
            <a-icon slot="prefix" type="lock" />
        </a-input-password>
        <div style="margin:20px"></div>
        <a-button style="width:400px" type="primary" :loading='loading' @click="login">登录</a-button>
        <div style='margin: 10px'></div>
        <div style='float:right'>
            <router-link to='/regist'>没有账号，开始注册</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
            loading: false,
        }
    },
    methods: {
        async login() {
            if (this.username == '') {
                this.$message.error('请输入用户名');
                return;
            }
            if (this.password == '') {
                this.$message.error('请输入密码');
                return;
            }
            this.loading = true;
            try {
                const res = await this.$api.user.login({
                    username: this.username,
                    password: this.password,
                });
                if(200 === res.code) {
                    this.$message.success('登录成功');
                    this.$router.push('/list');
                } else {
                    this.$message.error(res.message);
                }
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>

<style>
#login{
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
}
</style>