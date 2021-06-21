<template>
  <q-layout>
    <q-page-container>
      <q-page class="flex bg-image flex-center">
        <q-card v-bind:style="$q.screen.lt.sm ? { width: '80%' } : { width: '30%' }">
          <q-card-section>
            <q-avatar size="103px" class="absolute-center shadow-10">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-pt-lg">
              <div class="col text-h6 ellipsis">
                Log in
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <q-form ref="myForm" class="q-gutter-md">
              <q-input filled v-model="username" label="Username" lazy-rules :rules="emailRules" />

              <q-input type="password" filled v-model="password" label="Password" lazy-rules :rules="min" />

              <div>
                <q-btn label="Login" @click="logar()" type="button" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      username: "douglas@at2d.net.br",
      password: "123456",
      emailRules: [(v) => !!v || "E-mail is required", (v) => /.+@.+\..+/.test(v) || "E-mail must be valid"],
      min: [(v) => v.length >= 6 || "Min 6 characters"]
    };
  },
  methods: {
    ...mapActions("auth", ["login", "getUserLogin"]),
    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "warning",
          message: "You need to accept the license and terms first"
        });
      } else {
        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "Submitted"
        });
      }
    },

    clearLoginData() {
      this.username = "";
      this.password = "";
    },
    async logar() {
      if (this.$refs.myForm.validate()) {
        var bodyFormData = new FormData();
        bodyFormData.append("grant_type", "password");
        bodyFormData.append("username", this.username);
        bodyFormData.append("password", this.password);

        const login = await this.login(bodyFormData);

        if (login.status == 200) {
          await this.getUserLogin();
          this.clearLoginData();
          this.$router.push({ name: "home" });
        }
      }
    }
  }
};
</script>

<style>
.bg-image {
  background-image: linear-gradient(135deg, #1f11ce 0%, #d0cef5 100%);
}
</style>
