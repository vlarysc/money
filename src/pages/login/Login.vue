<template>
  <form @submit.prevent="login()" class="form-login">
    <div class="card">
      <div class="card-header">
        <h1 class="mb-0"> <strong>L</strong>ogin <strong>Money</strong></h1>
      </div>
    <div class="card-body">
      <div class="form-group">
        <input v-model="email" required class="form-control" type="email" placeholder="E-mail">
        </div>
      <div class="form-group">
        <input v-model="senha" required class="form-control" type="password" placeholder="Senha">
        </div>
        <button class="btn btn-primary mt-1" :disabled="loading">
          <template v-if="loading">
          Entrando...
          <i class="fa fa-spinner fa-spin"></i>
             </template>
          <template v-else>
          Entrar
          <i class="fa fa-sign-in-alt"></i>
             </template>
        </button>
      </div>
  </div>
  </form>
</template>

<script>
export default {
  nome: 'Login',
  data () {
    return {
      loading: false,
      email: '',
      senha: ''
    }
  },
  methods: {
    async login () {
      this.loading = true
      const email = this.email
      const senha = this.senha
      try {
        const res = await this.$firebase.auth().signInWithEmailAndPassword(email, senha)
        window.uid = res.user.uid
        this.$router.push({ name: 'Home' })
      } catch (err) {
        let menssagem = ''

        switch (err.code) {
          case 'auth/user-not-found':
            menssagem = 'Não foi possível localizar o usuário'
            break
          case 'auth/wrong-password':
            menssagem = 'Senha inválida'
            break
          default:

            menssagem = 'Não foi possível fazer login, tente novamente'
        }
        this.$root.$emit('Notify::show', {
          menssagem,
          tipo: 'danger'
        })
      }
      this.loading = false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (window.uid) {
        vm.$router.push({ name: 'Home' })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
button {
  margin-left: 155px;
}
.form-login {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    width: 25%;
    color: var(--featured);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .form-group {
    padding: 5px;
  }
}
</style>
