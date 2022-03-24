<template>
  <div id="app">
    <regist></regist>
    <div style='margin:100px'></div>
    <login></login>
  </div>
</template>

<script>
import regist from './components/regist.vue'
import login from './components/login.vue'

export default {
  name: 'App',
  components: {
    regist,
    login,
  }
}
</script>

<style>
</style>
