<template lang="html">
  <div class="createTable">
    <form @submit.prevent="createTable">
      <div class="row">
        <div class="col-8">
          <input class="form-control form-control-lg" type="text" placeholder="table name" v-model="tableName" id="tableName">
        </div>
        <div class="col-4">
            <input class="btn btn-outline-primary" type="submit" value="Submit">
        </div>
      </div>
    </form>
    <pre>{{getNewTable}}</pre>
  </div>
</template>
<script>
export default {
  data () {
    return {
      tableName: ""
    }
  },
  methods: {
    createTable () {
      this.$store.dispatch('createTable', {tableName: this.tableName})
    }
  },
  computed: {
    getNewTable () {
      return this.$store.getters.getNewTable
    }
  },
  watch: {
    getNewTable (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/insert')
      }
    }
  }
}
</script>

<style lang="css" scoped>
.createTable {
  margin-top: 30px;
}

</style>
