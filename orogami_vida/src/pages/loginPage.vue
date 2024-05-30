<template>
  <q-page
    ><q-layout view="lHh Lpr lFf">
      <q-page-container>
        <q-page class="flex flex-center bg-grey-2">
          <q-card class="q-pa-md shadow-2 my_card" bordered>
            <q-card-section class="text-center">
              <div class="text-grey-9 text-h5 text-weight-bold">Sign in</div>
              <div class="text-grey-8">
                Sign in below to access your account
              </div>
            </q-card-section>
            <q-card-section>
              <q-input
                dense
                outlined
                v-model="email"
                label="Email Address"
                :v-model="email"
              ></q-input>
              <q-input
                dense
                outlined
                class="q-mt-md"
                v-model="password"
                type="password"
                label="Password"
                :v-model="password"
              ></q-input>
            </q-card-section>
            <q-card-section>
              <q-btn
                style="border-radius: 8px"
                color="dark"
                rounded
                size="md"
                label="Sign in"
                no-caps
                class="full-width"
                @click="clickButton1"
              ></q-btn>
            </q-card-section>
            <q-card-section class="text-center q-pt-none">
              <div class="text-grey-8">
                Don't have an account yet?
                <a
                  href="#/signup"
                  class="text-dark text-weight-bold"
                  style="text-decoration: none"
                  >Sign up.</a
                >
              </div>
            </q-card-section>
          </q-card>
        </q-page>
      </q-page-container>
    </q-layout>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

defineOptions({
  name: 'IndexPage',
});

function clickButton1() {
  debugger;
  email.value = 'me';
}
</script>
