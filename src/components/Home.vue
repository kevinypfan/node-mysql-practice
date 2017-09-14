<template lang="html">
  <h1>{{title}}</h1>
</template>

<script>
export default {
  computed: {
    title () {
      return this.$store.getters.getTitle
    }
  },
  created() {
    this.axios.get('/test').then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err.request.response)
    })
  }
}
</script>

<style lang="css">
</style>
