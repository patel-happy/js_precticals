<template>
  <div elevation="8" :style="{ height: this.cardHeight }">
    <div style="height: 100%" v-if="selectedDetails.type == 'order'">
      <v-row style="max-height: 60%">
        <v-col class="pa-0 ma-0">
          <v-card class="mb-2">
            <v-card-subtitle
              class="pa-2 subtitle-2"
              :style="{
                'background-color': coloredOrderStatus(selectedDetails.status),
              }"
            >
              <v-row>
                <v-col class="ml-5 pa-0 font-weight-bold">
                  {{ selectedDetails.reference_number }}
                </v-col>
                <v-col class="py-0 text-right text-capitalize caption">
                  {{ selectedDetails.status }}
                  <v-btn
                    class="ml-2"
                    @click="closeDetails"
                    fab
                    height="20px"
                    width="20px"
                    elevation="0"
                    style="top: -2px"
                  >
                    <v-icon color="teal" small>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-subtitle>
            <v-card-text
              :style="{
                height: this.firstOrderContainer,
              }"
              class="px-3 orderlogsParent"
            >
              <v-row
                v-if="selectedDetails.status !== 'unassigned'"
                class="py-2"
                :style="{
                    'background-color': $vuetify.theme.dark
                      ? '#546E7A'
                      : '#e6e6e6',
                  }"
              >
                <v-col
                  cols="2"
                  md="2"
                  class="pa-0 text-center justify-space-between"
                  
                >
                  <v-avatar color="primary" size="36"></v-avatar>
                </v-col>
                <v-col cols="4" md="4" class="pa-0">
                  <!----------------------- Customer Name with tooltip  ----------------------->
                  <v-tooltip transition="slide-x-reverse-transition" left>
                    <template v-slot:activator="{ on, attrs }">
                      <p
                        v-bind="attrs"
                        v-on="on"
                        class="ma-0 caption font-weight-bold"
                      >
                        {{ selectedDetails.trip_detail.driver_name }}
                      </p>
                    </template>
                    <span>Driver Name</span>
                  </v-tooltip>
                  <v-tooltip transition="slide-x-reverse-transition" left>
                    <template v-slot:activator="{ on, attrs }">
                      <p
                        v-bind="attrs"
                        v-on="on"
                        class="ma-0 caption font-weight-bold"
                      >
                        {{ selectedDetails.trip_detail.driver_number }}
                      </p>
                    </template>
                    <span>Driver Contact Number</span>
                  </v-tooltip>
                </v-col>
                <v-col cols="3" md="3" class="pa-0">
                  <p class="ma-0 caption">Trip</p>
                  <p class="ma-0 caption">Vehicle</p>
                </v-col>
                <v-col cols="3" md="3" class="pa-0">
                  <p class="ma-0 caption font-weight-bold">
                    {{ selectedDetails.trip_detail.trip_reference_number }}
                  </p>
                  <p class="ma-0 caption font-weight-bold">
                    {{ selectedDetails.trip_detail.vehicle_type }}
                  </p>
                </v-col>
              </v-row>
              <!------------------------------- Always Shown Row ------------------------------->
              <v-row class="mx-3 py-2">
                <v-col cols="6" class="text-left pa-0">
                  <v-tooltip transition="slide-x-reverse-transition" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <p
                        v-bind="attrs"
                        v-on="on"
                        class="ma-0 caption font-weight-bold"
                      >
                        {{ selectedDetails.customer_name }}
                      </p>
                    </template>
                    <span>Customer Name</span>
                  </v-tooltip>
                </v-col>
                <v-col cols="6" class="text-right pa-0">
                  <v-tooltip transition="slide-x-reverse-transition" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <p
                        v-bind="attrs"
                        v-on="on"
                        class="ma-0 caption font-weight-bold"
                      >
                        {{ selectedDetails.contact_number }}
                      </p>
                    </template>
                    <span>Contact Number</span>
                  </v-tooltip>
                </v-col>
              </v-row>
              <hr class="mx-2 my-1" />
              <v-row class="mx-3 py-2">
                <v-col cols="3" class="text-left pa-0">
                  <p class="ma-0 caption">Project ID</p>
                  <p class="ma-0 caption">Type</p>
                </v-col>
                <v-col cols="3" class="text-left pa-0">
                  <p class="ma-0 caption font-weight-bold">
                    {{ selectedDetails.project }}
                  </p>
                  <p class="ma-0 caption font-weight-bold text-capitalize">
                    {{ selectedDetails.order_type }}
                  </p>
                </v-col>
                <v-col cols="3" class="text-left pa-0">
                  <p class="ma-0 caption">Type</p>
                  <p class="ma-0 caption">Units</p>
                </v-col>
                <v-col cols="3" class="text-left pa-0">
                  <p class="ma-0 caption font-weight-bold">Trip</p>
                  <p class="ma-0 caption font-weight-bold">
                    {{ selectedDetails.quantity }}
                  </p>
                </v-col>
              </v-row>
              <v-row class="mx-3 py-2 text-left">
                <v-col cols="12" class="pa-0" style="margin: auto">
                  <v-timeline class="text-left" dense align-top>
                    <v-timeline-item fill-dot small left color="teal lighten-4">
                      <p class="ma-0 caption font-weight-bold">
                        Pickup Location
                      </p>
                      <p class="ma-0 caption" style="word-break: break-all">
                        {{ selectedDetails.pickup_address }}
                      </p>
                    </v-timeline-item>
                    <v-timeline-item small fill-dot left color="teal lighten-4">
                      <p class="ma-0 caption font-weight-bold">Drop Location</p>
                      <p class="ma-0 caption" style="word-break: break-all">
                        {{ selectedDetails.drop_address }}
                      </p>
                    </v-timeline-item>
                  </v-timeline>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!------------------------------------------ Order Logs Section ------------------------------------------>
      <v-row style="max-height: 40%">
        <v-col class="pa-0">
          <v-card flat class="my-2">
            <v-card-subtitle
              class="pa-2 subtitle-2"
              :style="{
                'background-color': coloredOrderStatus(selectedDetails.status),
              }"
            >
              <v-row>
                <v-col class="ml-5 pa-0 font-weight-bold">
                  <span v-if="selectedLogs.length == 0"
                    >No Order Logs to show</span
                  >
                  <span v-else>Order Logs</span>
                </v-col>
              </v-row>
            </v-card-subtitle>
            <div
              class="orderlogsParent"
              :style="{ height: this.secondOrderContainer }"
            >
              <div
                v-for="log in selectedLogs"
                class="orderlogsChild ma-2"
                :key="log.index"
              >
                <v-row dense class="mx-1 my-1">
                  <v-col class="pa-0 d-flex justify-center" cols="2">
                    <v-avatar color="black"></v-avatar>
                  </v-col>
                  <v-col class="pa-0 pl-2 d-flex justify-left" cols="7">
                    <span class="caption">{{ log.description }}</span>
                  </v-col>
                  <v-col
                    class="pa-0 pl-2 d-flex justify-left"
                    :style="{
                      'background-color': $vuetify.theme.dark
                        ? '#546E7A'
                        : '#e6e6e6',
                    }"
                    cols="3"
                  >
                    <span class="caption">{{ log.timestamp }}</span>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <!---------------------------------------------------------- Trip Details ---------------------------------------------------------->
    <div v-if="selectedDetails.type == 'trip'">
      <v-row>
        <v-col class="pa-0 ma-0">
          <v-card v-if="selectedDetails.type == 'trip'" class="mb-2">
            <v-card-subtitle
              class="pa-2 subtitle-2"
              :style="{'background-color':coloredTripStatus(selectedDetails.verbose_status)}"
            >
              <v-row >
                <v-col class="ml-5 pa-0"> Trip Details </v-col>
                <v-col class="py-0 text-right">
                  {{ selectedDetails.verbose_status }}
                  <v-btn
                    class="ml-2"
                    @click="closeDetails"
                    fab
                    height="20px"
                    width="20px"
                    elevation="0"
                    style="top: -2px"
                  >
                    <v-icon :color="coloredTripStatus(selectedDetails.verbose_status)" small>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-subtitle>
            <v-card-text class="px-3">
              <v-row
                class="py-2"
                :style="{
                  'background-color': $vuetify.theme.dark
                    ? '#546E7A'
                    : '#e6e6e6',
                }"
              >
                <v-col cols="2" class="pa-0 text-center justify-space-between">
                  <v-avatar
                    :style="{
                      border: $vuetify.theme.dark
                        ? '1px white solid !important'
                        : 'none',
                    }"
                    color="primary"
                    size="36"
                  ></v-avatar>
                </v-col>
                <v-col cols="4" class="pa-0">
                  <p class="ma-0 caption font-weight-bold">
                    {{ selectedDetails.driver_name }}
                  </p>
                  <p class="ma-0 caption">
                    {{ selectedDetails.contact_number }}
                  </p>
                </v-col>
                <v-col cols="3" class="pa-0">
                  <p class="ma-0 caption font-weight-bold">Trip</p>
                  <p class="ma-0 caption font-weight-bold">Vehical</p>
                </v-col>
                <v-col cols="3" class="pa-0">
                  <p class="ma-0 caption">Trip</p>
                  <p class="ma-0 caption">Vehical</p>
                </v-col>
              </v-row>
              <v-row class="mx-3 border-bottom py-2">
                <v-col cols="6" class="text-left pa-0">
                  <p class="ma-0 caption">Trip</p>
                </v-col>
                <v-col cols="6" class="text-right pa-0">
                  <p class="ma-0 caption">00-00-0000 00:00</p>
                </v-col>
              </v-row>
              <v-row class="mx-3 py-2">
                <v-col cols="3" class="text-left pa-0">
                  <p class="ma-0 caption">Project ID</p>
                  <p class="ma-0 caption">Type</p>
                </v-col>
                <v-col cols="3" class="text-left pa-0">
                  <p class="ma-0 caption font-weight-bold">DVSY1</p>
                  <p class="ma-0 caption font-weight-bold">Trip</p>
                </v-col>
                <v-col cols="3" class="text-left pa-0">
                  <p class="ma-0 caption">Type</p>
                  <p class="ma-0 caption">Units</p>
                </v-col>
                <v-col cols="3" class="text-left pa-0">
                  <p class="ma-0 caption font-weight-bold">Trip</p>
                  <p class="ma-0 caption font-weight-bold">Trip</p>
                </v-col>
              </v-row>
              <v-row class="mx-3 py-2">
                <v-col cols="12" class="pa-0" style="margin: auto">
                  <v-timeline dense align-top>
                    <v-timeline-item small left>
                      <p class="ma-0 caption">Pickup Location</p>
                      <p
                        class="ma-0 caption font-weight-bold"
                        style="word-break: break-all"
                      >
                        rg,saer;,gvsoer,vp[sgpisjbvpokpvbktbjkvotbopimtbsmpob[sp,[kgbhsotrbnsonetbvmtr;b
                      </p>
                    </v-timeline-item>
                    <v-timeline-item small left>
                      <p class="ma-0 caption">Drop Location</p>
                      <p
                        class="ma-0 caption font-weight-bold"
                        style="word-break: break-all"
                      >
                        rg,saer;,gvsoer,vp[sgpisjbvpokpvbktbjkvotbopimtbsmpob[sp,[kgbhsotrbnsonetbvmtr;b
                      </p>
                    </v-timeline-item>
                  </v-timeline>
                </v-col>
              </v-row>
              <v-divider></v-divider>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!--------------------------------------- Trip Logs Section --------------------------------------->
      <!-- <v-row>
        <v-col class="pa-0">
          <v-card flat class="my-2">
            <v-card-subtitle class="pa-2 subtitle-2 teal lighten-4">
              <v-row>
                <v-col class="ml-5 pa-0 font-weight-bold">
                  <span v-if="selectedLogs.length == 0"
                    >No Order Logs to show</span
                  >
                  <span v-else>Order Logs</span>
                </v-col>
              </v-row>
            </v-card-subtitle>
            <div class="orderlogsParent">
              <div
                v-for="log in selectedLogs"
                class="orderlogsChild ma-2"
                :key="log.index"
              >
                <v-row dense class="mx-1 my-1">
                  <v-col class="pa-0 d-flex justify-center" cols="2">
                    <v-avatar color="black"></v-avatar>
                  </v-col>
                  <v-col class="pa-0 pl-2 d-flex justify-center" cols="7">
                    <span class="caption">{{ log.description }}</span>
                  </v-col>
                  <v-col
                    class="pa-0 pl-2 d-flex justify-center"
                    :style="{
                      'background-color': $vuetify.theme.dark
                        ? '#546E7A'
                        : '#e6e6e6',
                    }"
                    cols="3"
                  >
                    <span class="caption">{{ log.timestamp }}</span>
                  </v-col>
                </v-row>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cardHeight: "",
      firstOrderContainer: "",
      secondOrderContainer: "",
    };
  },
  computed: {
    selectedDetails() {
      return this.$store.state.OrderTrip.selectedDetails;
    },
    selectedLogs() {
      if (this.$store.state.OrderTrip.selectedDetails.logs.logs) {
        return this.$store.state.OrderTrip.selectedDetails.logs.logs;
      }
    },
  },
  mounted() {
    if (process.browser) {
      this.cardHeight = (window.innerHeight * 0.85).toFixed() + "px";
      this.firstOrderContainer =
        ((window.innerHeight * 0.85).toFixed() - 80) * 0.6 + "px";
      this.secondOrderContainer =
        ((window.innerHeight * 0.85).toFixed() - 80) * 0.4 + "px";
    }
  },
  methods: {
    closeDetails() {
      const obj = {};
      this.$store.commit("OrderTrip/GET_SELECTED_ORDER_DETAILS", obj);
    },
    coloredOrderStatus(status) {
      switch (status) {
        case "unassigned":
          return "#3f3f3f";
        case "assigned":
          return "#1ab7d0";
        case "picked_up":
          return "#f28c33";
        case "delivery-attempted":
          return "#15895f";
        case "delivered":
          return "#79c267";
        case "returned":
          return "#9e1d1d";
        case "cancelled":
          return "#ff6663";

        default:
          return "#ffffff";
      }
    },
    coloredTripStatus(status) {
      switch (status.toLowerCase()) {
        case "created":
          return "#f28c33";
        case "scheduled":
          return "#bf62a6";
        case "active":
          return "#79c267";
        case "paused":
          return "#cdcdcd";
        case "completed":
          return "#15895f";
        case "cancelled":
          return "#ff6663";

        default:
          return "#ffffff";
      }
    },
  },
};
</script>

<style scoped>
.sm-shadow {
  box-shadow: 0px 4px 20px -16px black;
}
.border-bottom {
  border-bottom: solid 1px #cecece;
}

.theme--light.v-timeline:before {
  height: 50%;
  top: 18%;
}
.theme--dark.v-timeline:before {
  height: 50%;
  top: 18%;
}

.orderlogsParent {
  /* height: 20%; */
  overflow-y: scroll;
}

.orderlogsChild {
  border: 1px #e6e6e6 solid;
  border-radius: 5px 5px 5px 5px;
}
</style>