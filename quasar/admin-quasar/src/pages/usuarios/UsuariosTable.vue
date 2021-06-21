<template>
  <div ref="table" class="q-pa-xs">
    <q-table
      :grid="$q.screen.xs"
      :visible-grid="['option']"
      flat
      bordered
      dense
      :pagination.sync="myPagination"
      :data="usuarios.content"
      :columns="columns"
      class="bg-white"
      color="black"
      row-key="id"
      :loading="loading"
      @request="onRequest"
      binary-state-sort
    >
      <template v-slot:item="props">
        <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4">
          <q-card>
            <div class="q-pa-xs text-right">
              <q-btn
                outline
                size="xs"
                class="q-ma-none q-pa-none"
                color="grey-5"
                @click="del(props.row.id)"
                icon="delete_forever"
              />
            </div>

            <div class="row" @click="update(props.row)">
              <div class="col-2">
                <q-card-section class="text-left">
                  ID
                  <br />
                  <strong>{{ props.row.id }}</strong>
                </q-card-section>
              </div>
              <div class="col-10">
                <q-card-section class="text-left">
                  Nome
                  <br />
                  <strong>{{ props.row.pessoa.nome }}</strong>
                </q-card-section>
              </div>
            </div>
            <div class="row">
              <div class="col-7">
                <q-card-section class="text-left">
                  Email
                  <br />
                  <strong>{{ props.row.email }}</strong>
                </q-card-section>
              </div>
              <div class="col-5">
                <q-card-section class="text-left">
                  Status
                  <br />
                  <q-badge v-if="props.row.ativo == 'S'" color="green">
                    <strong>Ativo</strong>
                  </q-badge>
                  <q-badge v-else color="red">
                    Inativo
                  </q-badge>
                </q-card-section>
              </div>
            </div>
          </q-card>
        </div>
      </template>
      <template v-slot:body-cell-status="props">
        <q-td key="status" :props="props">
          <q-badge v-if="props.row.ativo == 'S'" color="green">
            <strong>Ativo</strong>
          </q-badge>
          <q-badge v-else color="red">
            <strong>Inativo</strong>
          </q-badge>
        </q-td>
      </template>

      <template v-slot:body-cell-option="props">
        <q-td :props="props">
          <div class="q-pa-xs ">
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
              @click="del(props.row.id)"
              text-color="white"
              icon="delete_forever"
            />
          </div>
        </q-td>
      </template>
    </q-table>
    <div class="q-pa-none q-gutter-sm" style="text-align: right;">
      <q-form>
        <q-dialog
          v-model="toolbar"
          persistent
          maximized
          class="q-pa-none q-ma-none"
          :full-width="$q.screen.xs"
          :full-height="$q.screen.xs"
        >
          <q-card class="q-pa-none q-ma-md" style="width:700px;height:440px; border-radius: 15px;">
            <q-toolbar>
              <q-header></q-header>
              <q-toolbar-title><span class="text-weight-bold">Meu</span> Plano.APP</q-toolbar-title>
              <q-btn flat round dense icon="close" v-close-popup></q-btn>
            </q-toolbar>
            <q-card-section>
              <UsuariosForm :newUsuario="newUsuario" @atualizar="atualizar" @salvar="salvarUsuario" />
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-form>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <div class="q-pa-md" style="text-align: right;">
        <q-fab icon="add" @click="novoUsuario()" class="btnAdd bg-blue-8 text-white"></q-fab>
      </div>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Loading, QSpinnerGears } from "quasar";
import { pageSizeDefault } from "src/utils/newDatas";
import { validateBr } from "js-brasil";
import UsuariosForm from "./UsuariosForm";

export default {
  components: { UsuariosForm },
  data() {
    return {
      toolbar: false,

      newUsuario: {},
      documento1: "",
      loading: false,
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          style: "width: 90px",
          field: "id"
        },
        { name: "nome", align: "left", label: "Nome", field: (row) => row.pessoa.nome },
        { name: "email", align: "left", label: "E-mail", field: (row) => row.email },
        { name: "status", align: "center", label: "Status", field: (row) => row.ativo },

        { name: "option", align: "center", style: "width: 100px", label: "Opções" }
      ]
    };
  },
  computed: {
    ...mapState("usuario", ["usuarios"]),

    options() {
      return {
        page: this.usuarios ? this.usuarios.number : 0,
        size: this.usuarios ? this.usuarios.size : 8
      };
    },

    myPagination() {
      return {
        sortBy: "desc",
        descending: false,
        page: this.usuarios ? this.usuarios.number + 1 : 1,
        rowsPerPage: this.usuarios ? this.usuarios.size : 8,
        rowsNumber: this.usuarios ? this.usuarios.totalElements : 5
      };
    }
  },
  methods: {
    ...mapActions("usuario", ["getUsuarios", "getUsuario", "deleteUsuario", "postUsuario", "putUsuario"]),
    async onRequest(props) {
      this.loading = true;

      await this.getUsuarios({ page: props.pagination.page - 1, size: props.pagination.rowsPerPage });
      this.loading = false;
    },
    novoUsuario() {
      this.newUsuario = {
        id: 0,
        email: "",
        role: "",
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
        ativo: "N"
      };

      this.toolbar = true;
    },
    async salvarUsuario(usuario) {
      await this.postUsuario(usuario);

      this.toolbar = false;
    },
    async atualizar(usuario) {
      await this.putUsuario({ id: usuario.id, payload: usuario });
      this.getUsuarios(this.$store.state.usuario.usuario.id);
      this.toolbar = false;
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
            await this.deleteUsuario(id);
            await this.getUsuarios(this.options);
            this.loading = false;
          }
        });
    },
    update(usuario) {
      const newUsuario = {
        email: usuario.email,
        role: usuario.role,
        id: usuario.id,
        pessoa: { ...usuario.pessoa }
      };
      this.newUsuario = newUsuario;
      this.toolbar = true;
    }
  },
  mounted() {
    const pageSize = !this.$route.query.page
      ? pageSizeDefault()
      : { page: this.$route.query.page, size: this.$route.query.size };
    this.getUsuarios(pageSize);
  }
};
</script>

<style>
.btnAdd {
  margin-top: 80px;
}
</style>
