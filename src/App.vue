<template>
  <div id="app">
    <base-spinner/>
    <LayoutNotify />
    <div class="container-fluid" v-if="logado">
      <div class="row">
        <div class="col-2 navigation-sidebar">
          <h1 class="app-title">Money</h1>
       <Navigation />
        </div>
        <div class="col">
      <router-view />
        </div>
      </div>
    </div>
    <router-view  v-else/>
  </div>
</template>
<script>
import BaseSpinner from './components/global/BaseSpinner.vue'
import Navigation from './components/layout/Navigation.vue'
import LayoutNotify from './components/layout/LayoutNotify.vue'

export default {
  name: 'App',
  components: {
    BaseSpinner,
    Navigation,
    LayoutNotify
  },
  data () {
    return {
      logado: false
    }
  },
  methods: {
  },
  mounted () {
    this.$firebase.auth().onAuthStateChanged(user => {
      window.uid = user ? user.uid : null
      this.logado = !!user
      this.$router.push({ name: window.uid ? 'Home' : 'Login' })
      setTimeout(() => {
        this.$root.$emit('Spinner::hide')
      }, 300)
    })
  }
}
</script>

<style lang="scss">
#app {
  min-height: 100vh;
  background-color: var(--darker);
  color: var(--light);
  .navigation-sidebar {
    background-color: var(--dark-medium);
    .app-title {
      font-size: 20pt;
      margin-top: 10px;
      text-align: center;
    }
  }
}
</style>
