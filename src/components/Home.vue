<template lang="html">
  <div>
    <h1>{{$store.state.num}}</h1>
    <button type="button" name="button" @click="btnClick">+5</button>
  </div>
</template>

<script>
export default {
  computed: {
    getTitle () {
      return this.$store.getters.getTitle +"123"
    }
  },
  methods: {
    btnClick () {
      this.$store.dispatch('plusSome',5)
    }
  }
}
</script>

<style lang="css">
</style>
