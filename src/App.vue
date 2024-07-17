<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" rel="stylesheet">
  <Navigation style="height: 100%; width: 100%; position: absolute;"/>
</template>

<script>
import Navigation from './components/Navigation.vue'
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


export default {
  name: 'App',
  components: {
    Navigation
  }
}
</script>

<style scoped>
#app {
  font-family: Arial, sans-serif;
}
</style>