<template>
  <div id="app">
    <app-header></app-header>
    <div class="container">
      <div class="row">
        <router-view></router-view>
      </div>
    </div>

  </div>
</template>

<script>
import Header from './components/Header.vue'
export default {
  components: {
    appHeader: Header
  }
}
</script>

<style>

</style>
