<template lang="html">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link to="/" tag="a" class="navbar-brand">Home Page</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <router-link v-for="m in menuItem" :to="m.link" :key="m.title" class="nav-item" tag="li" activeClass="active">
            <a class="nav-link" href="#">{{m.title}}</a>
          </router-link>
          <!-- <li class="nav-item">
            <a class="nav-link" href="#">Features</a>
          </li> -->
        </ul>
      </div>
    </div>
</nav>
</template>

<script>
export default {
  data () {
    return {
      isLogin: false
    }
  },
  computed: {
    menuItem () {
      var menuItem = [
        {title: "Creat Table", link:'/createTable'},
        {title: "Insert Table", link:'/insertTable'},
        {title: "Tables", link:'/tables'}
      ];
      if (this.isLogin) {
        return menuItem
      } else {
        return [{title: "Creat Table", link:'/createTable'}]
      }
    }
  }
}
</script>

<style lang="css">
</style>
