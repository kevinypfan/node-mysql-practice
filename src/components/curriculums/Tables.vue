<template lang="html">
<div>
  <app-alert v-if="getAlertBox" title="確認是否刪除" :description="$route.params.id" @result="deleteTable"></app-alert>
  <ul class="nav nav-tabs">
    <router-link v-for="t in tabsLink" :to="t.link" :key="t.Tables_in_nodedata" tag="li">
      <a class="nav-link" activeClass="active">{{t.Tables_in_nodedata}}</a>
    </router-link>
  </ul>
  <app-table :table="table"></app-table>
  <button type="button" name="button" @click="deleteAlert">刪除</button>
</div>
</template>

<script>
import Table from './Table.vue'
import Alert from '../Alert.vue'
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
    appTable: Table,
    appAlert: Alert
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
    },
    getAlertBox() {
      return this.$store.getters.getAlertBox
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
  },
  methods: {
    deleteTable(result) {
      if (result.click) {
        this.$store.dispatch('deleteTable', result.description)
          .then((result) => {
            // console.log(this.tabs)
            this.tabs = this.tabs.filter((t) => {
              console.log(t)
              return t.Tables_in_nodedata !== result
            })
            // console.log(this.tabs)
            this.$router.push(`/tables/${this.tabs[0].Tables_in_nodedata}`)
          }).catch((err) => {
//dew
          })
      }
    },
    deleteAlert() {
      this.$store.dispatch('showAlertBox', true)
    }
  }
}
</script>

<style lang="css">
</style>
