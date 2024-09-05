<template>
  <v-container style="margin-left: 180px;">
    <Sidebar></Sidebar>
    <h1 class="d-flex justify-center my-3" style="color:#7e4500; font-family:Mona Sans;">All Books</h1>
    
    <v-row v-for="(bookRow, index) in booksInRows" :key="index" class="justify-center">
      <v-col
        v-for="book in bookRow"
        :key="book.id"
        cols="12"
        sm="6"
        md="4"
        lg="2"
        class="d-flex justify-center align-center mt-8"
        style="margin-bottom: -2%;"
        @click="openDialog(book)"
      >
        <v-img :src="book.cover" aspect-ratio="1" class="book-cover"></v-img>
      </v-col>
      <Shelf/>
    </v-row>

    <v-dialog v-model="dialog" max-width="1000px">
      <v-card class="py-8">
       
        <v-icon
          @click="dialog = false"
          class="close-icon"
          large
        >
          mdi-close
        </v-icon>

        <v-row>
          <v-col cols="5" class="d-flex align-center">
            <v-img :src="selectedBook.cover" class="book-cover-large" />
          </v-col>
          <v-col cols="7" style="color:#7e4500; font-family:Mona Sans;">
            <v-card-title> <strong>{{ selectedBook.name }}</strong></v-card-title>
            <v-card-subtitle>{{ selectedBook.author }}</v-card-subtitle>
            <v-card-text class="mr-8">
              <p>{{ selectedBook.text }}</p>
              <p class="mt-4"><strong>Pages:</strong> {{ selectedBook.pages }}</p>
            </v-card-text>
            <v-card-actions>
              <v-btn variant="tonal" color="#bb9d7a" prepend-icon="mdi-bookshelf" class="add-btn" rounded  @click="addToNextUp(selectedBook)">Add My Library</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import Shelf from '../components/Shelf.vue';
import booksJson from '../assets/booksJson.json';

const booksInRows = computed(() => {
  const rows = [];
  for (let i = 0; i < booksJson.length; i += 5) {
    rows.push(booksJson.slice(i, i + 5));
  }
  return rows;
});

const dialog = ref(false);
const selectedBook = ref<any>({});

const openDialog = (book: any) => {
  selectedBook.value = book;
  dialog.value = true;
};
const addToNextUp = (book: any) => {
  book.status = 'nextUp';
  dialog.value = false;
};
</script>

<style scoped>
.book-cover {
  height: 200px;
  cursor: pointer;
}

.book-cover-large {
  height: 400px;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.add-btn:hover{
  color:#7e4500;
}
</style>
