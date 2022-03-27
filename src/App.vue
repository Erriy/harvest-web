<template>
  <div id="app">
    <seed_list></seed_list>
    <div style='margin:300px'></div>
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
import seed_list from './components/list.vue';

export default {
  name: 'App',
  components: {
    regist,
    login,
    seed,
    seed_list,
  }
}
</script>

<style>
</style>
