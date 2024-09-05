<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="2">
            <Sidebar></Sidebar>
          </v-col>

          <v-col cols="9" class="mt-12">
            <h1 class="d-flex justify-center my-3" style="color:#7e4500; font-family:Mona Sans;">Popular Now</h1>

            <v-sheet
              class="mx-auto"
              elevation="7"
             
              color="#fff7f2"
            >
              <v-slide-group
                v-model="model"
                class="pa-4"
                selected-class="selected"
                show-arrows
              >
                <v-slide-group-item
                  v-for="(img, n) in images"
                  :key="n"
                  v-slot="{ isSelected, toggle, selectedClass }"
                >
                 
                    <v-img
                    :class="['ma-4', selectedClass]"
                    @click="toggle"
                      :src="img.src"
                      height="200"
                      width="150"
                      :style="{ transform: isSelected ? 'scale(1.1)' : 'scale(1)', transition: 'transform 0.3s ease' }"
                    ></v-img>
                    <!-- <div class="d-flex fill-height align-center justify-center">
                      <v-scale-transition>
                        <v-icon
                          v-if="isSelected"
                          color="white"
                          icon="mdi-close-circle-outline"
                          size="48"
                        ></v-icon>
                      </v-scale-transition>
                    </div> -->
                 
                </v-slide-group-item>
              </v-slide-group>
              <v-col
                class="d-flex align-center justify-center px-12"
                
              >
                <v-expand-transition>
                  <v-sheet v-if="selectedBook" height="auto" color="#fff7f2">
                    <v-row class="mb-4">
                      <h2 style="color:#7e4500">{{ selectedBook.name }}</h2>
                    </v-row>
                    <v-row>
                      <p class="text-h8 mb-6" style="color:#A18768">Author: {{ selectedBook.author }}</p>
                    </v-row>
                    <v-row class="pb-8">
                      <p style="color:#7e4500">{{ selectedBook.text }}</p>
                    </v-row>
                  </v-sheet>
                </v-expand-transition>
              </v-col>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Sidebar from "../components/Sidebar.vue";
import booksJson from "../assets/booksJson.json";

import img1 from "../assets/img/1.png";
import img2 from "../assets/img/16.png";
import img3 from "../assets/img/8.png";
import img4 from "../assets/img/7.png";
import img5 from "../assets/img/13.png";
import img6 from "../assets/img/12.png";
import img7 from "../assets/img/11.png";
import img8 from "../assets/img/10.png";

const images = [
  { src: img1, id: 1 },
  { src: img2, id: 16 },
  { src: img3, id: 8 },
  { src: img4, id: 7 },
  { src: img5, id: 13 },
  { src: img6, id: 12 },
  { src: img7, id: 11 },
  { src: img8, id: 10 },
];

const model = ref<number | null>(null);
const books = ref<any[]>([]);

onMounted(() => {
  books.value = booksJson;
 
});

const selectedBook = computed(() => {
  const book = model.value !== null ? books.value.find((book) => book.id === images[model.value].id) : null;
 
  return book;
});
</script>

