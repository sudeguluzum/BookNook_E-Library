<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-col>
      <v-row class="mb-2">
        <v-img :src="logo" alt="Login Image" height="100px" />
      </v-row>
      <v-row justify="center">
        <v-card class="pa-5" width="600">
          <v-card-title class="text-center pb-5" style="color:#7e4500; "
            >Login For Book Nook</v-card-title
          >
          
          <v-card-text>
            <v-form ref="form" v-model="valid">
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
              rounded
              color="#7e4500"
              size="x-large"
              variant="tonal"
              @click="login"
              >Login</v-btn
            >
          </v-card-actions>
          <div class="text-center mt-3">
            <span>Don't have an account? </span>
            <router-link to="register" style="color:#7e4500;"
              >Create an account
            </router-link>
          </div>
        </v-card>
      </v-row>
    </v-col>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import logo from "../assets/img/logo.png";

export default defineComponent({
  name: "Login",
  setup() {
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

    const login = () => {
      if (form.value.validate()) {
        alert(`Email: ${email.value}\nPassword: ${password.value}`);
      }
    };

    return {
      email,
      password,
      showPassword,
      valid,
      form,
      rules,
      login,
      logo,
    };
  },
});
</script>
<style>
*{
  font-family: Mona Sans;
}
</style>