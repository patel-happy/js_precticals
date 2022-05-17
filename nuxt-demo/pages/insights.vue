<template>
  <div>
    <v-row>
      <v-col cols="3">
      </v-col>
      <v-col :cols="colSize">
      </v-col>
      <v-scroll-x-reverse-transition :hide-on-leave="true" mode="in-out">
        <v-col v-if="!detailsIsEmpty" cols="3">
        </v-col>
      </v-scroll-x-reverse-transition>
    </v-row>
  </div>
</template>

<script>

export default {
  computed: {
    detailsIsEmpty() {
      let obj = this.$store.state.OrderTrip.selectedDetails;
      if (Object.keys(obj).length === 0) {
        return true;
      } else {
        return false;
      }
    },
    colSize() {
      let obj = this.$store.state.OrderTrip.selectedDetails;
      if (Object.keys(obj).length === 0) {
        return 9;
      } else {
        return 6;
      }
    },
  },
};
</script>