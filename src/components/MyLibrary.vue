<template>
  <v-container style="margin-left: 180px">
    <Sidebar></Sidebar>

    <!-- Currently Reading Shelf -->
    <h1 class="ml-10" style="color: #7e4500; font-family: Mona Sans">
      Currently Reading
    </h1>
    <v-row class="justify-start ml-10">
      <v-col
        v-for="book in currentlyReadingBooks"
        :key="book.id"
        cols="12"
        sm="6"
        md="4"
        lg="2"
        class="d-flex justify-center align-center mt-4 ml-10"
        style="margin-bottom: -2%"
      >
        <v-card class="book-card">
          <v-img
            :src="book.cover"
            aspect-ratio="1"
            class="book-cover justify-start"
          ></v-img>
          <v-card-actions>
            <v-row class="d-flex align-center justify-center">
              <v-col cols="10">
                <v-progress-linear
                  :v-model="getReadingProgress(book)"
                  :value="getReadingProgress(book)"
                  :max="book.pages"
                  color="#bb9d7a"
                  height="18"
                  rounded
                >
                  <template v-slot:default>
                    <p style="margin: 0; text-align: center; color: #7e4500">
                      {{ getReadingProgress(book) }} / {{ book.pages }}
                    </p>
                  </template>
                </v-progress-linear>
              </v-col>

              <v-col cols="2" class="d-flex justify-end align-center pr-4">
                <v-icon
                  density="compact"
                  size="md"
                  color="#bb9d7a"
                  icon="mdi-pencil"
                  class="edit-btn"
                  rounded
                  @click="openProgressDialog(book)"
                >
                </v-icon>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
      <Shelf />
    </v-row>

    <!-- Next Up Shelf -->
    <h1 class="ml-10 mt-12" style="color: #7e4500; font-family: Mona Sans">
      Next Up
    </h1>
    <v-row class="shelf-row justify-start ml-10">
      <v-col
        v-for="book in nextUpBooks"
        :key="book.id"
        cols="12"
        sm="6"
        md="4"
        lg="2"
        class="d-flex justify-center align-center mt-4 ml-10"
        style="margin-bottom: -2%"
      >
        <v-card class="book-card">
          <v-img :src="book.cover" aspect-ratio="1" class="book-cover"></v-img>
          <v-card-actions>
            <v-btn
              density="compact"
              outlined
              color="#bb9d7a"
              prepend-icon="mdi-book-open-page-variant-outline"
              class="add-btn"
              rounded
              @click="addToCurrentlyReading(book)"
            >
              Start to Reading
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <Shelf />
    </v-row>

    <!-- Finished Shelf -->
    <h1 class="ml-10 mt-12" style="color: #7e4500; font-family: Mona Sans">
      Finished
    </h1>
    <v-row class="shelf-row ml-10">
      <v-col
        v-for="book in finishedBooks"
        :key="book.id"
        cols="12"
        sm="6"
        md="4"
        lg="2"
        class="d-flex justify-center align-center mt-4 ml-10"
        style="margin-bottom: -2%"
      >
        <v-img :src="book.cover" aspect-ratio="1" class="book-cover"></v-img>
      </v-col>
      <Shelf />
    </v-row>

    <!-- Progress Dialog -->
    <v-dialog v-model="dialog" max-width="400px">
      <v-card>
        <v-icon @click="dialog = false" class="close-icon" large>
          mdi-close
        </v-icon>
        <v-card-title>
          <span class="headline" style="color: #7e4500"
            >Edit Reading Progress</span
          >
        </v-card-title>
        <v-card-subtitle>
          <v-slider
            v-model="currentPage"
            :max="selectedBook.pages"
            step="1"
            thumb-label
            class="mt-8"
            color="#7e4500"
          >
            <template v-slot:append>
              <v-icon color="#7e4500">mdi-book-open-page-variant</v-icon>
            </template>
          </v-slider>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn
            variant="plain"
            color="#bb9d7a"
            rounded
            @click="addToFinished(selectedBook.value)"
          >
            Finished
          </v-btn>
          <v-btn
            variant="tonal"
            color="#bb9d7a"
            rounded
            @click="updateProgress"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Sidebar from "../components/Sidebar.vue";
import Shelf from "../components/Shelf.vue";
import booksJson from "../assets/booksJson.json";

const books = ref(booksJson);

const currentlyReadingBooks = ref([]);
const nextUpBooks = ref([]);
const finishedBooks = ref([]);

const dialog = ref(false);
const selectedBook = ref<any>(null);
const currentPage = ref(0);

const categorizeBooks = () => {
  currentlyReadingBooks.value = books.value
    .filter((book) => book.status === "currentlyReading")
    .slice(0, 5);
  nextUpBooks.value = books.value
    .filter((book) => book.status === "nextUp")
    .slice(0, 5);
  finishedBooks.value = books.value
    .filter((book) => book.status === "finished")
    .slice(0, 5);
};

categorizeBooks();
watch(books, categorizeBooks);

const addToCurrentlyReading = (book: any) => {
  book.status = "currentlyReading";
  categorizeBooks();
};
const addToFinished = () => {
  if (selectedBook.value) {
    selectedBook.value.status = "finished";
    categorizeBooks();
    dialog.value = false;
  }
};
const getReadingProgress = (book: any) => {
  const currentPage = book.currentPage || 0;
  return currentPage;
};

const openProgressDialog = (book: any) => {
  selectedBook.value = book;
  currentPage.value = book.currentPage || 0;
  dialog.value = true;
};

const updateProgress = () => {
  if (selectedBook.value) {
    selectedBook.value.currentPage = currentPage.value;
    categorizeBooks();
    dialog.value = false;
  }
};
</script>

<style scoped>
.shelf-row {
  margin-bottom: 50px;
}

.book-card {
  width: 100%;
  max-width: 200px;
}

.book-cover {
  height: 200px;
}
.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}
.add-btn {
  text-transform: none;
}
</style>
