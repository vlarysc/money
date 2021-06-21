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
          <q-tab name="cadastro" flat class="q-mr-xs q-mt-xs " label="Dados" icon="app_registration" />
          <q-tab name="endereco" class="q-mr-xs q-mt-xs " label="Endereço" icon="place" />
          <q-tab
            v-if="!!empresa.id"
            name="contato"
            flat
            class="q-mr-xs q-mt-xs "
            label="Contatos"
            icon="contact_page"
          />
          <q-tab v-if="!!empresa.id" name="parcela" flat class="q-mr-xs q-mt-xs " label="Parcelas" icon="payment" />

          <q-space />
        </q-tabs>
        <q-tab-panels
          v-model="tab"
          class="q-ma-none"
          animated
          swipeable
          vertical
          transition-prev="jump-up"
          transition-next="jump-up"
        >
          <q-tab-panel style="text-align: right;" name="cadastro">
            <EmpresaForm ref="EmpresaForm"></EmpresaForm>

            <q-space />

            <q-page-sticky position="bottom-right" :offset="[18, 18]">
              <div class=" row q-pa-xs q-gutter-xs" style="text-align: right;">
                <q-btn
                  label="Salvar"
                  v-if="!empresa.id"
                  color="blue-8"
                  type="submit"
                  text-color="white"
                  @click="save()"
                  size="md"
                ></q-btn>
                <q-btn
                  label="Salvar"
                  v-if="empresa.id"
                  color="blue-8"
                  type="submit"
                  text-color="white"
                  size="md"
                  @click="update()"
                ></q-btn>
                <q-btn label="Voltar" class="btnLateral" color="grey-6" text-color="white" @click="back"></q-btn>
              </div>
            </q-page-sticky>
          </q-tab-panel>

          <q-tab-panel name="endereco">
            <EmpresaEnderecos></EmpresaEnderecos>
          </q-tab-panel>

          <q-tab-panel name="contato">
            <ContatosTable></ContatosTable>
          </q-tab-panel>

          <q-tab-panel name="parcela">
            <ParcelaTable></ParcelaTable>
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import EmpresaEnderecos from "./enderecos/EmpresaEnderecos";
import EmpresaForm from "./EmpresaForm";
import ParcelaTable from "./parcelas/ParcelaTable";
import ContatosTable from "./contatos/ContatosTable";
import pageMain from "src/components/pageMain.vue";

export default {
  name: "EmpresaBotoes",
  components: { EmpresaEnderecos, ContatosTable, ParcelaTable, EmpresaForm, pageMain },
  async beforeMount() {},
  data() {
    return { tab: "cadastro" };
  },
  computed: {
    ...mapState("empresa", ["empresa"])
  },
  methods: {
    ...mapActions("empresa", ["getEmpresas", "postEmpresa", "putEmpresa"]),

    //fazer um if na tag para apenas aparecer o botão adicionar se tiver um cep
    async save() {
      if (this.empresa.pessoa.enderecos.length > 0) {
        this.tab = "cadastro";
        this.$refs.EmpresaForm.$refs.myForm.validate().then(async (success) => {
          if (success) {
            await this.postEmpresa(this.empresa);
            console.log(this.$route);
            this.$router.push(`/empresas?page=${this.$route.query.page}&size=${this.$route.query.size}`);
          } else {
            this.$q.notify("Por favor informe obrigatórios da Empresa");
          }
        });
      } else {
        this.tab = "endereco";
        this.$q.notify("Por favor informe pelo menos um endereço");
      }
    },

    back() {
      this.$router.push(`/empresas?page=${this.$route.query.page}&size=${this.$route.query.size}`);
    },

    async update() {
      await this.putEmpresa({ id: this.empresa.id, payload: this.empresa });
      console.log(this.$route.query.page);
      this.$router.push(`/empresas?page=${this.$route.query.page}&size=${this.$route.query.size}`);
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
