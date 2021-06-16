<template>
  <div class="home">
    <div class="row">
      <div class="col-6 home-box">
        <small>Você gastou: </small>
        <div class="money" v-money-format="totais.totalGasto" />
        <small v-if="money.length">Em {{ money.length }} compras</small>
        <template v-else>
          <small></small>
           </template>
      </div>
      <div class="col-6 home-box">
        <small>Maior compra: </small>
        <div class="money" v-money-format="totais.maior.valor" />
        <small v-if="money.length" v-date-format="totais.maior.createdAt"></small>
        <template v-else>
          <small></small>
           </template>
      </div>
      <div class="col-6 home-box">
        <small>Menor Compra: </small>
        <div class="money" v-money-format="totais.menor.valor" />
        <small v-if="money.length" v-date-format="totais.menor.createdAt"></small>
        <template v-else>
          <small></small>
           </template>
      </div>
      <div class="col-6 home-box">
        <small>Média de gastos:</small>
       <div class="money" v-money-format="totais.media" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      money: []
    }
  },
  computed: {
    totais () {
      const money = this.money

      const res = {
        totalGasto: 0,
        media: 0,
        maior: {},
        menor: {}
      }
      if (money.length) {
        res.totalGasto = money.map(e => parseFloat(e.valor))
          .reduce((acumulador, vAtual) => acumulador + vAtual, 0)

        res.media = res.totalGasto / money.length

        res.menor = money.sort((a, b) => parseFloat(a.valor) - parseFloat(b.valor))[0]

        res.maior = money.sort((a, b) => parseFloat(b.valor) - parseFloat(a.valor))[0]
      }
      return res
    }
  },
  created () {
    this.getDados()
  },
  methods: {
    getDados () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)
      ref.on('value', data => {
        const values = data.val()
        this.money = Object.keys(values).map(i => values[i])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 15px;
  .home-box {
    display: flex;
    font-size: 30px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(50vh - 15px);
    border: 3px solid var(--ligther);
    small {
      font-size: 1.3rem;
    }
    .money {
      color: var(--featured);
    }
    &:nth-child(2),
    :nth-child(4) {
      border-left: none;
    }
    &:nth-child(3),
    :nth-child(4) {
      border-top: none;
    }
    &:nth-child(4) {
      border-left: none;
      border-top: none;
    }
  }
}
</style>
