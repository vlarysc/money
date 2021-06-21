<template>
  <q-form ref="roleValid" @submit="salvar()" class="q-gutter-md">
    <div class="q-xl">
      <div class="row q-pa-xs ">
        <div class=" q-pa-xs col-xs-12 col-md-12">
          <q-input
            outlined
            class="q-pa-xs"
            v-model="role_name"
            unmasked-value
            label="Role"
            :rules="[val => !!val || 'Campo obrigatório']"
          />
        </div>
      </div>
      <div v-if="!!role.id" class="q-pa-md">
        <q-table
          title="Restrições de acesso"
          dense
          ref="table"
          :data="papers"
          :columns="columns"
          row-key="name"
          hide-pagination
          :rows-per-page-options="[0]"
        >
          <template v-slot:body-cell-update="props">
            <q-td :props="props">
              <div style="" class="q-pa-xs ">
                <q-checkbox
                  dense
                  false-value="N"
                  true-value="S"
                  v-model="props.row.update"
                />
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-create="props">
            <q-td :props="props">
              <div style="" class="q-pa-xs ">
                <q-checkbox
                  dense
                  false-value="N"
                  true-value="S"
                  v-model="props.row.create"
                />
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-read="props">
            <q-td :props="props">
              <div style="" class="q-pa-xs ">
                <q-checkbox
                  dense
                  false-value="N"
                  true-value="S"
                  v-model="props.row.read"
                />
              </div>
            </q-td>
          </template>
          <template v-slot:body-cell-delete="props">
            <q-td :props="props">
              <div style="" class="q-pa-xs ">
                <q-checkbox
                  dense
                  v-model="props.row.delete"
                  true-value="S"
                  false-value="N"
                />
              </div>
            </q-td>
          </template>
        </q-table>
      </div>
    </div>

    <div class="q-pl-xs q-pa-xs q-pt-md" style="text-align: right;">
      <q-btn
        v-if="!role.id"
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
import { mapFields, mapMultiRowFields } from "vuex-map-fields";

export default {
  name: "role",
  props: ["newRole"],

  computed: {
    ...mapState("role", ["erro", "role"]),

    ...mapMultiRowFields("role", { papers: "role.papers" }),
    ...mapFields("role", ["role.role_name"])
  },

  data() {
    return {
      columns: [
        {
          name: "descricao",
          label: "Descrição ",
          align: "left",
          field: row => row.paper.descricao
        },
        {
          name: "read",
          align: "center",
          style: "width: 100px",
          label: "Abrir",
          field: row => row.read
        },
        {
          name: "create",
          align: "center",
          style: "width: 100px",
          label: "Inserir",
          field: row => row.create
        },
        {
          name: "update",
          align: "center",
          style: "width: 100px",
          label: "Editar",
          field: row => row.update
        },
        {
          name: "delete",
          align: "center",
          style: "width: 100px",
          label: "Excluir",
          field: row => row.delete
        }
      ]
    };
  },

  methods: {
    ...mapActions("role", ["getRoles", "postRole", "putRole"]),

    async atualizar() {
      await this.putRole({ id: this.role.id, payload: this.role });
      if (!this.erro) this.$router.go(-1);
    },
    async salvar() {
      await this.postRole(this.role);
      console.log(this.role);

      if (!this.erro) this.$router.push(`/roles/${this.role.id}`);
    }
  }
};
</script>

<style>
.q-field--auto-height.q-field--dense.q-field--labeled
  .q-field__control-container {
  padding-top: 20px;
}
</style>
