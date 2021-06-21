<template>
  <div class="q-pa-xs">
    <q-table
      :grid="$q.screen.xs"
      :visible-grid="['option']"
      :pagination.sync="myPagination"
      flat
      bordered
      dense
      :data="roles.results"
      :columns="columns"
      @request="onRequest"
      :loading="loading"
      row-key="name"
      hide-pagination
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
              <div class="col-4">
                <q-card-section class="text-left">
                  ID
                  <br />
                  <strong>{{ props.row.id }}</strong>
                </q-card-section>
              </div>
              <div class="col-8">
                <q-card-section class="text-left">
                  Role
                  <br />
                  <strong>{{ props.row.role_name }}</strong>
                </q-card-section>
              </div>
            </div>
          </q-card>
        </div>
      </template>

      <template v-slot:body-cell-option="props">
        <q-td :props="props">
          <div style="" class="q-pa-xs ">
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
    <div class="q-pa-lg flex flex-center">
      <q-pagination
        v-model="page"
        :max="
          Math.max(
            1,
            Math.ceil(
              this.myPagination.rowsNumber / this.myPagination.rowsPerPage
            )
          )
        "
      />
    </div>

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
            class="q-ma-md"
            style="width:290px;height:240px; border-radius: 15px;"
          >
            <q-toolbar>
              <q-header></q-header>
              <q-toolbar-title
                ><span class="text-weight-bold">Meu</span>
                Plano.APP</q-toolbar-title
              >

              <q-btn flat round dense icon="close" v-close-popup></q-btn>
            </q-toolbar>
            <q-card-section>
              <RolesForm @atualizar="atualizar" @salvar="salvarRoles" />
            </q-card-section>
          </q-card>
        </q-dialog>
      </q-form>
    </div>

    <q-page-sticky position="bottom-right" :offset="[18, 28]">
      <div class="q-pa-md" style="text-align: right;">
        <q-fab
          icon="add"
          class="btnAdd bg-blue-6 text-white"
          @click="novoRole()"
        />
      </div>
    </q-page-sticky>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import RolesForm from "./RolesForm";
import { pageSizeDefault } from "src/utils/newDatas";

export default {
  components: { RolesForm },
  computed: {
    ...mapState("role", ["roles"])
  },
  async mounted() {
    await this.onRequest({
      pagination: {
        ...pageSizeDefault()
      }
    });
  },
  watch: {
    page: function(newValue, oldValue) {
      this.onRequest({
        pagination: {
          page: newValue
        }
      });
    }
  },
  data() {
    return {
      page: 1,
      myPagination: {
        sortBy: "desc",
        descending: false,
        page: 0,
        rowsPerPage: pageSizeDefault().size,
        rowsNumber: 10
      },
      toolbar: false,
      loading: false,
      columns: [
        {
          name: "id",
          required: true,
          label: "ID",
          align: "left",
          style: "width: 50px",
          field: row => row.id,
          sortable: true
        },

        {
          name: "role",

          label: "Role ",
          align: "left",
          field: row => row.role_name
        },

        {
          name: "option",
          align: "center",
          style: "width: 100px",
          label: "Opções"
        }
      ]
    };
  },
  methods: {
    ...mapActions("role", [
      "getRoles",
      "getRole",
      "putRole",
      "postRole",
      "deleteRole"
    ]),

    async onRequest(props) {
      this.loading = true;

      const pagination = props ? props.pagination : null;

      const pageSize = {
        ...pageSizeDefault(),
        page: pagination ? pagination.page - 1 : this.page - 1
      };

      await this.getRoles(pageSize);

      this.myPagination = {
        ...this.myPagination,
        ...pagination,
        rowsNumber: this.roles.total
      };
      this.loading = false;
    },

    novoRole() {
      this.$store.commit("role/SET_ROLE", {
        role_name: "",
        ativo: "S",
        created_id: 0,
        updated_id: 0,
        papers: []
      });

      this.toolbar = true;
    },

    async salvarRoles(role) {
      await this.postRole(role);
      this.onRequest();
      this.toolbar = false;
    },
    async atualizar(role) {
      await this.putRole({ id: role.id, payload: role });
      this.onRequest();
      this.toolbar = false;
    },

    update(role) {
      this.$router.push("/roles/" + role.id);
    }
  }
};
</script>

<style>
.q-table__title {
  font-weight: 700;
  color: rgb(48, 48, 53);
}
.oi {
  margin-left: 1000px;
}
.btnAdd {
  margin-top: 100px;
}
</style>
