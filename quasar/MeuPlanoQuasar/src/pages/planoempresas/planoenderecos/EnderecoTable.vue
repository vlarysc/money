<template>
  <div class="q-pa-xs">
    <q-table
      :grid="$q.screen.xs"
      :visible-grid="['option']"
      flat
      bordered
      dense
      class="bg-white"
      color="black"
      binary-state-sort
      :data="planoempresa.pessoa.enderecos"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <div class="q-pa-xs text-right">
              <q-btn
                size="xs"
                class="q-ma-none q-pa-none"
                color="grey-5"
                @click="del(props.row.id)"
                text-color="white"
                icon="delete_forever"
              />
            </div>
            <div class="row" @click="update(props.row)">
              <div class="col-6">
                <q-card-section class="text-left">
                  Endereço
                  <br />
                  <strong>{{ props.row.lagradouro }}</strong>
                </q-card-section>
              </div>
              <div class="col-6">
                <q-card-section class="text-left">
                  Bairro
                  <br />
                  <strong>{{ props.row.bairro }}</strong>
                </q-card-section>
              </div>
              <div class="row">
                <div class="col-9">
                  <q-card-section class="text-left">
                    Cidade
                    <br />
                    <strong>{{ props.row.cidade }}</strong>
                  </q-card-section>
                </div>
                <div class="col-3">
                  <q-card-section class="text-left">
                    Estado
                    <br />
                    <strong>{{ props.row.uf }}</strong>
                  </q-card-section>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </template>

      <template v-slot:body-cell-option="props">
        <q-td :props="props">
          <div class="q-pa-sm q-gutter-sm">
            <q-btn
              size="xs"
              class="q-ma-none q-pa-none q-mr-xs"
              color="blue-8"
              @click="update(props.row)"
              icon="create"
            />
            <q-btn
              size="xs"
              class="q-ma-none q-pa-none"
              color="red-8"
              @click="del(props.row)"
              text-color="white"
              icon="delete_forever"
            />
          </div>
        </q-td>
      </template>
    </q-table>

    <div>
      <div class="q-pa-none q-gutter-sm" style="text-align: right;">
        <q-form>
          <q-dialog
            v-model="toolbar"
            :full-width="$q.screen.xs"
            :full-height="$q.screen.xs"
            maximized
            persistent
            class="q-pa-none q-ma-none"
          >
            <q-card
              class="scroll q-pa-none"
              style="width:600px;height:380px; border-radius: 15px;"
            >
              <q-toolbar>
                <q-header />

                <q-toolbar-title
                  ><span class="text-weight-bold">Meu</span>
                  Plano.APP</q-toolbar-title
                >

                <q-btn flat round dense icon="close" v-close-popup />
              </q-toolbar>
              <q-card-section>
                <EnderecoForm
                  :enderecos="endereco"
                  @fechar="salvarEndereco"
                ></EnderecoForm>
              </q-card-section>
            </q-card>
          </q-dialog>
        </q-form>
      </div>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 35]">
      <div class="q-pa-none" style="text-align: right;">
        <q-fab
          icon="add"
          class="btnAdd bg-blue-8 text-white"
          @click="novoendereco()"
        />
      </div>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import EnderecoForm from "./EnderecoForm";

export default {
  components: { EnderecoForm },
  computed: {
    ...mapState("planoempresa", ["planoempresa"])
  },
  data() {
    return {
      toolbar: false,
      endereco: {},
      columns: [
        {
          name: "CEP",
          required: true,
          label: "CEP",
          align: "left",

          field: "cep",
          sortable: true
        },
        {
          name: "Logradouro",
          align: "left",
          label: "Endereço",

          field: "logradouro",
          sortable: true
        },
        {
          name: "Bairro",
          label: "Bairro",
          align: "left",
          field: "bairro",
          sortable: true
        },
        { name: "Cidade", label: "Cidade ", align: "left", field: "cidade" },
        { name: "Numero", label: "Número ", align: "left", field: "numero" },
        { name: "UF", label: "UF ", align: "left", field: "uf" },

        {
          name: "option",
          align: "center",
          style: "width: 10px",
          label: "Opções",
          sortable: false
        }
      ]
    };
  },

  methods: {
    ...mapActions("planoempresa", ["addEndereco", "deleteEndereco"]),
    salvarEndereco(endereco) {
      this.addEndereco(endereco);
      this.toolbar = false;
    },
    update(endereco) {
      this.endereco = { ...endereco };
      this.toolbar = true;
    },
    async del(endereco) {
      this.$swal
        .fire({
          title: "Tem certeza disso?",
          text: "Você não poderá reverter esse processo!",
          icon: "warning",

          inputAttributes: {
            autocapitalize: "off"
          },
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, excluir!"
        })
        .then(async result => {
          if (result.isConfirmed) {
            this.loading = true;
            await this.deleteEndereco({ ...endereco });

            this.loading = false;
          }
        });
    },
    novoendereco() {
      this.endereco = {
        cep: "",
        logradouro: "",
        numero: null,
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
        created_id: 0,
        updated_id: 0,
        ativo: "S"
      };

      this.toolbar = true;
    }
  }
};
</script>

<style>
.q-table__title {
  font-weight: 700;
  color: rgb(48, 48, 53);
}
.but {
  margin-right: 10px;
  padding: none;
}
.btnAdd {
  margin-top: 100px;
}
</style>
