<template lang="html">
  <div class="mask">
    <div class="alertBox">
      <div class="top">{{title}}
        <button @click="clickBack">X</button>
      </div>
      <div class="mid">{{description}}</div>
      <div class="bottom">
        <button @click="clickYes">yes</button>
        <button @click="clickNo">no</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title','description'],
  methods: {
    clickYes() {
      this.$emit('result', {click: true, description: this.description})
      this.$store.dispatch('showAlertBox', false)
    },
    clickNo() {
      this.$emit('result', {click: false})
      this.$store.dispatch('showAlertBox', false)
    },
    clickBack() {
      this.$emit('result', {click: false})
      this.$store.dispatch('showAlertBox', false)
    }
  }
}
</script>

<style lang="css" scoped>
.mask {
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}
.mask .alertBox {
  background-color: #fff;
  height: 360px;
  width: 450px;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  padding: 15px;
}
.mask .alertBox .top {
  height: 12%;
  border-bottom: 1px solid #000;
  position: relative;
  font-size: 24px;
  letter-spacing: 5px;
  word-wrap: break-word;
}
.mask .alertBox .top button {
  position: absolute;
  right: 10px;
  font-size: 20px;
}
.mask .alertBox .mid {
  height: 70%;
  word-wrap: break-word;
}
.mask .alertBox .bottom {
height: 18%;
position: relative;
}
.mask .alertBox .bottom button {
position: relative;
left: 70%;
padding: 8px 16px;
margin-right: 10px;
top: 12px;
}

</style>
