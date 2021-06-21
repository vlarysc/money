<template>
  <div>
    <q-table
      :grid="$q.screen.xs"
      :visible-grid="['option']"
      :title="`Empresa: ${empresa.pessoa.nome}`"
      flat
      bordered
      dense
      class="bg-white"
      color="black"
      binary-state-sort
      :data="contatos.content"
      :columns="columns"
      flat
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
              <div class="col-5">
                <q-card-section class="text-left">
                  Nome
                  <br />
                  <strong>{{ props.row.empresa.pessoa.nome }}</strong>
                </q-card-section>
              </div>
              <div class="col-7">
                <q-card-section class="text-left">
                  Cargo
                  <br />
                  <strong>{{ props.row.cargo }}</strong>
                </q-card-section>
              </div>
              <div class="row">
                <div class="col-5">
                  <q-card-section class="text-left">
                    Telefone
                    <br />
                    <strong>{{ props.row.empresa.pessoa.telefone1 }}</strong>
                  </q-card-section>
                </div>
                <div class="col-7">
                  <q-card-section class="text-left">
                    Email
                    <br />
                    <strong>{{ props.row.empresa.pessoa.email }}</strong>
                  </q-card-section>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </template>

      <template v-slot:body-cell-option="props">
        <q-td :props="props">
          <div class="bot q-pa-sm q-gutter-sm">
            <q-btn
              size="xs"
              class="q-ma-none q-pa-none q-mr-xs"
              color="blue-8"
              @click="update(props.row)"
              icon="create"
            ></q-btn>
            <q-btn
              size="xs"
              class="q-ma-none q-pa-none"
              color="red-8"
              @click="del(props.row.id)"
              text-color="white"
              icon="delete_forever"
            ></q-btn>
          </div>
        </q-td>
      </template>
    </q-table>
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
          <q-card class="q-ma-md" style="width:600px;height:380px; border-radius: 15px;">
            <q-toolbar>
              <q-header></q-header>
              <q-toolbar-title><span class="text-weight-bold">Meu</span> Plano.APP</q-toolbar-title>
              <q-btn flat round dense icon="close" v-close-popup></q-btn>
            </q-toolbar>
            <q-card-section>
              <ContatosForm :newContato="newContato" @atualizar="atualizar" @salvar="salvarContato" />
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-form>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <div class="q-pa-sm" style="text-align: right;">
        <q-fab icon="add" @click="novoContato()" class="btnAdd bg-light-blue-9 text-white"></q-fab>
      </div>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ContatosForm from "./ContatosForm";

export default {
  components: { ContatosForm },
  data() {
    return {
      toolbar: false,
      newContato: {},
      columns: [
        {
          name: "nome",
          required: true,
          label: "Nome",
          align: "left",

          field: (field) => field.pessoa.nome,
          sortable: true
        },

        { name: "Cargo", label: "Cargo ", align: "left", field: (field) => field.cargo },

        {
          name: "Telefone",

          label: "Telefone",
          align: "left",
          field: (field) => field.pessoa.telefone1,
          sortable: true
        },
        { name: "E-mail", label: "E-mail ", align: "left", field: (field) => field.pessoa.email },

        { name: "option", align: "center", style: "width: 1px", label: "Opções", sortable: false }
      ]
    };
  },
  methods: {
    ...mapActions("contato", ["getContatos", "getContato", "putContato", "postContato", "deleteContato"]),
    novoContato() {
      this.newContato = {
        pessoa: {
          nome: "",
          nickName: "",
          email: "",
          documento1: "",
          telefone1: "",
          telefone2: "",
          tipoPessoa: "PF",
          enderecos: []
        },
        cargo: "",
        empresa: {
          id: this.$store.state.empresa.empresa.id
        }
      };

      this.toolbar = true;
    },
    async salvarContato(contato) {
      await this.postContato(contato);
      this.getContatos(this.$store.state.empresa.empresa.id);

      this.toolbar = false;
    },
    async atualizar(contato) {
      await this.putContato({ id: contato.id, payload: contato });
      this.getContatos(this.$store.state.empresa.empresa.id);
      this.toolbar = false;
    },

    update(contato) {
      const newContato = { ...contato, pessoa: { ...contato.pessoa } };
      this.newContato = newContato;
      this.toolbar = true;
    },
    async del(id) {
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
        .then(async (result) => {
          if (result.isConfirmed) {
            this.loading = true;
            await this.deleteContato(id);
            await this.getContatos(this.$store.state.empresa.empresa.id);
            this.loading = false;
          }
        });
    }
  },
  computed: {
    ...mapState("contato", ["contatos"]),
    ...mapState("empresa", ["empresa"])
  }
};
</script>

<style>
.q-table__title {
  font-weight: 700;
  color: rgb(48, 48, 53);
}
.but {
  margin-right: 1px;
  padding: none;
}
.bot {
  margin-right: 1px;
  padding: none;
}
.btnAdd {
  margin-top: 180px;
}
</style>
