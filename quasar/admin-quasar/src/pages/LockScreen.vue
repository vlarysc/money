<template>
  <q-layout class="bg-image" v-cloak>
    <q-page-container>
      <q-page class="flex flex-center">
        <q-card v-if="!$q.screen.lt.sm" class="bg-transparent no-border no-shadow">
          <q-item>
            <q-item-section avatar>
              <q-avatar size="130px" class=" shadow-10">
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section class="text-white">
              <q-item-label>AT2D Tecnologia</q-item-label>
              <q-item-label caption>
                <q-input
                  dark
                  v-model="password"
                  color="white"
                  :type="isPwd ? 'password' : 'text'"
                  placeholder="Enter Password"
                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                </q-input>
              </q-item-label>
              <q-item-label></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn to="/" round flat color="white" class="q-mt-lg bg-blue-5" icon="arrow_right_alt"></q-btn>
            </q-item-section>
          </q-item>
        </q-card>
        <q-card v-if="$q.screen.lt.sm" class="bg-transparent no-border no-shadow">
          <q-card-section class="text-center">
            <q-avatar size="130px" class="shadow-10">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-card-section>
          <q-card-section class="text-center">
            <div class="text-h6 text-white">AT2D Tecnologia</div>
            <q-input
              dark
              v-model="password"
              color="white"
              :type="isPwd ? 'password' : 'text'"
              placeholder="Enter Password"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-btn to="/" round flat color="white" class="q-mt-lg bg-blue-5" icon="arrow_right_alt"></q-btn>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "LockScreen",
  data() {
    return {
      password: "",
      isPwd: "password"
    };
  }
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #cc9900 0%, #fff5cc 100%);
}

[v-cloak] {
  display: none !important;
}
</style>
