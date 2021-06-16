<template>
<ul class="nav flex-column justify-content-between">
  <div>
  <router-link exact-active-class="active" exact v-for="(router, i) in routerLinks" :key="i" class="nav-link" :to="{ name: router.name }">
    <i class="fa" :class="`fa-${router.meta.icon}`"></i>
    {{ router.meta.title }}
  </router-link>
<hr>
<LayoutNewMoney />
  </div>
  <LayoutLogout />
</ul>
</template>

<script>
import LayoutLogout from './LayoutLogout.vue'
import LayoutNewMoney from './LayoutNewMoney.vue'

export default {
  components: {
    LayoutLogout,
    LayoutNewMoney
  },
  computed: {
    routerLinks () {
      return this.$router.options.routes.filter(retornar => retornar.name !== 'Login')
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  margin-left: -15px;
  width: calc(100% + 26px);
  height: 91.5vh;
  .nav-link {
    color: white;
    &.active {
      color: var(--featured);
      background: transparent;
    }
    &:hover {
      color: var(--dark);
      background-color: var(--featured);
    }
  }
}
</style>
