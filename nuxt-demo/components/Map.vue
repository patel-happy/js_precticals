<template>
  <div class="ml-1">
    <GmapMap
    id="map"
      :center="center"
      :zoom="7"
      map-type-id="terrain"
      :style="{ width: this.mapWidth, height: this.mapHeight }"
      :options="{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        disableDefaultUi: false,
        zoomControl: false,
      }"
    >
      <GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center = m.position"
      />
    </GmapMap>
  </div>
</template>

<script>
name: "Map-Component";
export default {
  data() {
    return {
      mapHeight: "",
      mapWidth: '100%',

      center: {
        lat: 25.276987,
        lng: 55.296249,
      },
      markers: [
        {
          name: "Khalifa City",
          position: { lat: 24.421555, lng: 54.576599 },
        },
        {
          name: "Deira",
          position: { lat: 25.266666, lng: 55.316666 },
        },
        {
          name: "Abha, Asir",
          position: { lat: 18.216797, lng: 42.503765 },
        },
        {
          name: "Dammam",
          position: { lat: 26.55168, lng: 49.957581 },
        },
        {
          name: "Al Dhafra, Abu Dhabi",
          position: { lat: 24.184843, lng: 54.499901 },
        },
        {
          name: "Sharjah",
          position: { lat: 25.348766, lng: 55.405403 },
        },
        {
          name: "Abu Dhabi",
          position: { lat: 24.466667, lng: 54.366669 },
        },
        {
          name: "Al Ain",
          position: { lat: 24.2075, lng: 55.74472 },
        },
        {
          name: "Dubai",
          position: { lat: 25.276987, lng: 55.296249 },
        },
      ],
    };
  },
  components: {
    // GmapVue,
    // GmapMarker
  },
  mounted() {
    if (process.browser) {
      this.mapHeight = ((window.innerHeight / 100) * 79).toFixed() + "px";
    }
  },
};
</script>