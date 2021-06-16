<template>
  <div>
    <div class="navegacao-meses">
    <div v-for="(mes, i) in grupoMeses"
     :key="i"
     @click="setMesSelecionado(mes)"
     class="meses-link"
      :class="{active: mes.mes == mesSelecionado.mes}">
      <div class="lebel-mes"> {{ mes.mes }} </div>
      <div class="lebel-valor" v-money-format="mes.total" />
    </div>
  </div>
  <div class="container-grupo">
    <div class="container">
    <div v-if="mesSelecionado.data && !mesSelecionado.data.length"> Você não cadastrou nada este mês</div>
    <template v-else>
    <MoneyDetalhes v-for="(item, i) in mesSelecionado.data" :key="i" :data="item" />
    </template>
  </div>
  </div>
  </div>
</template>

<script>
import groupBy from 'lodash.groupby'
import moment from 'moment'
import MoneyDetalhes from './MoneyDetalhes.vue'
export default {
  name: 'ListaGastos',
  components: {
    MoneyDetalhes
  },
  data () {
    return {
      money: [],
      mesSelecionado: {}
    }
  },
  created () {
    this.getDados()
  },
  mounted () {
    this.setMesSelecionado()
  },
  computed: {
    grupoMeses () {
      let grupoMeses = []

      const mesAtual = () => {
        grupoMeses.push({
          data: [],
          total: 0,
          mes: moment().format('MM/YYYY')
        })
      }

      if (this.money.length) {
        const meses = groupBy(this.money, i => {
          return moment(i.createdAt).format('MM/YYYY')
        })

        const sortMes = Object.keys(meses).sort((a, b) => {
          if (moment(`${a} 01`, 'MM/YYYY HH').isBefore(moment(`${b} 01`, 'MM/YYYY HH'))) {
            return -1
          } else {
            return +1
          }
        })

        grupoMeses = sortMes.map(mes => ({
          mes,
          data: meses[mes],
          total: meses[mes].map(i => +i.valor).reduce((a, c) => a + c, 0)
        }))

        const ultimoMes = moment(grupoMeses[grupoMeses.length - 1].mes, 'MM/YYYY')

        if (!ultimoMes.isSame(moment(), 'mes')) {
          mesAtual()
        }
      } else {
        mesAtual()
      }
      return grupoMeses
    }
  },
  methods: {
    getDados () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)
      ref.on('value', data => {
        const values = data.val()
        this.money = Object.keys(values).map(i => values[i])
      })
    },
    setMesSelecionado (mes = null) {
      this.mesSelecionado = mes || this.grupoMeses[this.grupoMeses.length - 1]
    }

  }

}
</script>

<style lang="scss" scoped>
.navegacao-meses {
  display: flex;
  margin-left: -12px;
  height: 11vh;
  width: calc(102% + 4.2px);
  overflow: hidden;
  background-color: var(--featured-dark);
  .meses-link {
    padding: 15px;
    cursor: pointer;
    transition: 0.6s;
    text-align: center;
    &.active {
      background-color: var(--featured);
    }
    &:hover {
      background-color: var(--featured);
      color: var(--darker);
    }
    .lebel-valor {
      color: rgb(71, 71, 71);
      font-size: 8pt;
    }
  }
}
.container-grupo {
  overflow: hidden auto;
  margin-left: -11px;
  width: calc(100% + 23px);
  height: calc(100vh - 69px);
}
.container {
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 15pt;
}
</style>
