<template lang="html">
  <div class="InsertTable">
    <h3>Table: {{getNewTable}}</h3>
    <form action="submit" @submit.prevent="sendTable">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>#</th>
          <th>Monday</th>
          <th>Tuesday</th>
          <th>Wednesday</th>
          <th>Thursday</th>
          <th>Friday</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(t,i) in table">
          <th scope="row">{{i+1}}</th>
          <td v-for="(row,id) in t">
            <input type="text" v-model="t[id]"/>
          </td>
        </tr>
      </tbody>
    </table><input class="btn btn-outline-primary" type="submit" value="Submit">
  </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      table: [
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','',''],
        ['','','','','']
      ]
    }
  },
  methods: {
   sendTable() {
     this.$store.dispatch('insertTable', {values: this.table, tableName: this.$store.getters.getNewTable})
      .then(() => {
        this.$router.push(`/tables/${this.$store.getters.getNewTable}`)
      }).catch(() => {
        console.log('失敗')
      })
     }
   },
   computed: {
     getNewTable () {
       return this.$store.getters.getNewTable
     }
   }
}
</script>

<style lang="css" scoped>
  .InsertTable{
    margin-top: 30px;
  }
</style>
