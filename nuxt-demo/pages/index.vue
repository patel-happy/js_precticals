<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-form>
          <v-card class="elevation-12">
            <v-toolbar dark color="brown">
              <v-spacer></v-spacer>
              <v-toolbar-title>Login</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-alert color="error" dismissible :value="error"
              >The username or password is incorrect</v-alert
            >
            <v-card-text>
              <v-text-field
                v-model="username"
                prepend-icon="mdi-account-circle"
                name="username"
                label="Username"
                type="text"
              ></v-text-field>
              <v-text-field
                v-model="password"
                prepend-icon="mdi-lock-outline"
                name="password"
                label="Password"
                type="password"
                @keydown.enter="onSubmit()"
              ></v-text-field>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-btn outlined color="primary" @click.prevent="onSubmit()"
                >Login</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  layout: "auth",
  data() {
    return {
      username: "",
      password: "",
      error: null,
    };
  },
  methods: {
    onSubmit() {
      this.$store
        .dispatch("User/LOGIN", {
          username: this.username,
          password: this.password,
        })
        .then((success) => {
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          this.error = true;
        });
    },
  },
};
</script>