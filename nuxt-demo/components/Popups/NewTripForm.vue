<!----------------------------------------------------------- New Trip form ----------------------------------------------------------->
<template>
  <v-dialog
    hide-overlay
    transition="slide-x-transition"
    persistent
    no-click-animation
    v-model="show"
    max-width="35%"
  >
    <v-card elevation="0">
      <v-card-title>
        <h3>Create Trip</h3>
        <v-spacer></v-spacer>
        <v-icon @click.stop="show = false">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  v-model="TripReferenceNumber"
                  label="Reference Number"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-select :items="orderType" label="Assign Driver"> </v-select>
              </v-col>

              <!---------------------------------------------------------------- Date Picker ---------------------------------------------------------------->
              <v-col cols="12" md="4">
                <v-menu
                  ref="datePicker1"
                  v-model="datePicker1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="TripDate"
                      label="Trip Date"
                      hint="YYYY-MM-DD format"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="TripDate"
                    :min="today()"
                    no-title
                    @input="datePicker1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" md="4">
                <v-select :items="Projects" label="Project"></v-select>
              </v-col>
            </v-row>
            <v-row>
              <div
                @dragover.prevent
                @dragenter.prevent
                @drop.prevent="applyDrag($event, selectedOrders)"
                style="width: 100%; background-color: #eee; height: 250px"
                id="drop_zone"
              >
                <div
                  class="table-responsive text-center"
                  style="overflow-y: auto; max-height: 100%"
                >
                  <table class="table table-striped">
                    <thead class="thead-dark">
                      <tr>
                        <th scope="col">Order Id</th>
                        <th scope="col">Project name</th>
                        <th scope="col">Customer Name</th>
                        <th scope="col">Expected Time</th>
                        <th scope="col">Order Status</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <draggable v-model="selectedOrders" tag="tbody">
                      <tr
                        class="trow"
                        v-for="item in selectedOrders"
                        :key="item.object.reference_number"
                      >
                        <td scope="row">{{ item.object.reference_number }}</td>
                        <td>{{ item.object.project }}</td>
                        <td>{{ item.object.customer_name }}</td>
                        <td class="tdate">{{ item.object.location_time }}</td>
                        <td>{{ item.object.status }}</td>
                        <td>
                          <v-btn icon @click="removeOrder(item)"
                            ><v-icon>mdi-close</v-icon></v-btn
                          >
                        </td>
                      </tr>
                    </draggable>
                  </table>
                </div>
              </div>
              <h3
                v-if="selectedOrders.length == ''"
                style="opacity: 0.6"
                class="text-align-center justify-center"
              >
                Drag & drop the orders you want to assign to the trip
              </h3>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="primary ma-3" type="submit">Submit</v-btn>
        <v-btn class="ma-3" text @click.stop="show = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import draggable from "vuedraggable";

export default {
  props: {
    value: Boolean,
  },
  components: {
    draggable,
  },
  data() {
    return {
      selectedOrders: this.$store.state.OrderTrip.draggedOrders,
      datePicker1: false,
      timePicker: false,
      TripReferenceNumber: "",
      TripDate: "",
      orderType: ["Pickup", "Delivery"],
    };
  },
  computed: {
    Projects() {
      return this.$store.state.OrderTrip.projects;
    },
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
  methods: {
    formateDateTime(_d) {
      let _ = new Date(_d),
        date = _.getDate() < 10 ? "0" + _.getDate() : _.getDate(),
        month = _.getMonth() + 1,
        year = _.getFullYear();

      month = month < 10 ? "0" + month : month;

      return [year, month, date].join("-");
    },
    today() {
      let formattedDate = this.formateDateTime(new Date());
      return formattedDate;
    },
    applyDrag(event) {
      if (event.dataTransfer.getData("drag-from-outside") === "true") {
        let obj = {
          object: JSON.parse(event.dataTransfer.getData("order")),
          index: event.dataTransfer.getData("index"),
        };

        this.$store.commit("OrderTrip/ADD_SELECTED_OBJ", obj);
        this.$emit("dataDrop", obj);
      } else {
      }
    },
    removeOrder(obj) {
      this.$store.commit("OrderTrip/REMOVE_SELECTED_OBJ", obj);
    },
  },
};
</script>