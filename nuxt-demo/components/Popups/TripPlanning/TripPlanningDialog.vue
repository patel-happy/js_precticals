<template>
  <div>
    <v-dialog
      v-model="show"
      persistent
      no-click-animation
      width="60%"
      max-width="700"
    >
      <v-card>
        <v-card-title class="px-3 py-2" style="background-color: #175282">
          <span style="color: white">Trip Planning</span>
          <v-spacer />

          <v-btn
            @click="show = false"
            fab
            height="20px"
            width="20px"
            elevation="0"
          >
            <v-icon small>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  data() {
    return {};
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style>
</style>