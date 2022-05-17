<template>
  <div>
    <v-row class="bg mt-2">
      <v-col cols="6">
        <span class="text-h4 font-weight-bold">Trip Planning</span>
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              small
              depressed
              v-bind="attrs"
              v-on="on"
              class="font-weight-bold"
              color="#175282"
              dark
            >
              <span>Trip Planning</span>
              <v-icon small>mdi-chevron-down</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="showTripPlanningDialog = true">
              <v-list-item-title>Plan My Trips</v-list-item-title>
            </v-list-item>
            <v-list-item @click="showTemplateDialog = true">
              <v-list-item-title>Templates</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-btn class="ml-3" small depressed to="/insights" color="#175282" dark>
          <span>Insights</span>
        </v-btn>
      </v-col>
    </v-row>

    <!----------------------------------- Total showing panel ----------------------------------->

    <div class="ma-2 pa-1">
      <v-row dense>
        <v-col cols="4" lg="2" md="2">
          <v-card>
            <v-card-title class="bg2 pa-1 d-flex align-center justify-center">
              <span class="text-body-1"> Total order</span>
            </v-card-title>
            <v-card-text class="text-h3 pa-1 d-flex justify-center">
              <span>0000</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" lg="2" md="2">
          <v-card>
            <v-card-title class="bg2 pa-1 d-flex align-center justify-center">
              <span class="text-body-1"> Total order</span>
            </v-card-title>
            <v-card-text class="text-h3 pa-1 d-flex justify-center">
              <span>0000</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" lg="2" md="2">
          <v-card>
            <v-card-title class="bg2 pa-1 d-flex align-center justify-center">
              <span class="text-body-1"> Total order</span>
            </v-card-title>
            <v-card-text class="text-h3 pa-1 d-flex justify-center">
              <span>0000</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" lg="2" md="2">
          <v-card>
            <v-card-title class="bg2 pa-1 d-flex align-center justify-center">
              <span class="text-body-1"> Total order</span>
            </v-card-title>
            <v-card-text class="text-h3 pa-1 d-flex justify-center">
              <span>0000</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" lg="2" md="2">
          <v-card>
            <v-card-title class="bg2 pa-1 d-flex align-center justify-center">
              <span class="text-body-1"> Total order</span>
            </v-card-title>
            <v-card-text class="text-h3 pa-1 d-flex justify-center">
              <span>0000</span>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="4" lg="2" md="2">
          <v-card>
            <v-card-title class="bg2 pa-1 d-flex align-center justify-center">
              <span class="text-body-1"> Total order</span>
            </v-card-title>
            <v-card-text class="text-h3 pa-1 d-flex justify-center">
              <span>0000</span>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!----------------------------------- Trip planning result ----------------------------------->

      <v-row class="mt-4">
        <v-col cols="6">
          <span class="text-h5 font-weight-bold">Trip Planning Result</span>
        </v-col>

        <v-col cols="6" class="d-flex justify-end">
          <v-btn class="ml-3" small depressed color="#175282" dark>
            <span>Add new Trip</span>
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="3" class="pr-4 py-0">
          <!-------------------------------- Project list -------------------------------->
          <div>
            <div class="bg3 py-1 text-center">Project List</div>
            <div id="projectParentContainer" class="pa-3 bg">
              <v-card>
                <v-card-title class="py-1 pl-4 bg2">
                  <span class="caption"> Project Title </span>
                  <v-spacer />
                  <v-btn fab height="17px" width="17px" elevation="0">
                    <v-icon small color="#58595b">mdi-close</v-icon>
                  </v-btn>
                </v-card-title>
                <v-card-text class="py-2">
                  <v-row dense>
                    <v-col cols="6">
                      <span>Vehicle left</span>
                    </v-col>
                    <v-col cols="6" class="d-flex justify-end font-weight-bold">
                      <span>9 / 9</span>
                    </v-col>
                    <v-col cols="6">
                      <span>Planned Orders</span>
                    </v-col>
                    <v-col cols="6" class="d-flex justify-end font-weight-bold">
                      <span>9 / 9</span>
                    </v-col>
                    <v-col cols="6">
                      <span>Drop Points</span>
                    </v-col>
                    <v-col cols="6" class="d-flex justify-end font-weight-bold">
                      <span>9 / 9</span>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions class="d-flex justify-end pb-3 px-3">
                  <v-btn class="ml-3" x-small depressed color="#175282" dark>
                    <span>Create Trips</span>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </div>
        </v-col>
        <v-col cols="6" class="px-4 py-0">
          <div class="pa-3">
            <v-tabs class="titleBar" centered>
              <v-tab>Generated Trips</v-tab>
              <v-tab>Vahicle Assignment</v-tab>
              <v-tab-item eager class="pt-3">
                <div id="tripContainer" class="Container bg">
                  <div v-for="trip in trips" :key="trip.id">
                    <v-card class="ma-3">
                      <v-card-title class="bg3 px-2 py-1">
                        <v-icon dark>mdi-truck</v-icon>
                        <span class="ml-3"> Vechicle number </span>
                        <v-spacer />
                        <v-btn
                          class="mr-2"
                          @click="trip.expand = !trip.expand"
                          fab
                          height="20px"
                          width="20px"
                          elevation="0"
                        >
                          <v-icon small v-if="!trip.expand" color="#175282"
                            >mdi-window-maximize</v-icon
                          >
                          <v-icon color="#175282" small v-else
                            >mdi-window-minimize
                          </v-icon>
                        </v-btn>
                        <v-btn
                          @click="removeTrip(trip.id)"
                          fab
                          height="20px"
                          width="20px"
                          elevation="0"
                        >
                          <v-icon small color="#175282">mdi-close</v-icon>
                        </v-btn>
                      </v-card-title>
                      <v-expand-transition>
                        <v-card-text v-if="trip.expand == true">
                          <v-row dense class="pt-2">
                            <v-col cols="3">
                              <v-text-field
                                label="Ref number"
                                dense
                                outlined
                                hide-details
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="3">
                              <v-text-field
                                label="Vehicle"
                                dense
                                outlined
                                hide-details
                              >
                              </v-text-field>
                            </v-col>
                            <v-col cols="3">
                              <v-text-field
                                label="Driver"
                                dense
                                outlined
                                hide-details
                              >
                              </v-text-field>
                            </v-col>

                            <v-col class="d-flex align-center justify-end">
                              <v-icon color="#175282" class="pl-2">
                                mdi-file-document</v-icon
                              >
                              <v-icon color="#175282" class="pl-2">
                                mdi-map-marker</v-icon
                              >
                              <v-icon color="#175282" class="pl-2">
                                mdi-clock</v-icon
                              >
                            </v-col>
                          </v-row>
                          <div>
                            <v-data-table> </v-data-table>
                          </div>
                        </v-card-text>
                      </v-expand-transition>
                    </v-card>
                  </div>
                </div>
                <div class="d-flex justify-end">
                  <v-btn
                    @click="addNewTrip()"
                    class="ma-3"
                    small
                    depressed
                    color="#175282"
                    dark
                  >
                    <span>Add new Trip</span>
                  </v-btn>
                </div>
              </v-tab-item>
              <v-tab-item eager>
                <div id="vehicleAssignmentContainer" class="Container bg"></div>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-col>
        <v-col cols="3">
          <div id="unassignedParentDiv" class="Container bg pa-2">
            <v-card>
              <v-card-title class="py-1 pl-4 py-1 text-center bg3">
                <span class="body"> Unassigned Orders </span>
                <v-spacer />
                <v-btn fab height="17px" width="17px" elevation="0">
                  <v-icon small color="#58595b">mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-card-text class="py-2">
                <v-row dense>
                  <v-col cols="6">
                    <span>Vehicle left</span>
                  </v-col>
                  <v-col cols="6" class="d-flex justify-end font-weight-bold">
                    <span>9 / 9</span>
                  </v-col>
                  <v-col cols="6">
                    <span>Planned Orders</span>
                  </v-col>
                  <v-col cols="6" class="d-flex justify-end font-weight-bold">
                    <span>9 / 9</span>
                  </v-col>
                  <v-col cols="6">
                    <span>Drop Points</span>
                  </v-col>
                  <v-col cols="6" class="d-flex justify-end font-weight-bold">
                    <span>9 / 9</span>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trips: [
        { id: 0, expand: false },
        { id: 1, expand: false },
        { id: 2, expand: false },
      ],
    };
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
  methods: {
    addNewTrip() {
      let p = {};
      p.id = this.trips.length + 1;
      p.expand = false;
      this.trips.push(p);
    },
    removeTrip(id) {
      console.log();
      this.trips.pop(this.trips.find((v) => v.id == id));
    },
  },
  mounted() {
    if (process.browser) {
      const height = ((window.innerHeight / 100) * 32).toFixed() + "px";
      document.getElementById("tripContainer").style.height = height;
      document.getElementById(
        "vehicleAssignmentContainer"
      ).style.height = height;

      const height1 = ((window.innerHeight / 100) * 49).toFixed() + "px";
      document.getElementById("unassignedParentDiv").style.height = height1;

      const height2 = ((window.innerHeight / 100) * 47).toFixed() + "px";
      document.getElementById("projectParentContainer").style.height = height2;
    }
  },
};
</script>

<style  scoped>
.bg {
  background-color: #e6e6e6;
}

.bg2 {
  background-color: #58595b;
  color: #ffffff;
}

.bg3 {
  background-color: #175282;
  color: #ffffff;
}

.h {
  height: 5%;
}
.Container {
  overflow-y: auto;
}
</style>