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
        <q-route-tab to="/plan" label="Trainingsplan" @click="changeSite('plan')" />
        <q-route-tab to="/training" label="Stunden" @click="changeSite('training')" />
        <q-route-tab to="/member" label="Mitglieder" @click="changeSite('member')" />
        <q-route-tab to="/coach" label="Trainer" @click="changeSite('coach')" />
        <q-route-tab to="/team" label="Mannschaften" @click="changeSite('team')" />
        <q-route-tab to="/court" label="Plätze" @click="changeSite('court')" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <EssentialLink v-for="link in linkList" :key="link.title" v-bind="link" />

      <q-input v-model="inputValue" :label="inputLabel" style="padding-left: 10px;" dense></q-input>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const leftDrawerOpen = ref(false)
const inputLabel = ref('Suche')
const inputValue = ref('')

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function changeSite(list) {
  if (list == 'member') {
    linkList.value = memberList
    inputLabel.value = 'Mitglied Suchen'
  }
  else if (list == 'coach') {
    linkList = coachList
    inputLabel.value = 'Trainer Suchen'
  }
  else if (list == 'team') {
    linkList = teamList
    inputLabel.value = 'Mannschaft Suchen'
  }
  else if (list == 'court') {
    linkList = courtList
    inputLabel.value = 'Plätze Suchen'
  } 
  else if (list == 'plan') {
    linkList = planList
    inputLabel.value = 'Trainingsplan Suchen'
  }
  else if (list == 'training') {
    linkList = trainingList
    inputLabel.value = 'Stunden Suchen'
  }
  else {
    linkList = []
    inputLabel.value = 'Suchen'
  }
}

const memberList = [
  {
    title: 'Neues Mitglied',
    caption: 'Neues Mitglied hinzufügen',
    icon: 'person_add',
    link: '/team'
  }
]

const coachList = [
  {
    title: 'Neuer Trainer',
    icon: 'person_add',
    link: '/team'
  }
]

const teamList = [
  {
    title: 'Neue Mannschaft',
    icon: 'person_add',
    link: '/team'
  }
]

const courtList = [
  {
    title: 'Neuer Platz',
    icon: 'person_add',
    link: '/team'
  }
]

const planList = [
  {
    title: 'Neuer Trainingsplan',
    icon: 'person_add',
    link: '/team'
  }
]

const trainingList = [
  {
    title: 'Neue Trainingsstunde',
    icon: 'person_add',
    link: '/team'
  }
]

const linkList = [ {} ]

</script>