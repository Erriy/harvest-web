<template>
  <div id="app">
    <seed></seed>
    <div style='margin:1000px'></div>
    <regist></regist>
    <div style='margin:100px'></div>
    <login></login>
  </div>
</template>

<script>
import regist from './components/regist.vue'
import login from './components/login.vue'
import seed from './components/seed.vue';

export default {
  name: 'App',
  components: {
    regist,
    login,
    seed,
  }
}
</script>

<style>
</style>
