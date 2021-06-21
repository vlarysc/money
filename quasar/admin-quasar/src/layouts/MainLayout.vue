<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-bar class=" bg-indigo" style="height: 50px;">
        <q-btn
          v-if="$q.screen.xs"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <div class="headerT">
          <q-icon class="q-pr-xs q-my-xs" style="cursor:pointer;" @click="$router.push('/')" name="laptop_chromebook" />
          <div class="meuPlano" style="cursor:pointer;" @click="$router.push('/')">Meu Plano.APP</div>
        </div>
        <div v-if="!$q.screen.xs" class="btn-header row">
          <div class="btn-info">
            <q-btn-dropdown size="md" class="q-ma-none q-pa-none" flat label="Sistema">
              <q-list flat class="lista  bg-grey-2">
                <q-item
                  class=" q-px-xs q-pr-sm q-ml-xs"
                  style="font-size: 12px;"
                  v-ripple
                  v-for="link in essentialLinks"
                  :key="link.title"
                  :to="link.link"
                  clickable
                  v-close-popup
                >
                  <q-item-section avatar v-if="!!link.icon">
                    <q-icon style="font-size: 15px;" class="q-pa-none q-ma-none" :name="link.icon" />
                  </q-item-section>
                  <q-item-section class="q-pa-none q-ma-none">
                    <q-item-label>{{ link.title }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>

            <q-btn-dropdown size="md" class="q-ma-none q-pa-none" flat label="Impressões">
              <q-list> </q-list>
            </q-btn-dropdown>
          </div>
          <div class="avatar text-white rounded-borders row flex-center q-mt-md">
            <q-btn flat size="sm">
              <q-chip size="md" flat>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
                {{ user.pessoa ? user.pessoa.nome : "teste" }}
              </q-chip>
              <q-menu>
                <q-list class="foto-logout" style="min-width: 210px; min-height: 200px;">
                  <q-item clickable v-close-popup>
                    <q-item-section
                      ><q-img
                        class="absolute-top"
                        src="https://wonderfulengineering.com/wp-content/uploads/2014/01/Technology-Wallpapers-6.jpg"
                        style="height: 200px"
                      >
                        <div class="absolute-bottom bg-transparent items-center">
                          <q-avatar size="56px" class="q-mb-sm items-center">
                            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                          </q-avatar>
                          <div class="text-weight-bold">{{ user.pessoa ? user.pessoa.nome : "teste" }}</div>
                          <div class="rounded-borders">
                            {{ user ? user.email : "email" }}<q-btn @click="sair()" outline size="sm">Sair</q-btn>
                          </div>
                        </div>
                      </q-img></q-item-section
                    >
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <!-- <q-tabs active-bg-color="grey-1" active-color="indigo" v-model="tab" shrink>
          <q-tab name="tab1" label="Sistema"></q-tab>
          <q-tab name="tab3" label="Impressões"></q-tab>
        </q-tabs>

        <q-space /> -->

        <!-- <q-btn dense flat icon="minimize" />
        <q-btn dense flat icon="crop_square" />
        <q-btn dense flat icon="close" /> -->
      </q-bar>

      <!--  <q-tab-panels v-model="tab" animated class="bg-indigo text-white shadow-2 " style="height: 85px;">
        <q-tab-panel class="bg-grey-1 q-pa-none q-ma-none" name="tab1"> -->
      <!-- <q-btn-dropdown
            flat
            class="text-black"
            padding="12px sm"
            color="indigo"
            stack
            icon="people"
            label="Cadastros"
          >
            <q-list class="bg-gray-1">
              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup>
                <q-item-section>
                  <q-item-label>Articles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown> -->

      <!--  <q-btn
            v-for="link in essentialLinks"
            :key="link.title"
            :to="link.link"
            padding="lg sm"
            flat
            class="text-grey-9"
            color="indigo"
            stack
            :icon="link.icon"
            >{{ link.title }}</q-btn
          >
        </q-tab-panel> -->

      <!-- <q-tab-panel class="bg-grey-1 text-indigo" name="tab2">
          <div class="text-h6">Menu Convenios</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel class="bg-grey-1 text-indigo" name="tab3">
          <div class="text-h6">Menu Impressões</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel> -->
      <!-- </q-tab-panels> -->
      <!-- <q-toolbar class="bg-grey-9 text-white">
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-btn flat label="Meu Plano"></q-btn>

        <q-tabs v-model="tab" shrink>
          <q-tab name="tab1" label="Plano"></q-tab>
          <q-tab name="tab2" label="Convenios"></q-tab>

          <q-tab name="tab3" label="Impressões"></q-tab>
        </q-tabs>
        <q-space />
        <div>Versão: {{ appVersion }}</div>
      </q-toolbar> -->
    </q-header>

    <q-drawer v-if="$q.screen.xs" v-model="leftDrawerOpen" show-if-above :width="250">
      <q-scroll-area
        class="bg-color"
        style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
      >
        <q-list>
          <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
        </q-list>
      </q-scroll-area>
      <q-img
        class="absolute-top"
        src="https://wonderfulengineering.com/wp-content/uploads/2014/01/Technology-Wallpapers-6.jpg"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent items-center">
          <q-avatar size="56px" class="q-mb-sm items-center">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">
            Jhon
          </div>
          <div class="row rounded-borders">Email<q-space /><q-btn @click="sair()" outline size="sm">Sair</q-btn></div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container style="padding-top: 56px;">
      <q-scroll-area style="height: 88vh; max-width: 100%;">
        <router-view />
      </q-scroll-area>
    </q-page-container>
    <q-footer class="pe q-my-xs bg-indigo" style="height: 15px; ">
      <div style="padding-top: none" class=" bg-indigo q-pl-md row">
        <div v-if="$q.screen.xs" class="foo q-pa-none  col-4">
          <q-btn-dropdown
            class="drop"
            padding="none"
            size="sm"
            dense
            label="Anotações"
            flat
            direction="right"
            color="white"
          >
            <template>
              <div style="width:300px;height:320px;">
                <q-editor
                  v-model="editor"
                  flat
                  content-class="bg-white"
                  toolbar-text-color="white"
                  toolbar-toggle-color="yellow-8"
                  toolbar-bg="primary"
                  :toolbar="[
                    ['bold', 'italic', 'underline'],
                    [
                      {
                        label: $q.lang.editor.formatting,
                        icon: $q.iconSet.editor.formatting,
                        list: 'no-icons',
                        options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
                      }
                    ]
                  ]"
                />
                <q-btn class="btn-note" @click="persist">Salvar</q-btn>
              </div>
            </template>
          </q-btn-dropdown>
        </div>
        <div v-else class="q-pa-none  col-6">
          <q-btn-dropdown
            class="drop"
            padding="none"
            size="sm"
            dense
            label="Anotações"
            flat
            direction="right"
            color="white"
          >
            <template>
              <div style="width:300px;height:320px;">
                <q-editor
                  v-model="editor"
                  flat
                  content-class="bg-white"
                  toolbar-text-color="white"
                  toolbar-toggle-color="yellow-8"
                  toolbar-bg="primary"
                  :toolbar="[
                    ['bold', 'italic', 'underline'],
                    [
                      {
                        label: $q.lang.editor.formatting,
                        icon: $q.iconSet.editor.formatting,
                        list: 'no-icons',
                        options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
                      }
                    ]
                  ]"
                />
                <q-btn class="btn-note" @click="persist" v-close-popup>Salvar</q-btn>
              </div>
            </template>
          </q-btn-dropdown>
        </div>

        <div class="status q-pa-none q-mt-xs  col-5">
          <q-spinner color="amber" size="1em" :thickness="10" /> <strong> Meu </strong>
          <strong class="text-amber">Plano.APP</strong>
        </div>
        <div class="status q-pa-none q-mt-xs  col-1">
          <strong>{{ formatDate(new Date()) }}</strong>
        </div>
      </div>
    </q-footer>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { version } from "../../package";
import { mapActions, mapState } from "vuex";
import { date } from "quasar";

const linksData = [
  {
    title: "Empresas",
    caption: "Lista de Empresas",
    icon: "people",
    link: "/empresas"
  },
  {
    title: "Usuários",
    caption: "Lista de Usuário",
    icon: "account_box",
    link: "/usuarios"
  },
  {
    title: "Tipo de Cobrança",
    caption: "Lista de Tipo de Cobrança",
    icon: "local_atm",
    link: "/tipocobrancas"
  }
];

export default {
  name: "MainLayout",

  components: { EssentialLink },

  computed: { ...mapState("auth", ["user"]) },
  methods: {
    ...mapActions("auth", ["logout"]),
    sair() {
      this.logout();
      this.$router.push("/login");
    },
    formatDate(dataApi) {
      return date.formatDate(dataApi, "DD/MM/YYYY") || "-";
    },
    persist() {
      localStorage.editor = this.editor;
    }
  },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      appVersion: version,
      tab: "tab1",
      editor: ""
    };
  },
  mounted() {
    if (localStorage.editor) this.editor = localStorage.editor;
  },
  watch: {
    name(salv) {
      localStorage.editor = salv;
    }
  }
};
</script>
<style>
.bg-color {
  background: #fafbfe;
}
.status {
  font-size: 0.6rem;
}

.pe {
  font-size: xx-small;
  position: fixed;
  bottom: 0;
}

.btn-note {
  color: blue;
  background-color: rgb(235, 230, 230);
  margin-left: 210px;
  margin-top: 80px;
}

.foto-logout {
  text-align: center;
  font-size: 20px;
}
.avatar {
  padding-bottom: 1em;
}
.drop {
  padding-top: 0.3em;
}

.btn-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
}

.btn-info {
  display: flex;
  align-items: center;
}

.meuPlano {
  width: 111px;
}

.headerT {
  display: flex;
  justify-content: space-between;
}

.foo {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.q-item__section--avatar {
  min-width: 0.1px;
}

.q-item__section--side {
  padding-right: 8px;
}
</style>
