<template>
<div class="w-100 d-flex justify-content-center">
  <button class="btn btn-lg btn-outline-primary w-70" @click="novoGasto()">
   <nobr>
      <i class="fa fa-plus"></i>

        Novo Gasto
      </nobr>
  </button>
  <form @submit.prevent="adicionarGasto()">
  <div class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLiveLabel">Adicionar um novo gasto</h5>
        <button type="button" class="btn-close" @click="close()"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="form-group col-8">
            <label for="">Descrição:</label>
            <input type="text" v-model="form.descricao" class="form-control" required>
          </div>
          <div class="form-group col-4">
            <label for="">Valor:</label>
            <input type="text" v-model="form.valor" class="form-control" required>
          </div>
          <div class="form-group mt-4 col-12 flex-column d-flex align-items-center">
            <input type="file"
            ref="input"
            class="d-none"
            @change="lerArquivo($event)"
            accept="image/*">
            <button type="button" @click="openFile()" class="btn w-50 btn-outline-secondary">
              Adicionar Comprovante
            </button>
            <div v-if="form.recibo" class="mt-2">
          {{ form.recibo.name }}
          <button type="button" class="btn badge badge-light" @click="form.recibo = ''">
            <i class="fa fa-trash text-danger"></i>
          </button>
        </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <template v-if="loading">
          <button class="btn btn-primary" disabled>
            <i class="fa fa-spinner fa-spin"></i>
            Adicionando...
            </button>
           </template>
        <template v-else>
          <button class="btn btn-primary">
            Adicionar</button>
           </template>
      </div>
    </div>
  </div>
</div>
<div class="modal-backdrop fade" :style="{display: showModal ? 'block' : 'none'}" :class="{show: showModal}"></div>
  </form>
</div>

</template>

<script>

export default {
  data () {
    return {
      loading: false,
      showModal: false,
      form: {
        recibo: '',
        descricao: '',
        valor: ''
      }
    }
  },
  computed: {
    nomeArquivo () {
      const recibo = this.form.recibo
      if (recibo) {
        const split = recibo.name.split('.')
        return `${split[0]}-${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  },
  methods: {
    lerArquivo (event) {
      this.form.recibo = event.target.files[0]
    },
    openFile () {
      this.$refs.input.value = null
      this.$refs.input.click()
    },
    close () {
      this.showModal = false
    },
    novoGasto () {
      this.showModal = true
    },
    async adicionarGasto () {
      this.loading = true
      let url = ''
      try {
        this.$root.$emit('Spinner::show')
        const ref = this.$firebase.database().ref(window.uid)
        const id = ref.push().key

        if (this.form.recibo) {
          const validarName = await this.$firebase.storage()
            .ref(window.uid)
            .child(this.nomeArquivo)
            .put(this.form.recibo)

          url = await validarName.ref.getDownloadURL()
        }

        const item = {
          id,
          ...this.form,
          recibo: url,
          createdAt: new Date().getTime()
        }

        ref.child(id).set(item, err => {
          if (err) {
            this.$root.$emit('Notify::show', {
              tipo: 'danger',
              menssagem: 'Não foi possível adicionar novo gasto, tente novamente'
            })
          } else {
            this.$root.$emit('Notify::show', {
              tipo: 'success',
              menssagem: 'Gasto inserido com sucesso!'
            })
            this.close()
          }
        })
      } catch (err) {
        this.$root.$emit('Norify::show', {
          tipo: 'danger',
          menssagem: 'Não foi possível adicionar novo gasto, tente novamente'
        })
      } finally {
        this.loading = false
        this.$root.$emit('Spinner::hide')
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.modal {
  color: var(--darker);
}
</style>
