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
  
  }
}
</script>

<style lang="css">
</style>
