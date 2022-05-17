<template>
  <div>
    <v-row>
      <v-col cols="3">
        <OrderTrip />
      </v-col>
      <v-col :cols="colSize" class="pt-0">
        <v-card elevation="2" class="px-4 pt-0 pb-4">  
          <v-app-bar class="ml-1" height="50%" elevation="0">
            <v-spacer />
            <div>
              <v-menu bottom offset-y transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    depressed
                    text
                    v-bind="attrs"
                    v-on="on"
                    class="no-background-hover"
                  >
                    My Fleets
                    <v-icon right class="ml-1"> mdi-chevron-down </v-icon>
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item @click="showDriverList = true">
                    <v-list-item-title>Driver</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="showVehicleList = true">
                    <v-list-item-title>Vehicle</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <!------------------------------------------------------------- Status Menu ------------------------------------------------------------->
              <v-menu bottom offset-y transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    depressed
                    text
                    v-bind="attrs"
                    v-on="on"
                    class="no-background-hover"
                  >
                    Status
                    <v-icon right class="ml-1"> mdi-chevron-down </v-icon>
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item @click="showDriverStatuses = true">
                    <v-list-item-title>Driver statuses</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="showVehicleStatuses = true">
                    <v-list-item-title>Vehicle statuses</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="showTripStatuses = true">
                    <v-list-item-title>Trip statuses</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="showOrderStatuses = true">
                    <v-list-item-title>Order statuses</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="showCustomStatuses = true">
                    <v-list-item-title>Custom statuses</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <!------------------------------------------------------------- Report Menu ------------------------------------------------------------->
              <v-menu
                :close-on-content-click="false"
                max-width="15%"
                bottom
                offset-y
                transition="slide-x-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    depressed
                    text
                    v-bind="attrs"
                    v-on="on"
                    class="no-background-hover"
                  >
                    Report
                    <v-icon right class="ml-1"> mdi-chevron-down </v-icon>
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item @click="showReportModel = true; reportFor = 'Trip'">
                    <v-list-item-title>Trip</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="showReportModel = true; reportFor = 'Order'">
                    <v-list-item-title>Order</v-list-item-title>
                  </v-list-item>
                  <v-list-group :value="false">
                    <template v-slot:activator>
                      <v-list-item class="pa-0">
                        <v-list-item-title>Driver</v-list-item-title>
                      </v-list-item>
                    </template>

                    <v-list-item @click="showReportModel = true; reportFor = 'Driver Attendance'">
                      <v-list-item-title>Attendance Report</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="showReportModel = true; reportFor = 'Order Delivery'">
                      <v-list-item-title
                        >Order Delivery Report</v-list-item-title
                      >
                    </v-list-item>
                    <v-list-item @click="showReportModel = true; reportFor = 'Driver Trips'">
                      <v-list-item-title>Driver Trips Report</v-list-item-title>
                    </v-list-item>
                  </v-list-group>
                </v-list>
              </v-menu>

              <!------------------------------------------------------------- Project Menu ------------------------------------------------------------->
              <v-menu bottom offset-y transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    depressed
                    text
                    v-bind="attrs"
                    v-on="on"
                    class="no-background-hover"
                  >
                    Project
                    <v-icon right class="ml-1"> mdi-chevron-down </v-icon>
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item @click="showProjectList = true">
                    <v-list-item-title>Project List</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="showProjectAssignment = true">
                    <v-list-item-title>Project Assignment</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>

              <!------------------------------------------------------------- Customers Menu ------------------------------------------------------------->
              <v-menu bottom offset-y transition="slide-x-transition">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    small
                    depressed
                    text
                    v-bind="attrs"
                    v-on="on"
                    class="no-background-hover"
                  >
                    Customers
                    <v-icon right class="ml-1"> mdi-chevron-down </v-icon>
                  </v-btn>
                </template>
                <v-list dense>
                  <v-list-item @click="showCustomerList = true">
                    <v-list-item-title>Customer List</v-list-item-title>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-title>Customer Address</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <v-spacer />
          </v-app-bar>
          <Map />
        </v-card>
      </v-col>
      <v-scroll-x-reverse-transition :hide-on-leave="true" mode="in-out">
        <v-col v-if="!detailsIsEmpty" cols="3">
          <Details />
        </v-col>
      </v-scroll-x-reverse-transition>
    </v-row>
    <DriverDialog v-model="showDriverList"/>
    <ReportDialog v-model="showReportModel" :reportFor="reportFor" />
  </div>
</template>

<script>

import Details from "~/components/Details.vue";
import Map from "~/components/Map.vue";
import OrderTrip from "~/components/OrderTrip.vue";
import DriverDialog from "~/components/Popups/DriverDialog";
import ReportDialog from "~/components/Popups/reportDialog";

export default {
  components: { OrderTrip, Map, Details },
  data(){
    return{
      showDriverList:false,
      reportFor: "",
      showReportModel: false,
    }
  },
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
  mounted(){
    
  }
};
</script>