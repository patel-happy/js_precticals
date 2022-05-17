<template>
  <v-dialog
    persistent
    no-click-animation
    transition="slide-x-transition"
    max-width="900px"
    width="60%"
    v-model="show"
  >
    <v-card>
      <!------------------------------------------- Driver List ------------------------------------------->
      <v-card-title class="px-3 py-2" style="background-color: #175282">
        <span style="color: white">Driver</span>
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
      <v-scale-transition hide-on-leave mode="in-out" origin="center">
        <v-card-text v-if="active == 'driverList'" class="py-2 px-4">
          <v-row dense>
            <v-col cols="4">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                outlined
                dense
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-on="on"
                    v-bind="attrs"
                    color="#175282"
                    elevation="0"
                    dark
                    fab
                    small
                    @click="active = 'driverAddForm'"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </template>
                <span>Add Driver</span>
              </v-tooltip>
            </v-col>
            <v-col cols="6" class="d-flex justify-end">
              <v-btn
                class="pa-2"
                elevation="0"
                color="#175282"
                @click="active = 'driverBulkUpload'"
              >
                <span style="color: white">Multiple Upload</span>
              </v-btn>
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    elevation="0"
                    width="50px"
                    min-width="45px"
                    color="#175282"
                    dark
                    v-bind="attrs"
                    v-on="on"
                    class="ml-2"
                  >
                    <v-icon>mdi-download</v-icon>
                  </v-btn>
                </template>
                <span>Download current drivers data</span>
              </v-tooltip>
            </v-col>
          </v-row>
          <v-row v-if="DriverList.length !== 0" dense class="pt-2">
            <v-col class="pa-2">
              <v-data-table
                dense
                :headers="headers"
                :items="DriverList"
                :items-per-page="10"
              >
                <template v-slot:[`item.assigned_vehicle`]="{ item }">
                  <span v-if="item.assigned_vehicle == null">Not Provided</span>
                  <span v-else>{{ item.assigned_vehicle }}</span>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card-text>
      </v-scale-transition>
      <!---------------------------------------- Add Driver Form ---------------------------------------->
      <v-scale-transition hide-on-leave mode="in-out" origin="center">
        <v-card-text class="pa-0" v-if="active == 'driverAddForm'">
          <div
            class="pa-2"
            :style="{
              'background-color': $vuetify.theme.dark ? '#546E7A' : '#e6e6e6',
            }"
          >
            <v-btn
              @click="active = 'driverList'"
              style="bottom: 2px !important"
              x-small
              fab
              elevation="0"
              dark
              color="#175282"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <span class="ml-3 text-subtitle-1 font-weight-bold"
              >Add Driver Form</span
            >
          </div>
          <div class="pa-5">
            <v-row dense>
              <v-col cols="2" class="pa-0">
                <v-avatar size="95%">
                  <img src="../../static/2021-01-03.png" />
                </v-avatar>
              </v-col>
              <v-col cols="7" class="pa-0">
                <v-row dense>
                  <v-col cols="8" class="pl-2">
                    <v-text-field
                      hide-details
                      outlined
                      dense
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="pl-2">
                    <v-select
                      hide-details
                      dense
                      outlined
                      label="Project"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="8" class="pl-2">
                    <v-text-field
                      hide-details
                      outlined
                      dense
                      label="Username"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="pl-2">
                    <v-select
                      hide-details
                      dense
                      outlined
                      label="Medical Condition"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col cols="8" class="pl-2">
                    <v-text-field
                      hide-details
                      outlined
                      dense
                      label="WhatsApp Number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4" class="pl-2"> </v-col>
                </v-row>
              </v-col>
              <v-col cols="3" class="d-flex justify-center">
                <div>
                  <v-row dense>
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="shiftStart"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on: onMenu1, attrs }">
                        <v-tooltip right>
                          <template #activator="{ on: onTooltip1 }">
                            <p
                              class="text-h3"
                              v-bind="attrs"
                              v-on="{ ...onMenu1, ...onTooltip1 }"
                            >
                              {{ shiftStart }}
                            </p>
                          </template>
                          <span>Shift Start Time</span>
                        </v-tooltip>
                      </template>
                      <v-time-picker
                        v-if="menu1"
                        v-model="shiftStart"
                        full-width
                        format="ampm"
                        ampm-in-title
                        @click:minute="$refs.menu1.save(shiftStart)"
                      ></v-time-picker>
                    </v-menu>
                  </v-row>
                  <v-row dense>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="shiftEnd"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on: onMenu2, attrs }">
                        <v-tooltip right>
                          <template #activator="{ on: onTooltip2 }">
                            <p
                              class="text-h3"
                              v-bind="attrs"
                              v-on="{ ...onMenu2, ...onTooltip2 }"
                            >
                              {{ shiftEnd }}
                            </p>
                          </template>
                          <span>Shift End Time</span>
                        </v-tooltip>
                      </template>
                      <v-time-picker
                        v-if="menu2"
                        v-model="shiftEnd"
                        full-width
                        format="ampm"
                        ampm-in-title
                        @click:minute="$refs.menu2.save(shiftEnd)"
                      ></v-time-picker>
                    </v-menu>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="pa-5">
            <v-row dense>
              <v-col cols="12" md="4" lg="4" xl="4" class="pa-6">
                <v-row>
                  <v-col cols="12" class="d-flex">
                    <h4>National ID Information</h4>
                  </v-col>
                  <v-col cols="12">
                    <v-btn dark color="#175282" small>
                      <v-icon>mdi-upload</v-icon>
                      <span>Upload Document</span>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" class="pt-1">
                    <v-text-field
                      label="National ID"
                      single-line
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="pt-1">
                    <v-text-field
                      label="Nationality"
                      single-line
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="pt-1">
                    <v-text-field
                      label="Nationality"
                      single-line
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4" lg="4" xl="4" class="pa-6">
                <v-row>
                  <v-col cols="12" class="d-flex">
                    <h4>License Information</h4>
                  </v-col>
                  <v-col cols="12">
                    <v-btn color="#175282" dark small>
                      <v-icon>mdi-upload</v-icon>
                      <span>Upload Document</span>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" class="pt-1">
                    <v-text-field
                      label="License No."
                      single-line
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="pt-1">
                    <v-text-field
                      label="Special License"
                      single-line
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="pt-1">
                    <v-text-field
                      label="License Expiry Date"
                      single-line
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" md="4" lg="4" xl="4" class="pa-6">
                <v-row>
                  <v-col cols="12" class="d-flex">
                    <h4>Visa Information</h4>
                  </v-col>
                  <v-col cols="12">
                    <v-btn dark color="#175282" small>
                      <v-icon>mdi-upload</v-icon>
                      <span>Upload Document</span>
                    </v-btn>
                  </v-col>
                  <v-col cols="12" class="pt-1">
                    <v-text-field
                      label="Visa No."
                      single-line
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="pt-1">
                    <v-text-field
                      label="Country"
                      single-line
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" class="pt-1">
                    <v-text-field
                      label="Expiry Date"
                      single-line
                      hide-details
                      outlined
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-scale-transition>
      <!--------------------------------------- Bulk Upload Driver --------------------------------------->
      <v-scale-transition hide-on-leave mode="in-out" origin="center">
        <v-card-text class="pa-0" v-if="active == 'driverBulkUpload'">
          <div
            class="pa-2"
            :style="{
              'background-color': $vuetify.theme.dark ? '#546E7A' : '#e6e6e6',
            }"
          >
            <v-btn
              @click="active = 'driverList'"
              style="bottom: 2px !important"
              x-small
              fab
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <span class="ml-3 text-subtitle-1 font-weight-bold"
              >Add Multiple Driver</span
            >
          </div>
          <div class="pa-5">
            <v-row dense>
              <v-col cols="12" md="6" lg="6">
                <v-btn color="#175282" small>
                  <span style="color: white">Choose File</span>
                </v-btn>
              </v-col>
              <v-col cols="12" md="6" lg="6" class="d-flex flex-row-reverse">
                <v-btn color="#175282" dark small width="10%">
                  <v-icon>mdi-download</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row dense class="pt-3 px-1">
              <v-alert dense outlined type="warning">
                <p>
                  Mandatory Fields are : Driver Name, Username, Nationality,
                  Whatsapp Mobile Number, License Number, License Expiry,
                  National Id Number, National Id Expiry
                </p>
                <p>
                  Note : The header given in your excel must be same as above
                  Mandatory Fields. For reference download sample excel file.
                </p>
              </v-alert>
            </v-row>
          </div>
        </v-card-text>
      </v-scale-transition>
      <v-card-actions v-if="active == 'driverBulkUpload'">
        <v-row dense class="pr-4 pb-2 d-flex justify-end">
          <v-btn
            class="mr-4"
            :color="$vuetify.theme.dark ? '#546E7A' : '#e6e6e6'"
          >
            <v-icon>mdi-download</v-icon>
            <span class="capitalize">Sample Excel</span>
          </v-btn>
          <v-btn type="submit" color="#175282" dark>Submit</v-btn>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    value: Boolean,
  },
  data() {
    return {
      menu1: false,
      menu2: false,
      shiftStart: "00:00",
      shiftEnd: "00:00",
      search: "",
      active: "driverList",
      headers: [
        {
          text: "Driver Name",
          align: "start",
          sortable: false,
          value: "driver_name",
        },
        { text: "Username", value: "username", sortable: false },
        { text: "Contact Number", value: "contact_number", sortable: false },
        { text: "Project", value: "project", sortable: false },
        { text: "Shift", value: "shift_timing", sortable: false },
        {
          text: "Assigned Vehicle",
          value: "assigned_vehicle",
          sortable: false,
        },
      ],
    };
  },
  methods: {
    backToList() {},
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
        this.active = "driverList";
      },
    },
    DriverList() {
      return this.$store.state.Driver.drivers;
    },
  },
};
</script>