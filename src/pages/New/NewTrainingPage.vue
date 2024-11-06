<template>
  <q-page class="column items-center">

    <q-page-container>

      <q-card class="text-white bg-primary">

        <q-card-section class="column items-center">
          <div class="text-h5">Neue Trainingsstunde</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input v-model="name" label="Stundenname" type="text" outlined style="padding-right: 10px;" />
          <q-select v-model="coach" label="Trainer" :options="coaches" emit-value map-options style="padding-right: 10px;" />
          <q-input v-model="note" label="Notiz" type="text" outlined></q-input>
        </q-card-section>

        <q-card-section class="column items-center">
          <div class="text-h6">Zeit</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input v-model="startTime" label="Startzeit" mask="time" :rules="['time']" outlined style="padding-right: 10px;" />
          <q-input v-model="endTime" label="Endzeit" mask="time" :rules="['time']" outlined style="padding-right: 10px;" />
          <q-select v-model="day" label="Tag" :options="days" emit-value map-options />
        </q-card-section>

        <q-card-section class="column items-center">
          <div class="text-h6">Ort</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-select v-model="location" label="Ort" :options="locations" emit-value map-options />
          <q-select v-model="court" label="Platz" :options="courts" emit-value map-options />
        </q-card-section>

        <q-card-section class="column items-center">
          <div class="text-h6">Teilnehmer</div>
        </q-card-section>

        <q-card-section class="row items-center">
          <q-input v-model="searchMember" label="Mitglied suchen" type="text" outlined style="padding-right: 10px;">
            <template v-slot:append>
              <q-icon name="search" @click="searchForMember" class="cursor-pointer" />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions class="column items-center" style="padding-bottom: 20px;">
          <q-btn label="Speichern" color="primary" @click="save" />
        </q-card-actions>

      </q-card>

    </q-page-container>

  </q-page>
</template>


<script setup>
  import { ref } from "vue";
  import axios from "axios";

  defineOptions({
    name: "NewTrainingPage",
  });

  const name = ref("");
  const searchMember = ref("");
  const coach = ref("");
  const note = ref("");
  const startTime = ref("");
  const endTime = ref("");
  const day = ref("");
  const location = ref("outside");
  const court = ref("");

  const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: {
      "Content-Type": "application/json",
    },
  });

  function searchForMember() {
    const response = api.get("/clients/search/" + searchMember.value);
    console.log(response.data);
  }

  const courts = async () => {
    const response = await api.get("http://localhost:8000/api/courts");
    return response.data;
  };

  const coaches = async () => {
    const response = await api.get("http://localhost:8000/api/coaches");
    return response.data;
  };

  const save = async () => {
    const data = {
      name: name.value,
      coach: coach.value,
      note: note.value,
      startTime: startTime.value,
      endTime: endTime.value,
      day: day.value,
      location: location.value,
      court: court.value,
    };
    console.log(data);
    await api.post("http://localhost:8000/api/trainings", data);
  };

  const days = [
    {
      label: "Montag",
      value: "Montag",
    },
    {
      label: "Dienstag",
      value: "Dienstag",
    },
    {
      label: "Mittwoch",
      value: "Mittwoch",
    },
    {
      label: "Donnerstag",
      value: "Donnerstag",
    },
    {
      label: "Freitag",
      value: "Freitag",
    },
    {
      label: "Samstag",
      value: "Samstag",
    },
    {
      label: "Sonntag",
      value: "Sonntag",
    },
  ];

  const locations = [
    {
      label: "Draußen",
      value: "outside",
    },
    {
      label: "Halle",
      value: "halle",
    }
  ];

</script>
