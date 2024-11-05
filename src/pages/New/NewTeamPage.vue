<template>
  <q-page class="column items-center">

    <q-page-container>

      <q-card class="text-white bg-primary">

        <q-card-section class="column items-center">
          <div class="text-h5">Neues Mannschaft</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input v-model="name" label="Name" type="text" outlined style="padding-right: 10px;" />
          <q-input v-model="league" label="Liga" type="text" outlined style="padding-right: 10px;" />
          <q-input v-model="note" label="Notiz" type="text" outlined />
        </q-card-section>

        <q-card-section class="column items-center">
          <q-select v-model="gender" label="Geschlecht" style="margin-top: 10px;" :options="genders" emit-value map-options />
        </q-card-section>

        <q-card-actions class="column items-center" style="padding-bottom: 20px;">
          <q-btn label="Speichern" color="primary" @click="save" />
        </q-card-actions>

      </q-card>

    </q-page-container>

  </q-page>
</template>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';

  defineOptions({
    name: "NewTeamPage",
  });

  const name = ref('');
  const league = ref('');
  const note = ref('');
  const gender = ref('Männlich');

  const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const save = async () => {
    const data = {
      name: name.value,
      league: league.value,
      note: note.value,
      gender: gender.value
    }
    console.log(data)
    await api.post('/teams', data)
    .then(response => {
      if (response.data == data) {
        console.log('Team saved successfully');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  const genders = [
    {
      label: 'Männlich',
      value: 'Männlich'
    },
    {
      label: 'Weiblich',
      value: 'Weiblich'
    }
  ]
</script>
