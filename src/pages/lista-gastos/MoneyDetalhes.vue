<template>
  <div class="money-detalhes row">
    <div class="col-10">
      <div class="descricao">
        <span>{{ data.descricao }}</span>
    <button @click="showRecibo()" v-if="data.recibo" class="btn btn-sm btn-outline-primary">
      <i class="fa fa-paperclip"></i>
      Ver comprovante
       </button>
         </div>
    <small v-date-format="data.createdAt" />
    </div>
    <div class="col-2" v-money-format="data.valor" />
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  methods: {
    showRecibo () {
      window.open(this.data.recibo, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
small {
  font-size: 0.8rem;
}
.money-detalhes {
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 1px solid var(--dark-medium);
  .descricao {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
