<template>
  <q-page class="column items-center">

    <q-page-container>

      <q-card class="text-white bg-primary">

        <q-card-section class="column items-center">
          <div class="text-h5">Neuer Platz</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input v-model="name" label="Name" type="text" outlined style="padding-right: 10px;" />
          <q-input v-model="number" label="Nummer" type="number" outlined style="padding-right: 10px;" />
          <q-input v-model="note" label="Notiz" type="text" outlined />
        </q-card-section>

        <q-card-section class="column items-center">
          <q-select v-model="courtType" label="Typ" style="margin-top: 10px;" :options="courtTypes" emit-value map-options />
          <q-select v-model="courtLoc" label="Ort" style="margin-top: 10px;" :options="courtLocs" emit-value map-options @input="onItemClick" />
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
    name: "NewCourtPage",
  });

  const name = ref('');
  const number = ref('');
  const note = ref('');
  const courtType = ref('Sandplatz');
  const courtLoc = ref('Draußen');

  const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const save = async () => {
    const data = {
      name: name.value,
      number: number.value,
      note: note.value,
      courtType: courtType.value,
      courtLoc: courtLoc.value
    }
    console.log(data)
    await api.post('/courts', data)
    .then(response => {
      if (response.data == data) {
        console.log('Court saved successfully');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  const onItemClick = (item) => {
    console.log(item)
    courtType.value = item.label
  }

  const courtTypes = [
    {
      label: 'Sandplatz',
      value: 'Sandplatz'
    },
    {
      label: 'Hartplatz',
      value: 'Hartplatz'
    },
    {
      label: 'Rasenplatz',
      value: 'Rasenplatz'
    },
    {
      label: 'Teppichplatz',
      value: 'Teppichplatz'
    }
  ]

  const courtLocs = [
    {
      label: 'Draußen',
      value: 'Draußen'
    },
    {
      label: 'Halle',
      value: 'Halle'
    }
  ]
</script>
