<template>
  <q-form ref="grupoValid" @submit="salvar()" class="q-gutter-md">
    <div class="q-xl">
      <div v-if="$q.screen.xs">
        <div class="row">
          <div class="q-pt-xs col-xs-12 col-md-9">
            <q-input
              outlined
              class="q-pa-xs"
              v-model="grupo.descricao"
              unmasked-value
              label="Descrição"
              :rules="[val => !!val || 'Campo obrigatório']"
            />
          </div>
        </div>
        <div class="row ">
          <div class="q-pt-xs  col-xs-12 col-md-4">
            <q-input
              outlined
              class="q-pa-xs"
              v-model="grupo.codigo"
              unmasked-value
              :rules="[val => !!val || 'Campo obrigatório']"
              label="Código"
            />
          </div>
          <div class="q-pt-xs col-xs-12 col-md-4">
            <q-money
              class="q-pa-xs"
              :rules="[val => !!val || 'Campo obrigatório']"
              v-model="grupo.valor_adesao"
              v-bind="moneyFormatForComponent"
              unmasked-value
              label="Valor da adesão *"
            />
          </div>
          <div class="q-pt-xs col-xs-12 col-md-4">
            <q-number
              class="q-pa-xs"
              v-model="grupo.qtde_adesao"
              unmasked-value
              label="Quantidade de adesão"
            />
          </div>
        </div>
        <div class="row ">
          <div class="q-pa-xs col-xs-12 col-md-12">
            <q-select
              outlined
              class="q-pa-xs"
              v-model="grupo.filial_id"
              :options="filiais.results"
              option-value="id"
              :option-label="filial => filial.pessoa.nome"
              label="Filial"
              emit-value
              map-options
            />
          </div>
        </div>
        <div class="row">
          <div class="q-pa-xs col-xs-12 col-md-6">
            <div>
              <q-toggle
                class="q-pa-xs"
                v-model="grupo.lanca_adesao_paga"
                false-value="N"
                true-value="S"
                checked-icon="check"
                unchecked-icon="clear"
                label="Lançar adesão Paga"
              />
            </div>
          </div>
          <div class="q-pa-xs col-xs-12 col-md-6">
            <div>
              <q-toggle
                class="q-pa-xs"
                false-value="N"
                true-value="S"
                v-model="grupo.debito_cluz"
                checked-icon="check"
                unchecked-icon="clear"
                label="Debito conta de luz"
              />
            </div>
          </div>
          <div class="q-pa-xs col-xs-12 col-md-6">
            <div>
              <q-toggle
                false-value="N"
                true-value="S"
                class="q-pa-xs"
                v-model="grupo.debito_recorrencia"
                checked-icon="check"
                unchecked-icon="clear"
                label="Debito Recorrência"
              />
            </div>
          </div>
          <div class="q-pa-xs col-xs-12 col-md-6">
            <div>
              <q-toggle
                false-value="N"
                true-value="S"
                class="q-pa-xs"
                v-model="grupo.plano_empresa"
                checked-icon="check"
                unchecked-icon="clear"
                label="Plano Empresa"
              />
            </div>
          </div>
          <div class="q-pa-xs col-xs-12 col-md-6">
            <div>
              <q-toggle
                false-value="N"
                true-value="S"
                class="q-pa-xs"
                v-model="grupo.lanca_ortopedico_agrupado"
                checked-icon="check"
                unchecked-icon="clear"
                label="Lançar ortopedico agrupado"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="row q-pa-xs">
          <div class=" q-pt-xs col-xs-12 col-md-12">
            <q-input
              outlined
              class="q-pa-xs"
              v-model="grupo.descricao"
              unmasked-value
              label="Descrição"
              :rules="[val => !!val || 'Campo obrigatório']"
            />
          </div>
        </div>
        <div class="row q-pa-xs">
          <div class="q-pt-xs  col-xs-12 col-md-4">
            <q-input
              outlined
              class="q-pa-xs"
              v-model="grupo.codigo"
              unmasked-value
              label="Código"
              :rules="[val => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="q-pt-xs col-xs-12 col-md-4">
            <q-money
              class="q-pa-xs"
              :rules="[val => !!val || 'Campo obrigatório']"
              v-model="grupo.valor_adesao"
              v-bind="moneyFormatForComponent"
              unmasked-value
              label="Valor da adesão *"
            />
          </div>
          <div class=" q-pt-xs col-xs-12 col-md-4">
            <q-number
              class="q-pa-xs"
              v-model="grupo.qtde_adesao"
              unmasked-value
              label="Quantidade de adesão"
            />
          </div>
        </div>
        <div class="row">
          <div class="q-pa-xs col-xs-12 col-md-12">
            <q-select
              outlined
              class="q-pa-xs"
              v-model="grupo.filial_id"
              :options="filiais.results"
              option-value="id"
              :option-label="filial => filial.pessoa.nome"
              label="Filial"
              emit-value
              map-options
            />
          </div>
        </div>
        <div class="row">
          <div class="q-pa-xs col-xs-12 col-md-6">
            <div>
              <q-toggle
                false-value="N"
                true-value="S"
                class="q-pa-xs"
                v-model="grupo.lanca_adesao_paga"
                checked-icon="check"
                unchecked-icon="clear"
                label="Lançar adesão Paga"
              />
            </div>
          </div>
          <div class="q-pa-xs col-xs-12 col-md-6">
            <div>
              <q-toggle
                false-value="N"
                true-value="S"
                class="q-pa-xs"
                v-model="grupo.debito_cluz"
                checked-icon="check"
                unchecked-icon="clear"
                label="Debito conta de luz"
              />
            </div>
          </div>
          <div class="q-pa-xs col-xs-12 col-md-6">
            <div>
              <q-toggle
                false-value="N"
                true-value="S"
                class="q-pa-xs"
                v-model="grupo.debito_recorrencia"
                checked-icon="check"
                unchecked-icon="clear"
                label="Debito Recorrência"
              />
            </div>
          </div>
          <div class="q-pa-xs col-xs-12 col-md-6">
            <div>
              <q-toggle
                false-value="N"
                true-value="S"
                class="q-pa-xs"
                v-model="grupo.plano_empresa"
                checked-icon="check"
                unchecked-icon="clear"
                label="Plano Empresa"
              />
            </div>
          </div>
          <div class="q-pa-xs col-xs-12 col-md-6">
            <div>
              <q-toggle
                false-value="N"
                true-value="S"
                class="q-pa-xs"
                v-model="grupo.lanca_ortopedico_agrupado"
                checked-icon="check"
                unchecked-icon="clear"
                label="Lançar ortopedico agrupado"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="q-pl-xs q-pa-xs q-pt-md" style="text-align: right;">
      <q-btn
        v-if="!grupo.id"
        label="Finalizar"
        @click="salvar"
        class="add-row"
        color="blue-8"
        text-color="white"
      />
      <q-btn
        v-else
        label="Atualizar"
        @click="atualizar()"
        class="add-row"
        color="blue-8"
        text-color="white"
      />
    </div>
  </q-form>
</template>

<script>
import { mapActions, mapState } from "vuex";
import qNumber from "src/components/qNumber";
import qMoney from "src/components/qMoney";

export default {
  name: "grupo",
  components: { qMoney, qNumber },
  props: ["newGrupo"],
  mounted() {
    //if (this.$store.state.filial.filiais.length > 0)
    this.getFiliais();
  },
  computed: {
    ...mapState("grupo", ["grupos"]),
    ...mapState("filial", ["filiais"])
  },
  data() {
    return {
      id: this.$store.state.filial.filial.id,

      grupo: JSON.parse(JSON.stringify(this.newGrupo)),

      moneyFormatForComponent: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        suffix: "",
        precision: 2,
        masked: false
      }
    };
  },

  methods: {
    ...mapActions("filial", ["getFiliais"]),
    ...mapActions("grupo", ["getGrupos", "postGrupo", "putGrupo"]),
    async salvar() {
      await this.$refs.grupoValid.validate().then(success => {
        if (success) {
          this.$emit("salvar", this.grupo);
        } else {
          this.$q.notify({
            message: "Preencha todos os campos Obrigatórios!",
            color: "black"
          });
        }
      });
    },
    async atualizar() {
      this.$refs.grupoValid.validate().then(async success => {
        if (success) {
          await this.$emit("atualizar", this.grupo);
        } else {
          this.$q.notify({
            message: "Preencha todos os campos Obrigatórios!",
            color: "black"
          });
        }
      });
    }
  }
};
</script>

<style>
.card-carencias {
  display: flex;
  padding: none;
  justify-content: space-between;
}
.toggle {
  flex-wrap: nowrap;
}
.q-field--auto-height.q-field--dense.q-field--labeled
  .q-field__control-container {
  padding-top: 20px;
}
</style>
