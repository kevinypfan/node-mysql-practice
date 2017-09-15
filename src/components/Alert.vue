<template lang="html">
  <transition name="fade" mode="out-in">
    <div class="mask">
      <transition name="slide">
        <div class="alertBox" v-if="show">
          <div class="top">{{title}}
            <button @click="clickBack">X</button>
          </div>
          <div class="mid">{{description}}</div>
          <div class="bottom">
            <button @click="clickYes">yes</button>
            <button @click="clickNo">no</button>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  props: ['title','description'],
  data () {
    return {
      show: false
    }
  },
  methods: {
    clickYes() {
      this.$emit('result', {click: true, description: this.description})
      this.$store.dispatch('showAlertBox', false)
    },
    clickNo() {
      this.show = false
      this.$emit('result', {click: false})
      this.$store.dispatch('showAlertBox', false)
    },
    clickBack() {
      this.show = false
      this.$emit('result', {click: false})
      this.$store.dispatch('showAlertBox', false)
    }
  },
  mounted () {
    this.show = true
  }
}
</script>

<style lang="css" scoped>
.fade-enter-active, .fade-leave-active {
  transition: .8s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.slide-enter-active {
  animation: slide-in .8s ease-out forwards;
  transition: .8s;
}
.slide-leave-active {
  transform: translateY(-400px);
  transition: .8s;
}

.slide-leave-to {
  transform: translateY(-400px);
}

@keyframes slide-in {
        from {
            transform: translateY(-400px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

@keyframes slide-out {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-400px);
        opacity: 0;
    }
}

    .mask {
      background-color: rgba(0, 0, 0, 0.3);
      position: fixed;
      height: 100vh;
      width: 100vw;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
          -ms-flex-pack: center;
              justify-content: center;
      -webkit-box-align: center;
          -ms-flex-align: center;
              align-items: center;
      top: 0;
      left: 0;
    }
    .mask .alertBox {
      background-color: #fff;
      height: 360px;
      width: 450px;
      border-radius: 10px;
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
