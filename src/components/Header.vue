<template lang="html">
  <nav class="navbar navbar-expand-sm navbar-light bg-light">
    <div class="container">
      <router-link to="/" tag="a" class="navbar-brand">Home</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link v-for="m in menuItem" :to="m.link" tag="a" class="nav-item nav-link">{{m.title}}</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  data () {
    return {
      menuItem: [
        {title: "Create Table", link: '/createtable'}
      ]
    }
  }
}
</script>

<style lang="css">
</style>
