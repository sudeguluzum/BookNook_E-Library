<template>
  <v-app-bar>
    <v-row justify="space-between">
      <v-col cols="2" align-self="start">
        <v-img :src="logo" height="90px" alt="Logo Image" />
      </v-col>

      <v-col cols="auto" align-self="center">
        <input
          type="text"
          placeholder="Search in My library"
          v-model="query"
          @input="searchBooks"
        />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import logo from "../assets/img/logo.png";
const query = ref('');

const searchBooks = () => {
  console.log('Searching for:', query.value);
};
</script>

<style scoped>
 .search-bar {
    width: 300px;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    border: 1px solid #ddd;
  }
</style>
