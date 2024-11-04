<template>
  <q-layout view="hHh lpR lFf">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Trainingsplan Tool für OlePistole
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/plan" label="Trainingsplan" />
        <q-route-tab to="/training" label="Stunden" />
        <q-route-tab to="/member" label="Mitglieder" />
        <q-route-tab to="/coach" label="Trainer" />
        <q-route-tab to="/team" label="Mannschaften" />
        <q-route-tab to="/court" label="Plätze" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
      <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

export default {
  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
}

const linksList = [
  {
    title: 'Neues Mitglied',
    caption: 'Neues Mitglied',
    icon: 'member',
    link: '/new_member'
  }
]

</script>