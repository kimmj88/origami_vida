<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-dark text-white shadow-2 rounded-borders">
        <q-btn flat label="Homepage" to="/"></q-btn>
        <q-space />

        <q-tabs v-model="tab" shrink stretch>
          <q-route-tab label="page1" to="/page1"></q-route-tab>
          <q-route-tab label="page2" to="/page2"></q-route-tab>
          <q-route-tab label="page3" to="/page3"></q-route-tab>
          <q-route-tab label="login" to="/login"></q-route-tab>
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab = ref('');

defineOptions({
  name: 'MainLayout',
});
</script>
