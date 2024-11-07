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
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <EssentialLink v-for="link in linkList" :key="link.title" v-bind="link" />

      
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
const linkList = ref([
  {
    title: "Home",
    caption: "Home",
    icon: "home",
    link: "/",
  },
  {
    title: "Mitglieder",
    caption: "Mitglieder",
    icon: "people",
    link: "/members",
  },
  {
    title: "Trainer",
    caption: "Trainer",
    icon: "person",
    link: "/coach",
  },
  {
    title: "Teams",
    caption: "Teams",
    icon: "people",
    link: "/team",
  },
  {
    title: "Plan",
    caption: "Plan",
    icon: "calendar_today",
    link: "/plan",
  }
]);

const router = useRouter();

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

</script>
