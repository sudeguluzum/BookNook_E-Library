import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Home from "./views/Home.vue";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";
import AllBooks from "./components/AllBooks.vue";
import Shelf from "./components/Shelf.vue";
import MyLibrary from "./components/MyLibrary.vue";

const routes = [
  { path: "/", component: Login },
  { path: "/login", name:"Login",component: Login },
  { path: "/register", name:"Register", component: Register },
  { path: "/home", name:'Home',component: Home },
  { path: "/sidebar", component: Sidebar },
  { path: "/header", component: Header },
  { path: "/AllBooks", name: 'AllBooks', component: AllBooks },
  { path: "/MyLibrary", name: 'MyLibrary', component: MyLibrary },
  { path: "/shelf", component: Shelf },

  
  

];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
