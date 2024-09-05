<template>
  <div class="sidebar">
    <div class="sidebar-header">
      <img src="../assets/img/logo.png" class="logo" />
    </div>
    <nav>
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.text"
          @click="handleMenuItemClick(item)"
        >
          <span class="icon"
            ><v-icon>{{ item.icon }}</v-icon></span
          >
          <span class="text">{{ item.text }}</span>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const menuItems = ref([
  { text: "Home", icon: "mdi-home" },
  { text: "All Books", icon: "mdi-library-shelves" },
  { text: "My Library", icon: "mdi-bookshelf" },
  { text: "Comment", icon: "mdi-comment" },
  { text: "Logout", icon: "mdi-logout" },
]);
const router = useRouter();

const handleMenuItemClick = (item) => {
  console.log("Clicked item:", item.text);
  if (item.text === "Home") {
    router.push({ name: "Home" });
  } else if (item.text === "All Books") {
    router.push({ name: "AllBooks" });
  } else if (item.text === "My Library") {
    router.push({ name: "MyLibrary" });
  } else if (item.text === "Logout") {
    router.push({ name: "Login" });
  }
};
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  width: 180px;
  height: 100%;
  background: #fff;
  color: #bb9d7a;
  display: flex;
  flex-direction: column;
  border: #bb9d7a solid 0.5px;
  transition: width 0.3s ease, transform 0.3s ease;
  transform: translateX(0);
}
.sidebar-header {
  display: flex;
  justify-content: center;
  padding: 10px;
}

.logo {
  width: 100%;
  max-width: 90px;
  height: auto;
}

nav {
  flex: 1;
  display: flex;
  flex-direction: column;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  display: flex;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  overflow: hidden;
}

nav li .icon {
  margin-right: 10px;
}

nav li .text {
  transition: opacity 0.3s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 1;
}
nav li:hover {
  background: #f2ece5;
  color: #7e4500;
}
</style>
