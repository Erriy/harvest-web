<template>
    <div id="regist">
        <a-input ref="userNameInput" v-model="username" placeholder="请输入用户名">
            <a-icon slot="prefix" type="user" />
        </a-input>
        <div style="margin:20px"></div>
        <a-input-password v-model="password1" placeholder="请输入密码">
            <a-icon slot="prefix" type="lock" />
        </a-input-password>
        <div style="margin:10px"></div>
        <a-input-password v-model="password2" placeholder="请确认密码">
            <a-icon slot="prefix" type="lock" />
        </a-input-password>
        <div style="margin:20px"></div>
        <a-input v-model="invite_code" placeholder="请输入邀请码">
            <a-icon slot="prefix" type="user-add" />
        </a-input>
        <div style="margin:20px"></div>
        <a-button style="width:400px" type="primary" :loading='loading' @click="regist">注册</a-button>
        <div style="margin:10px"></div>
        <div style="float:right;">
            <router-link to="/login">已有账号？点击登录</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password1: '',
            password2: '',
            invite_code: '',
            loading: false,
        }
    },
    methods: {
        async regist() {
            if (this.username == '') {
                this.$message.error('请输入用户名');
                return;
            }
            if (this.password1 == '') {
                this.$message.error('请输入密码');
                return;
            }
            if (this.password1 != this.password2) {
                this.$message.error('两次密码不一致');
                return;
            }
            if (this.invite_code == '') {
                this.$message.error('请输入邀请码');
                return;
            }
            this.loading = true;
            try {
                const res = await this.$api.user.regist({
                    username: this.username,
                    password: this.password1,
                    invite_code: this.invite_code
                });
                if(200 === res.code) {
                    this.$message.success('注册成功');
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
#regist{
    width: 400px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
}
</style>