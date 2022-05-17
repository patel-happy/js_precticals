<template>
  <div id="OrderTrip" class="pl-1">
    <!--------------------------------------------- Buttons For performing different actions --------------------------------------------->
    <!-- <div class="parent">
      <v-menu offset-y>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip top>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                depressed
                text
                :small="$vuetify.breakpoint.lgAndDown"
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
                class="px-0"
                style="border-radius: 20px; min-width: 30px"
              >
                <v-icon>mdi-alpha-s</v-icon>
              </v-btn>
            </template>
            <span v-show="active_tab == 0">Filter by Order status</span>
            <span v-show="active_tab == 1">Filter by Trip status</span>
          </v-tooltip>
        </template>
        <v-list dense v-show="active_tab == 0">
          <v-list-item>All Orders</v-list-item>
          <v-list-item>Unassigned</v-list-item>
          <v-list-item>Assigned</v-list-item>
          <v-list-item>Picked up</v-list-item>
          <v-list-item>Delivery Attempted</v-list-item>
          <v-list-item>Delivered</v-list-item>
          <v-list-item>Returned</v-list-item>
          <v-list-item>Cancelled</v-list-item>
        </v-list>
        <v-list dense v-show="active_tab == 1">
          <v-list-item>All Trip</v-list-item>
          <v-list-item>Created</v-list-item>
          <v-list-item>Scheduled</v-list-item>
          <v-list-item>Active</v-list-item>
          <v-list-item>Paused</v-list-item>
          <v-list-item>Completed</v-list-item>
          <v-list-item>Cancelled</v-list-item>
        </v-list>
      </v-menu>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            text
            :small="$vuetify.breakpoint.lgAndDown"
            v-bind="attrs"
            v-on="on"
            class="px-0"
            style="border-radius: 20px; min-width: 30px"
          >
            <v-icon>mdi-refresh</v-icon>
          </v-btn>
        </template>
        <span v-show="active_tab == 0">Refresh Orders</span>
        <span v-show="active_tab == 1">Refresh Trips</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            text
            :small="$vuetify.breakpoint.lgAndDown"
            v-bind="attrs"
            v-on="on"
            @click="DateField = !DateField"
            class="px-0"
            style="border-radius: 20px; min-width: 30px"
          >
            <v-icon>mdi-filter</v-icon>
          </v-btn>
        </template>
        <span v-show="active_tab == 0">Filter orders by date range</span>
        <span v-show="active_tab == 1">Filter trips by date range</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            depressed
            text
            :small="$vuetify.breakpoint.lgAndDown"
            v-bind="attrs"
            v-on="on"
            class="px-0"
            style="border-radius: 20px; min-width: 30px"
          >
            <v-icon>mdi-arrow-up-bold</v-icon>
          </v-btn>
        </template>
        <span v-show="active_tab == 0">Sort Orders</span>
        <span v-show="active_tab == 1">Sort Trips</span>
      </v-tooltip>

      <v-menu offset-y>
        <template v-slot:activator="{ on: menu, attrs }">
          <v-tooltip top>
            <template v-slot:activator="{ on: tooltip }">
              <v-btn
                depressed
                text
                :small="$vuetify.breakpoint.lgAndDown"
                v-bind="attrs"
                v-on="{ ...tooltip, ...menu }"
                class="px-0"
                style="border-radius: 20px; min-width: 30px"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </template>
            <span v-show="active_tab == 0">Add Order</span>
            <span v-show="active_tab == 1">Add Trip</span>
          </v-tooltip>
        </template>
        <v-list>
          <v-list-item @click.stop="showNewOrderForm = true"
            >Create New Order</v-list-item
          >
          <v-list-item>Upload Orders</v-list-item>
          <v-list-item @click="showNewTripForm = true"
            >Create New Trip</v-list-item
          >
          <v-list-item>Upload Trips</v-list-item>
        </v-list>
      </v-menu>
    </div> -->
    <!------------------------------------------------------------ Search Field ------------------------------------------------------------>
    <v-row class="no-gutters">
      <v-col cols="10">
        <v-text-field
          class="customP mb-2"
          v-model="searchText"
          dense
          full-width
          outlined
          clearable
          hide-details
          :label="checkActiveTab()"
          prepend-inner-icon="mdi-magnify"
        >
        </v-text-field>
      </v-col>
      <v-col cols="2" class="text-right">
        <v-menu offset-y>
          <template v-slot:activator="{ on: menu, attrs }">
            <v-btn
              color="#175282"
              v-bind="attrs"
              v-on="{ ...menu }"
              elevation="0"
              dark
              fab
              small
            >
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click.stop="showNewOrderForm = true"
              >Create New Order</v-list-item
            >
            <v-list-item>Upload Orders</v-list-item>
            <v-list-item @click="showNewTripForm = true"
              >Create New Trip</v-list-item
            >
            <v-list-item>Upload Trips</v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
    <v-row class="mr-1 mb-2">
      <v-col cols="6" class="pa-0">
        <v-select
          class="pl-3"
          v-model="sortingType"
          :items="sortingTypes"
          item-text="name"
          item-value="value"
          dense
          outlined
          hide-details
        >
          <template slot="item" slot-scope="data">
            <v-avatar :color="data.item.color" size="16"></v-avatar>
            <span class="ml-2 caption">{{ data.item.name }}</span>
          </template>
        </v-select>
      </v-col>
      <v-col cols="2" class="pa-0 text-center">
        <v-btn
          color="#175282"
          elevation="0"
          dark
          class="mx-3"
          height="100%"
          min-width="80%"
          width="75%"
        >
          <v-icon size="17">mdi-calendar</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2" class="pa-0">
        <v-btn
          color="#175282"
          elevation="0"
          dark
          class="mx-3"
          height="100%"
          min-width="80%"
          width="75%"
        >
          <v-icon size="17">mdi-refresh</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2" class="pa-0">
        <v-btn
          color="#175282"
          elevation="0"
          dark
          class="mx-3"
          height="100%"
          min-width="80%"
          width="75%"
        >
          <v-icon size="17">mdi-filter</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!----------------------------------------------------------- Dialogs defination ----------------------------------------------------------->

    <!-------------------------------------------------------------- Tab Card -------------------------------------------------------------->
    <div>
      <v-tabs center-active grow v-model="active_tab">
        <v-tab v-for="tab of tabs" :key="tab.index">
          {{ tab.name }}
        </v-tab>
        <v-tab-item eager>
          <div
            id="order"
            class="mainTab HandleScroll ml-1"
            @scroll="scrollControl('order')"
          >
            <div v-for="(order, index) in Orders" :key="index">
              <v-expand-transition>
                <div
                  :draggable="order.status == 'unassigned'"
                  @dragstart="startDrag($event, order, index)"
                  @click="showOrderDetails(order.order_id)"
                  append
                  class="card ml-1 mt-2"
                  :id="'order' + index"
                  v-if="Object.keys(order).length !== 0"
                >
                  <div
                    :style="{
                      'background-color': $vuetify.theme.dark
                        ? '#546E7A'
                        : '#e6e6e6',
                      'border-radius': '4px 4px 0px 0px',
                    }"
                    class="pb-2 pt-3 px-3"
                  >
                    <v-row>
                      <v-col cols="12" lg="7" class="pa-0 text-left">
                        <v-avatar
                          size="20"
                          :color="coloredOrderStatus(order.status)"
                          class="mx-2"
                          style="bottom: 2px"
                        ></v-avatar>
                        <span
                          :id="'order' + index + '-reference-number'"
                          class="font-weight-bold"
                          >{{ order.reference_number }}</span
                        >
                      </v-col>
                      <v-col
                        :id="'order' + index + '-status'"
                        cols="12"
                        lg="5"
                        class="py-0 text-sm-body-2 text-right text-capitalize"
                        >{{ order.status }}</v-col
                      >
                    </v-row>
                  </div>
                  <v-row>
                    <v-col cols="12" lg="7" class="px-2 py-2">
                      <div class="ml-3">
                        <v-icon size="20">mdi-briefcase</v-icon>
                        <span
                          class="text-break pl-1"
                          style="font-size: 0.8em; white-space: normal"
                          :id="'order' + index + '-project'"
                        >
                          {{ order.project }}</span
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" lg="5" class="px-2 py-2">
                      <div :class="$vuetify.breakpoint.mdAndDown ? 'ml-3' : ''">
                        <v-icon size="20">mdi-calendar</v-icon>
                        <span
                          class="text-break pl-1"
                          style="font-size: 0.8em; white-space: normal"
                          :id="'order' + index + '-location-date'"
                        >
                          {{ order.location_date }}</span
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" lg="7" class="px-2 pb-3 pt-1">
                      <div class="ml-3">
                        <v-icon size="20">mdi-account</v-icon>
                        <span
                          class="pl-1"
                          style="font-size: 0.8em"
                          :id="'order' + index + '-customer-name'"
                        >
                          {{ order.customer_name }}</span
                        >
                      </div>
                    </v-col>
                    <v-col cols="12" lg="5" class="px-2 pb-3 pt-1">
                      <div :class="$vuetify.breakpoint.mdAndDown ? 'ml-3' : ''">
                        <v-icon size="20">mdi-clock-time-four</v-icon>
                        <span
                          class="text-break pl-1"
                          style="font-size: 0.8em; white-space: normal"
                          :id="'order' + index + '-location-time'"
                        >
                          {{ order.location_time }}</span
                        >
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-expand-transition>
            </div>
          </div>
        </v-tab-item>
        <!------------------------------------------------- Trips Tab ------------------------------------------------->
        <v-tab-item eager>
          <div
            class="HandleScroll mainTab"
            id="trip"
            @scroll="scrollControl('trip')"
          >
            <div
              v-for="(trip, index) in Trips"
              :draggable="trip.status == 'unassigned'"
              @dragstart="startDrag($event, index)"
              @click="showTripDetails(trip.trip_id)"
              :key="index"
              append
              class="card ml-1 mt-2"
              :id="'trip' + index"
            >
              <div
                :style="{
                  'background-color': $vuetify.theme.dark
                    ? '#546E7A'
                    : '#e6e6e6',
                  'border-radius': '4px 4px 0px 0px',
                }"
                class="pb-2 pt-3 px-3"
              >
                <v-row>
                  <v-col cols="12" lg="7" class="pa-0 text-left">
                    <v-avatar
                      size="20"
                      :color="coloredTripStatus(trip.status)"
                      class="mx-2"
                      style="bottom: 2px"
                    ></v-avatar>
                    <span class="font-weight-bold">{{
                      trip.reference_number
                    }}</span>
                  </v-col>
                  <v-col
                    cols="12"
                    lg="5"
                    class="py-0 text-sm-body-2 text-right text-capitalize"
                    >{{ trip.status }}</v-col
                  >
                </v-row>
              </div>
              <v-row>
                <v-col cols="12" lg="7" class="px-2 py-2">
                  <div class="ml-3">
                    <v-icon size="20">mdi-account</v-icon>
                    <span
                      class="text-break pl-1"
                      style="font-size: 0.8em; white-space: normal"
                      :id="'order' + index + '-reference-number'"
                    >
                      {{ trip.driver_name }}</span
                    >
                  </div>
                </v-col>
                <v-col cols="12" lg="5" class="px-2 py-2">
                  <div :class="$vuetify.breakpoint.mdAndDown ? 'ml-3' : ''">
                    <v-icon size="20">mdi-calendar</v-icon>
                    <span
                      class="text-break pl-1"
                      style="font-size: 0.8em; white-space: normal"
                      :id="'order' + index + '-location-time'"
                    >
                      {{ trip.project }}</span
                    >
                  </div>
                </v-col>
                <v-col cols="12" lg="7" class="px-2 pb-3 pt-1">
                  <div class="ml-3">
                    <v-icon size="20">mdi-account</v-icon>
                    <span
                      class="pl-1"
                      style="font-size: 0.8em"
                      :id="'order' + index + '-customer-name'"
                    >
                      {{ trip.trip_date }}</span
                    >
                  </div>
                </v-col>
                <v-col cols="12" lg="5" class="px-2 pb-3 pt-1">
                  <div :class="$vuetify.breakpoint.mdAndDown ? 'ml-3' : ''">
                    <v-icon size="20">mdi-clock-time-four</v-icon>
                    <span
                      class="text-break pl-1"
                      style="font-size: 0.8em; white-space: normal"
                      :id="'order' + index + '-customer-name'"
                    >
                      {{ trip.vehicle_type }}</span
                    >
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-tab-item>
        <!------------------------------------- Drivers Tab ------------------------------------->
        <v-tab-item eager class="mt-2">
          <div
            class="mainTab HandleScroll"
            id="driver"
            @scroll="scrollControl('driver')"
          >
            <v-tabs height="2.2em" centered>
              <v-tab class="text-body-2">All</v-tab>
              <v-tab class="text-body-2">Active</v-tab>
              <v-tab class="text-body-2">Off-Duty</v-tab>
              <!--------------------------------------- All Drivers --------------------------------------->
              <v-tab-item>
                <div>
                  <v-card
                    elevation="0"
                    v-for="(driver, index) in Drivers"
                    :key="index"
                    append
                    class="card ml-1 mt-2 rounded-b-md"
                    :id="'driver' + index"
                  >
                    <v-row>
                      <v-col cols="3" lg="3" class="pt-1">
                        <v-badge
                          v-if="driver.status == 'on-duty'"
                          dot
                          color="success"
                          offset-x="20"
                          overlap
                        >
                          <v-avatar
                            size="42"
                            color="black"
                            class="mx-2"
                            style="bottom: 1px"
                          >
                            <img src="../static/2021-01-03.png" alt="" />
                          </v-avatar>
                        </v-badge>
                        <v-avatar
                          v-else
                          size="42"
                          color="black"
                          class="mx-2"
                          style="bottom: 1px"
                        >
                          <img src="../static/2021-01-03.png" alt="" />
                        </v-avatar>
                      </v-col>
                      <v-col cols="6" lg="6" class="px-2 pt-1">
                        <span
                          class="text-break pl-1 d-flex flex-column"
                          style="font-size: 0.8em; white-space: normal"
                          :id="'driver' + index + '-driver-name'"
                        >
                          {{ driver.driver_name }}</span
                        >
                        <span
                          class="text-break pl-1"
                          style="font-size: 0.8em; white-space: normal"
                          :id="'driver' + index + '-contact-number'"
                        >
                          {{ driver.contact_number }}</span
                        >
                      </v-col>
                      <v-col cols="3" lg="3">
                        <v-btn @click="pushToChat(driver)" text fab small>
                          <v-icon>mdi-chat</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
              </v-tab-item>
              <!------------------------------------------- Active Drivers ------------------------------------------->
              <v-tab-item>
                <div>
                  <v-card
                    elevation="0"
                    v-for="(driver, index) in ActiveDrivers"
                    :key="index"
                    append
                    class="card ml-1 mt-2 rounded-b-md"
                    :id="'driver' + index"
                  >
                    <v-row>
                      <v-col cols="3" lg="3" class="pt-1">
                        <v-badge
                          v-if="driver.status == 'on-duty'"
                          dot
                          color="success"
                          offset-x="20"
                          overlap
                        >
                          <v-avatar
                            size="42"
                            color="black"
                            class="mx-2"
                            style="bottom: 1px"
                          ></v-avatar>
                        </v-badge>
                      </v-col>
                      <v-col cols="6" lg="6" class="px-2 pt-1">
                        <span
                          class="text-break pl-1 d-flex flex-column"
                          style="font-size: 0.8em; white-space: normal"
                          :id="'driver' + index + '-driver-name'"
                        >
                          {{ driver.driver_name }}</span
                        >
                        <span
                          class="text-break pl-1"
                          style="font-size: 0.8em; white-space: normal"
                          :id="'driver' + index + '-contact-number'"
                        >
                          {{ driver.contact_number }}</span
                        >
                      </v-col>
                      <v-col cols="3" lg="3">
                        <v-btn text fab small>
                          <v-icon>mdi-chat</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
              </v-tab-item>
              <!------------------------------------------- Off-Duty Drivers ------------------------------------------->
              <v-tab-item>
                <div>
                  <v-card
                    elevation="0"
                    v-for="(driver, index) in OffDutyDrivers"
                    :key="index"
                    append
                    class="card ml-1 mt-2 rounded-b-md"
                    :id="'driver' + index"
                  >
                    <v-row>
                      <v-col cols="3" lg="3" class="pt-1">
                        <v-avatar
                          size="42"
                          color="black"
                          class="mx-2"
                          style="bottom: 1px"
                        ></v-avatar>
                      </v-col>
                      <v-col cols="6" lg="6" class="px-2 pt-1">
                        <span
                          class="text-break pl-1 d-flex flex-column"
                          style="font-size: 0.8em; white-space: normal"
                          :id="'driver' + index + '-driver-name'"
                        >
                          {{ driver.driver_name }}</span
                        >
                        <span
                          class="text-break pl-1"
                          style="font-size: 0.8em; white-space: normal"
                          :id="'driver' + index + '-contact-number'"
                        >
                          {{ driver.contact_number }}</span
                        >
                      </v-col>
                      <v-col cols="3" lg="3">
                        <v-btn text fab small>
                          <v-icon>mdi-chat</v-icon>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </div>
              </v-tab-item>
            </v-tabs>
          </div>
        </v-tab-item>
      </v-tabs>
    </div>
    <NewTripForm @dataDrop="dataDrop($event)" v-model="showNewTripForm" />
    <NewOrderForm v-model="showNewOrderForm" />
  </div>
</template>

<script>
import NewOrderForm from "./Popups/NewOrderForm";
import NewTripForm from "./Popups/NewTripForm";
// import ChatDialog from "./ChatDialog";
import draggable from "vuedraggable";
import Vue from "vue";

export default {
  name: "OrderTrip",
  components: {
    draggable,
    NewOrderForm,
    NewTripForm,
  },
  data() {
    return {
      sortingType: {
        name: "Unassigned",
        value: "unassigned",
      },
      sortingTypes: [
        {
          name: "Unassigned",
          value: "unassigned",
          color: "#3f3f3f",
        },
        {
          name: "Assigned",
          value: "assigned",
          color: "#1ab7d0",
        },
        {
          name: "Picked Up",
          value: "picked_up",
          color: "#f28c33",
        },
        {
          name: "Delivery Attempted",
          value: "delivery_attempted",
          color: "#15895f",
        },
        {
          name: "Delivered",
          value: "delivered",
          color: "#79c267",
        },
        {
          name: "Returned",
          value: "returned",
          color: "#9e1d1d",
        },
        {
          name: "Cancelled",
          value: "cancelled",
          color: "#ff6663",
        },
      ],
      showChatWindow: false,
      selected_Trip: {
        id: null,
        trip_id: "",
        driver_name: "",
      },

      showNewOrderForm: false,
      showNewTripForm: false,
      socket: "",
      active_tab: null,
      searchBar: false,

      datePicker1: false,
      timePicker: false,
      TripReferenceNumber: "",
      TripDate: "",
      orderType: ["Pickup", "Delivery"],
      paymentType: ["Prepaid", "COD"],

      searchText: "",

      DateField: false,
      startDateMenu: false,
      Dates: null,

      tabs: [
        { index: 0, name: "Order" },
        { index: 1, name: "Trip" },
        { index: 2, name: "Drivers" },
      ],
      selectedOrders: [],
    };
  },
  methods: {
    checkActiveTab() {
      switch (this.active_tab) {
        case 0:
          return "Search Orders here";
        case 1:
          return "Search Trips here";
        case 2:
          return "Search Drivers here";
      }
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
      switch (status) {
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
    scrollControl(id) {
      let elem = document.getElementById(id);
      if (elem == null) {
        return false;
      } else if (elem.offsetHeight + elem.scrollTop == elem.scrollHeight) {
        if (id == "order") {
          this.fetch_orders();
        } else {
          this.fetch_trips();
        }
      }
    },
    chatHistory(id) {
      try {
        let sendObj = {
          command: "chat_history",
          data: { trip_id: id },
        };
        let parsed = JSON.stringify(sendObj);
        this.$socket.send(parsed);
      } catch (error) {
        console.error(error);
        this.$notifier.showMessage({
          content: error,
          color: "error",
        });
      }
    },
    fetch_orders() {
      this.$store.dispatch("OrderTrip/GET_ORDERS").then((data) => {
      });
    },
    fetch_trips() {
      this.$store.dispatch("OrderTrip/GET_TRIPS").then((data) => {
      });
    },
    fetch_projects() {
      this.$store.dispatch("OrderTrip/GET_PROJECTS").then((data) => {
      });
    },
    fetch_drivers() {
      this.$store.dispatch("Driver/GET_ALL_DRIVERS").then((data) => {
      });
    },
    pushToChat(driverDetails) {
      this.$store
        .dispatch("GET_DRIVER_TRIP", driverDetails.driver_id)
        .then(async (success) => {
          await this.chatHistory(success.trip_id);
          driverDetails["trip_id"] = success.trip_id;
          this.$store.commit("PUSH_TO_CHAT_LIST", driverDetails);
        })
        .catch((error) => {
          this.$notifier.showMessage({
            content: error,
            color: "error",
          });
        });
    },
    startDrag(evt, order, index) {
      evt.dataTransfer.dropEffect = "move";
      evt.dataTransfer.effectAllowed = "move";
      var dragFromOutside = true;
      evt.dataTransfer.setData("drag-from-outside", dragFromOutside);
      evt.dataTransfer.setData("order", JSON.stringify(order));
      evt.dataTransfer.setData("index", index);
    },
    dataDrop(obj) {
      this.$store.commit("OrderTrip/POP_ORDER", obj);
    },
    showOrderDetails(id) {
      if (id !== this.$store.state.OrderTrip.selectedDetails.order_id) {
        this.$store
          .dispatch("OrderTrip/GET_ORDER_DETAILS", id)
          .then((data) => {
          })
          .catch((error) => {
            this.$notifier.showMessage({
              content: "Something went wrong. Please Try again",
              color: "error",
            });
          });
      } else {
        this.$notifier.showMessage({
          content: "Same Order clicked",
          color: "info",
        });
      }
    },
    showTripDetails(id) {
      if (id !== this.$store.state.OrderTrip.selectedDetails.trip_id) {
        this.$store
          .dispatch("OrderTrip/GET_TRIP_DETAILS", id)
          .then((data) => {
          })
          .catch((error) => {
            this.$notifier.showMessage({
              content: "Something went wrong. Please Try again",
              color: "error",
            });
          });
      } else {
        this.$notifier.showMessage({
          content: "Same Trip clicked",
          color: "warn",
        });
      }
    },
    bgColor() {
      if (this.$vuetify.theme.dark) {
        return "blue-grey darken-1";
      }
    },
  },
  computed: {
    Orders() {
      return this.$store.state.OrderTrip.orders;
    },
    Trips() {
      return this.$store.state.OrderTrip.trips;
    },
    Projects() {
      return this.$store.state.OrderTrip.projects;
    },
    Drivers() {
      return this.$store.state.Driver.drivers;
    },
    ActiveDrivers() {
      // let drivers = this.$store.state.Driver.drivers;
      const ActiveDrivers = [];
      this.$store.state.Driver.drivers.forEach((element) => {
        if (element.status == "on-duty") {
          ActiveDrivers.push(element);
        }
      });
      return ActiveDrivers;
    },
    OffDutyDrivers() {
      let drivers = this.$store.state.Driver.drivers;
      const OffDutyDrivers = [];
      drivers.forEach((element) => {
        if (element.status == "off-duty") {
          OffDutyDrivers.push(element);
        }
      });
      return OffDutyDrivers;
    },
  },
  created() {},
  mounted() {
    if (process.browser) {
      const height = ((window.innerHeight / 100) * 85).toFixed() + "px";
      document.getElementById("OrderTrip").style.height = height;

      const Tabheight = ((window.innerHeight / 100) * 67).toFixed() + "px";

      let elements = document.getElementsByClassName("mainTab");
      elements.forEach((element) => {
        element.style.height = Tabheight;
      });
    }
    this.fetch_orders();
    this.fetch_trips();
    this.fetch_projects();
    this.fetch_drivers();
  },
  updated() {},
};
</script>

<style>
.parent {
  display: flex;
  justify-content: space-between;
}
.HandleScroll {
  overflow-y: scroll;
  overflow-x: hidden;
}

.card {
  /* Add shadows to create the "card" effect */
  width: 95%;
  border-radius: 4px 4px 4px 4px;
  transition: 0.1s;
  border-bottom: 1px outset #ececec7d !important;
}
.card:hover {
  box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.2);
}

.table-responsive {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.table {
  width: 100%;
  margin-bottom: 1rem;
  color: #212529;
}
.thead-dark {
  background-color: #bdbdbd;
  font-size: 12px;
  font-weight: bold;
  color: #e6e6e6;
  background: -moz-linear-gradient(top, #404040 0%, #191919 66%, #000000 100%);
  background: -webkit-linear-gradient(
    top,
    #404040 0%,
    #191919 66%,
    #000000 100%
  );
  background: linear-gradient(to bottom, #404040 0%, #191919 66%, #000000 100%);
  border-top: 1px solid #4a4a4a;
}
.trow {
  background-color: #e0e0e0;
}

#order::-webkit-scrollbar-track,
#trip::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #ffffff;
}

#order::-webkit-scrollbar,
#trip::-webkit-scrollbar {
  background-color: #ffffff;
}

#order::-webkit-scrollbar-thumb,
#trip::-webkit-scrollbar-thumb {
  background-color: #757575;
}
.v-text-field__details {
  margin-bottom: 0px;
}
</style>
