<template>
  <div class=" q-pa-none  no-box-shadow no-outline">
    <div>
      <div class=" q-gutter-y-md">
        <q-tabs
          active-bg-color="blue-8"
          active-color="white"
          align="left"
          v-model="tab"
          class="bg-white text-grey-8 tabs"
          flat
          inline-label
          indicator-color="transparent"
          dense
        >
          <q-tab
            name="cadastro"
            flat
            class="q-mr-xs q-mt-xs "
            label="Dados"
            icon="app_registration"
          />
          <q-tab
            name="endereco"
            class="q-mr-xs q-mt-xs "
            label="Endereço"
            icon="place"
          />

          <q-space />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          class="q-ma-none"
          animated
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel style="text-align: right;" name="cadastro">
            <FilialForm ref="filialForm"></FilialForm>

            <q-space />

            <q-page-sticky position="bottom-right" :offset="[18, 33]">
              <div class=" row q-pa-xs q-gutter-xs" style="text-align: right;">
                <q-btn
                  label="Salvar"
                  v-if="!filial.id"
                  color="blue-8"
                  type="submit"
                  text-color="white"
                  @click="save()"
                  size="md"
                ></q-btn>
                <q-btn
                  label="Salvar"
                  v-if="filial.id"
                  color="blue-8"
                  type="submit"
                  text-color="white"
                  size="md"
                  @click="update()"
                ></q-btn>
                <q-btn
                  label="Voltar"
                  class="btnLateral"
                  color="grey-6"
                  text-color="white"
                  @click="back"
                ></q-btn>
              </div>
            </q-page-sticky>
          </q-tab-panel>

          <q-tab-panel name="endereco">
            <FilialEnderecos></FilialEnderecos>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import FilialEnderecos from "../enderecos/FilialEnderecos.vue";
import FilialForm from "./FilialForm";
/* import pageMain from "src/components/pageMain.vue"; */

export default {
  name: "FilialBotoes",
  components: {
    FilialForm,
    FilialEnderecos
    /* pageMain */
  },
  async beforeMount() {},
  data() {
    return { tab: "cadastro" };
  },
  computed: {
    ...mapState("filial", ["filial"])
  },
  methods: {
    ...mapActions("filial", ["getFiliais", "postFilial", "putFilial"]),

    //fazer um if na tag para apenas aparecer o botão adicionar se tiver um cep
    async save() {
      if (this.filial.pessoa.enderecos.length > 0) {
        this.tab = "cadastro";
        this.$refs.filialForm.$refs.myForm.validate().then(async success => {
          if (success) {
            await this.postFilial(this.filial);
            this.$router.push(
              `/filiais?page=${this.$route.query.page}&size=${this.$route.query.size}`
            );
          } else {
            this.$q.notify("Por favor informe obrigatórios da filial");
          }
        });
      } else {
        this.tab = "endereco";
        this.$q.notify("Por favor informe pelo menos um endereço");
      }
    },

    back() {
      this.$router.push(
        `/filiais?page=${this.$route.query.page}&size=${this.$route.query.size}`
      );
    },

    async update() {
      await this.putFilial({ id: this.filial.id, payload: this.filial });
      this.$router.push(
        `/filiais?page=${this.$route.query.page}&size=${this.$route.query.size}`
      );
    }
  }
};
</script>

<style lang="scss">
.btnLateral {
  margin-right: 30px;
  text-align: right;
}
.tabs {
  border-bottom: 1px solid;
  border-color: $indigo;
}
.tab {
  border: 1px solid;
  border-color: $grey-6;
  border-radius: 7px 7px 0px 0px;
}
</style>
