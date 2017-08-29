<template lang="html">
  <div class="tt">
    <form>
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
            <td v-for="(row,id) in t">{{t[id]}}</td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>
</template>

<script>
export default {
  props:['table']
}
</script>

<style lang="css" scoped>
.tt {
  margin-top: 30px;
}
</style>
