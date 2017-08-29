<template lang="html">
<div>
  <ul class="nav nav-tabs">
    <router-link v-for="t in tabsLink" :to="t.link" :key="t.Tables_in_nodedata" tag="li">
      <a class="nav-link" activeClass="active">{{t.Tables_in_nodedata}}</a>
    </router-link>
  </ul>
  <app-table :table="table"></app-table>
</div>
</template>

<script>
import Table from './Table.vue'
export default {
  data () {
    return {
      table: [],
      tabs: []
    }
  },
  created () {
    this.axios.get(`/tabledata/${this.$route.params.id}`).then((result) => {
      this.table = result.data
    }).catch((err) => {
      console.log(err);
    })
    this.axios.get('/tablename').then((result) => {
      this.tabs = result.data
    }).catch((err) => {
      console.log(err);
    })
  },
  components: {
    appTable: Table
  },
  computed: {
    getParams () {
      return this.$route.params.id
    },
    tabsLink () {
      return this.tabs.map((t) => {
        t.link = `/tables/${t.Tables_in_nodedata}`
        return t
      })
    }
  },
  watch: {
    getParams(value) {
      this.axios.get(`/tabledata/${this.$route.params.id}`).then((result) => {
        this.table = result.data
      }).catch((err) => {
        console.log(err);
      })
    }
  }
}
</script>

<style lang="css">
</style>
