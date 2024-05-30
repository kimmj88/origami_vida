<template>
  <div class="q-pa-md example-row-mix-and-match">
    <div class="row">
      <div class="col-3">
        <q-input
          dense
          outlined
          v-model="message"
          :v-model="message"
          label="Email Address"
        ></q-input>
      </div>

      <div class="col-4">
        <q-btn>Check</q-btn>
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <!-- <q-input dense outlined label="password" :v-model="message"></q-input> -->
      </div>
    </div>

    <q-btn @click="fetchData">done</q-btn>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import axios from 'axios';
const message = ref('');
async function fetchData() {
  try {
    const response = await axios.get('http://localhost:3000');
    message.value = response.data;
  } catch (error) {
    console.log('error');
  }
}
</script>
<style lang=""></style>
