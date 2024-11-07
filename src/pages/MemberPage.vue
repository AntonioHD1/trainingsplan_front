<!-- 
  TODO:
  - Block all inputs
  - Edit button
  - Save button
  - Delete button
-->

<template>

  <div class="text-h6 pad">Mitglied: {{ id }}</div>

  <div class="row pad">
    <q-input v-model="firstname" label="Vorname" type="text" outlined style="padding-right: 20px;" />
    <q-input v-model="lastname" label="Nachname" type="text" outlined style="padding-right: 20px;" />
    <q-input v-model="ageGroup" label="Jahrgang" type="number" outlined style="padding-right: 20px;" />
    <q-select v-model="gender" label="Geschlecht" :options="genders" emit-value map-options style="padding-right: 20px;" />
  </div>

  <div class="row pad">
    <q-input v-model="contactperson" label="Kontaktperson" type="text" outlined style="padding-right: 20px;" />
    <q-input v-model="email" label="E-Mail" type="email" outlined style="padding-right: 20px;" />
    <q-input v-model="phone" label="Telefon" type="number" outlined style="padding-right: 20px;" />
  </div>

  <div class="row pad">
    <q-input v-model="street" label="Straße" type="text" outlined style="padding-right: 20px;" />
    <q-input v-model="houseNumber" label="Hausnummer" type="number" outlined style="padding-right: 20px;" />
    <q-input v-model="city" label="Stadt" type="text" outlined style="padding-right: 20px;" />
  </div>

  <div class="row pad">
    <q-input v-model="dtb_id" label="DTB-Nr" type="number" outlined style="padding-right: 20px;" />
    <q-input v-model="skill" label="Spielerstärke" type="number" outlined style="padding-right: 20px;" />
    <q-input v-model="note" label="Notiz" type="text" outlined style="padding-right: 20px;" />
    <q-checkbox v-model="isMember" color="teal" style="padding-right: 20px;" />
  </div>

</template>

<script setup>
  import { ref, watch } from 'vue';
  import axios from 'axios';
  import { Notify } from 'quasar';
  import { useRoute } from 'vue-router';

  defineOptions({
    name: 'MemberPage'
  });

  const route = useRoute();

  const id = ref('');
  const firstname = ref('');
  const lastname = ref('');
  const contactperson = ref('');
  const ageGroup = ref('');
  const email = ref('');
  const phone = ref('');
  const street = ref('');
  const houseNumber = ref('');
  const city = ref('');
  const dtb_id = ref('');
  const skill = ref('');
  const isMember = ref(true);
  const note = ref('');
  const gender = ref('Männlich');

  watch ( () => route.params.id, (newId, oldId) => {
    if (newId == 0) {
      Notify.create({
        message: 'Wähle einen Mitglied aus',
        color: 'green',
        icon: 'search',
      });
    } else {
      fetchData(newId);
    }
  });
    
  function fetchData(newId) {
    api.get('/clients/' + newId).then(response => {
      id.value = newId;
      firstname.value = response.data.firstName;
      lastname.value = response.data.lastName;
      contactperson.value = response.data.contactPerson;
      ageGroup.value = response.data.ageGroup;
      email.value = response.data.email;
      phone.value = response.data.phone;
      street.value = response.data.street;
      houseNumber.value = response.data.houseNumber;
      city.value = response.data.city;
      dtb_id.value = response.data.dtb_id_nr;
      skill.value = response.data.skill;
      note.value = response.data.note;
      gender.value = response.data.gender;
      isMember.value = response.data.isMember;
    }).catch(error => {
      Notify.create({
        message: 'Fehler beim Laden des Mitglieds',
        color: 'red',
        icon: 'warning',
      });
    });
  }

</script>

<style lang="css" scoped>
  .pad {
    padding-left: 20px;
    padding-top: 20px;
  }
</style>