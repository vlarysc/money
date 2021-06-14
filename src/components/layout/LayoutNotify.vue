<template>
  <div :class="`alert-${tipo}`" class="alert alert-dismissible fade show" v-if="show">
  {{ menssagem }}
  <button type="button" class="btn-close" @click="close()"></button>
  <span>&times;</span>
</div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      tipo: 'danger',
      menssagem: '',
      timeOut: 0
    }
  },
  created () {
    this.$root.$on('Notify::show', item => {
      this.show = true
      this.tipo = item.tipo
      this.menssagem = item.menssagem

      setTimeout(() => {
        this.close()
      }, item.timeOut || 4000)
    })
  },
  methods: {
    close () {
      this.menssagem = ''
      this.tipo = 'danger'
      this.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  top: 20px;
  right: 15px;
  z-index: 1000;
  position: absolute;
  max-width: 400px;
}
</style>
