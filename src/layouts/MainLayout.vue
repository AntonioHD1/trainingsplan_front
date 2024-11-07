<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Trainingsplan Tool für OlePistole
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/" label="Startseite" @click="changeSite('home')" />

        <q-route-tab
          to="/plan"
          label="Trainingsplan"
          @click="changeSite('plan')"
        />
        <q-route-tab
          to="/training"
          label="Stunden"
          @click="changeSite('training')"
        />
        <q-route-tab
          to="/member/:id=0"
          label="Mitglieder"
          @click="changeSite('member')"
        />

        <q-route-tab to="/coach" label="Trainer" @click="changeSite('coach')" />

        <q-route-tab
          to="/team"
          label="Mannschaften"
          @click="changeSite('team')"
        />

        <q-route-tab to="/court" label="Plätze" @click="changeSite('court')" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <EssentialLink v-for="link in linkList" :key="link.title" v-bind="link" />

      <q-input bottom-slots v-model="inputValue" :label="inputLabel" style="padding-left: 10px; padding-right: 10px">
        <template v-slot:append>
          <q-icon name="search" @click="search" class="cursor-pointer" />
        </template>
      </q-input>

      <EssentialLink v-for="link in resultList" :key="link.title" v-bind="link" @click="callElement(link.name, link.id)" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import axios from "axios";
import { Notify } from 'quasar';
import { useRouter } from 'vue-router';

const leftDrawerOpen = ref(false);
const inputLabel = ref("Suchen");
const inputValue = ref("");
const linkList = ref([]);
const resultList = ref([]);

const router = useRouter();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

const callElement = (name, id) => {
  router.push({ name: name, params: { id: id } });
}

const search = async () => {
  if (inputValue.value != "") {
    await api.get('/clients/search/' + inputValue.value).then(response => {
      let responseList = new Set();
      console.log(response.data);

      for (let i = 0; i < response.data.length; i++) {
        responseList.add({
          title: response.data[i].firstName + " " + response.data[i].lastName,
          icon: "person",
          name: "member",
          id: response.data[i].id
        });
      }

      console.log(responseList)

      resultList.value = responseList;
    })
    .catch(error => {
      Notify.create({
        message: "Fehler beim Suchen",
        color: "red",
        icon: "error"
      })
    })
  } else {
    resultList.value = []
  }
}
</script>
