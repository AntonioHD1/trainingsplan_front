<template>
  <q-page class="column items-center">

    <q-page-container>

      <q-card class="text-white bg-primary">

        <q-card-section class="column items-center">
          <div class="text-h5">Neuer Trainer</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input v-model="firstname" label="Vorname" type="text" outlined style="padding-right: 10px;" />
          <q-input v-model="lastname" label="Nachname" type="text" outlined style="padding-right: 10px;" />
          <q-input v-model="ageGroup" label="Jahrgang" type="number" outlined></q-input>
        </q-card-section>

        <q-card-section class="column items-center">
          <div class="text-h6">Kontaktdaten</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input v-model="email" label="E-Mail" type="email" outlined style="padding-right: 10px;" />
          <q-input v-model="phone" label="Telefon" type="number" outlined />
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input v-model="street" label="Straße" type="text" outlined style="padding-right: 10px;" />
          <q-input v-model="houseNumber" label="Hausnummer" type="number" outlined style="padding-right: 10px;" />
          <q-input v-model="city" label="Stadt" type="text" outlined style="padding-right: 10px;" />
        </q-card-section>

        <q-card-section class="column items-center">
          <div class="text-h6">Weiter Informationen</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input v-model="dtb_id" label="DTB-Nr" type="number" outlined style="padding-right: 10px;" />
          <q-input v-model="coachLicense" label="Trainerschein" type="text" outlined style="padding-right: 10px;" />
          <q-input v-model="note" label="Notiz" type="text" outlined />
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
    name: "NewCoachPage",
  });

  const firstname = ref('');
  const lastname = ref('');
  const ageGroup = ref('');
  const email = ref('');
  const phone = ref('');
  const street = ref('');
  const houseNumber = ref('');
  const city = ref('');
  const dtb_id = ref('');
  const skill = ref('');
  const note = ref('');

  const api = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const save = async () => {
    const data = {
      firstname: firstname.value,
      lastname: lastname.value,
      ageGroup: ageGroup.value,
      email: email.value,
      phone: phone.value,
      street: street.value,
      houseNumber: houseNumber.value,
      city: city.value,
      dtb_id: dtb_id.value,
      skill: skill.value,
      note: note.value
    }
    console.log(data)
    await api.post('/coaches', data)
    .then(response => {
      if (response.data == data) {
        console.log('Coach saved successfully');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
</script>
