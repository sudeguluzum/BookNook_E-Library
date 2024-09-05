<template>
  <v-app>
    <v-main>
      <v-container
        class="d-flex justify-center align-center"
        style="height: 100vh"
      >
        <v-col cols="12" md="8">
          <v-row class="mb-12">
            <v-img :src="logo" alt="Login Image" height="100px" />
          </v-row>
          <v-row justify="center">
            <v-card class="pa-5" width="600">
              <v-card-title class="text-center pb-5" style="color: #7e4500">
                Register for Book Nook
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    v-model="name"
                    :rules="[rules.required]"
                    label="Name and Surname"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    :rules="[rules.required, rules.email]"
                    label="Email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    :rules="[rules.required]"
                    :type="showPassword ? 'text' : 'password'"
                    label="Password"
                    required
                  >
                    <template v-slot:append>
                      <v-icon @click="showPassword = !showPassword">
                        {{ showPassword ? "mdi-eye-off" : "mdi-eye" }}
                      </v-icon>
                    </template>
                  </v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  block
                  color="#7e4500"
                  size="x-large"
                  variant="tonal"
                  rounded
                  @click="register"
                >
                  Register
                </v-btn>
              </v-card-actions>
              <div class="text-center mt-3">
                <span>Already have an account? </span>
                <router-link to="/login" style="color: #7e4500">
                  Login
                </router-link>
              </div>
            </v-card>
          </v-row>
        </v-col>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import logo from "../assets/img/logo.png";

export default defineComponent({
  name: "Register",
  setup() {
    const name = ref("");
    const email = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const valid = ref(false);
    const form = ref();

    const rules = {
      required: (value: string) => !!value || "Required.",
      email: (value: string) =>
        /.+@.+\..+/.test(value) || "E-mail must be valid.",
    };

    const register = () => {
      if (form.value.validate()) {
        // Registration logic goes here
        alert(
          `Name: ${name.value}\nEmail: ${email.value}\nPassword: ${password.value}`
        );
      }
    };

    return {
      name,
      email,
      password,
      showPassword,
      valid,
      form,
      rules,
      register,
      logo,
    };
  },
});
</script>
