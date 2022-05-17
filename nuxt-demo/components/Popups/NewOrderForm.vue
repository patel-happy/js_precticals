<template>
  <v-dialog persistent v-model="show" max-width="60%">
    <v-card>
      <v-card-title>
        <h3>Create Order</h3>
        <v-spacer />
        <v-icon @click.stop="show = false">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>
        <v-form v-model="isValid">
          <!--------------------------------------------- Order Details Container --------------------------------------------->
          <v-container>
            <h4>Order Details :</h4>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  name="reference_number"
                  v-model="newOrder.reference_number"
                  label="Reference Number"
                  :rules="[(v) => !!v || 'This field is required']"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  name="oreder_type"
                  :items="orderType"
                  v-model="newOrder.order_type"
                  label="Order Type"
                  :rules="[(v) => !!v || 'This field is required']"
                  required
                >
                </v-select>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  name="quantity"
                  type="number"
                  min="1"
                  v-model="newOrder.quantity"
                  label="Quantity"
                  :rules="[(v) => !!v || 'This field is required']"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  name="capacity_unit"
                  :items="capacityUnit"
                  v-model="newOrder.capacity_unit"
                  label="Capacity Unit"
                  :rules="[(v) => !!v || 'This field is required']"
                  required
                >
                </v-select>
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  name="payment_type"
                  :items="paymentType"
                  v-model="newOrder.payment_type"
                  label="Payment Type"
                  :rules="[(v) => !!v || 'This field is required']"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  name="item_description"
                  v-model="newOrder.item_description"
                  label="Item Description"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  name="pod_required"
                  :items="proofOfDelivery"
                  v-model="newOrder.pod_required"
                  label="Proof Of Delivery"
                ></v-select>
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  disabled
                  v-model="defaultStatus"
                  :items="status"
                  label="Order Status"
                >
                </v-select>
              </v-col>
            </v-row>
          </v-container>

          <!--------------------------------------------- Address Details Container --------------------------------------------->
          <v-container>
            <h4>Address Details :</h4>
            <v-row>
              <v-col cols="12" md="4">
                <v-text-field
                  name="address_id"
                  v-model="newOrder.address_id"
                  label="Address ID"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-select
                  name="project_id"
                  :items="projects"
                  item-text="project_name"
                  item-value="project_id"
                  v-model="newOrder.project_id"
                  label="Project"
                  :rules="[(v) => !!v || 'This field is required']"
                  required
                ></v-select>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  name="customer_name"
                  v-model="newOrder.customer_name"
                  label="Customer"
                  :rules="[(v) => !!v || 'This field is required']"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  type="number"
                  name="contact_number"
                  v-model="newOrder.contact_number"
                  label="Contact Number"
                  min="0"
                  :rules="[(v) => !!v || 'This field is required']"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  name="pickup_address"
                  v-model="newOrder.pickup_address"
                  label="Pickup Address"
                  :rules="[(v) => !!v || 'This field is required']"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  name="drop_address"
                  v-model="newOrder.drop_address"
                  label="Drop Address"
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="4">
                <v-text-field
                  name="handover_time"
                  type="number"
                  min="0"
                  v-model="newOrder.handover_time"
                  label="Handover Time(Minutes)"
                  :rules="[(v) => !!v || 'This field is required']"
                  required
                ></v-text-field>
              </v-col>

              <!------------------------------------------------------- Date Picker(Delivery Start)--------------------------------------->
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
                      name="delivery_date"
                      v-model="deliveryDate"
                      label="Delivery Date(Start)"
                      hint="YYYY-MM-DD format"
                      persistent-hint
                      prepend-icon="mdi-calendar"
                      v-bind="attrs"
                      v-on="on"
                      :rules="[(v) => !!v || 'This field is required']"
                      required
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    :min="today()"
                    v-model="deliveryDate"
                    no-title
                    @input="datePicker1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <!-------------------------------------------------- Time Picker(Delivery Start Time) --------------------------------------------------->
              <v-col cols="12" md="4">
                <v-menu
                  ref="menu1"
                  v-model="timePicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="deliveryTimeStart"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      name="from_time"
                      v-model="deliveryTimeStart"
                      label="Delivery Time(Start)"
                      prepend-icon="mdi-clock-time-four-outline"
                      hint="24 hours formate"
                      persistent-hint
                      readonly
                      clearable
                      v-bind="attrs"
                      v-on="on"
                      :rules="[(v) => !!v || 'This field is required']"
                      required
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timePicker"
                    v-model="deliveryTimeStart"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menu1.save(deliveryTimeStart)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <!----------------------------------------------- Time Picker(End Time) -------------------------------------------------->
              <v-col cols="12" md="4">
                <v-menu
                  ref="menu2"
                  v-model="timePicker1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="deliveryTimeEnd"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      name="to_time"
                      v-model="deliveryTimeEnd"
                      label="Delivery Time(Expected)"
                      prepend-icon="mdi-clock-time-four-outline"
                      hint="24 hours formate"
                      persistent-hint
                      readonly
                      clearable
                      v-bind="attrs"
                      v-on="on"
                      required
                      :rules="[(v) => !!v || 'This field is required']"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="timePicker1"
                    v-model="deliveryTimeEnd"
                    format="24hr"
                    full-width
                    @click:minute="$refs.menu2.save(deliveryTimeEnd)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="!isValid"
          class="primary ma-3"
          type="submit"
          @click.prevent="createNewOrder"
          >Submit</v-btn
        >
        <v-btn class="ma-3" text @click.stop="show = false">Close</v-btn>
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
      isValid: false,

      datePicker1: false,
      datePicker2: false,
      timePicker: false,
      timePicker1: false,

      capacityUnit: ["kg", "cbm"],
      defaultStatus: "unassigned",
      status: ["unassigned"],
      project: [],
      orderType: ["Pickup", "Delivery"],
      paymentType: ["Prepaid", "COD"],
      proofOfDelivery: ["Yes", "No"],
      deliveryDate: "",
      deliveryTimeStart: "",
      deliveryTimeEnd: "",
      newOrder: {
        reference_number: "",
        order_type: "",
        quantity: "",
        capacity_unit: "",
        payment_type: "",
        item_description: "",
        pod_required: "",
        address_id: "",
        project_id: "",
        customer_name: "",
        contact_number: "",
        pickup_address: "",
        drop_address: "",
        handover_time: "",
      },
    };
  },
  methods: {
    today() {
      let formattedDate = this.formateDateTime(new Date());
      return formattedDate;
    },
    formateDateTime(_d) {
      let _ = new Date(_d),
        date = _.getDate() < 10 ? "0" + _.getDate() : _.getDate(),
        month = _.getMonth() + 1,
        year = _.getFullYear();

      month = month < 10 ? "0" + month : month;

      return [year, month, date].join("-");
    },
    createNewOrder() {
      (this.newOrder.from_time = this.from_time),
        (this.newOrder.to_time = this.to_time);
      this.newOrder.delivery_date = this.deliveryDate;
      this.newOrder.delivery_time = this.to_time;
      this.$store
        .dispatch("CREATE_SINGLE_ORDER", this.newOrder)
        .then((response) => {
          this.$snackbar.showMessage({
            content: "Order Successfully Created",
            color: "success",
          });
          this.show = false;
        })
        .catch((error) => {
        });
    },
  },
  computed: {
    from_time() {
      return this.deliveryTimeStart;
    },
    to_time() {
      return this.deliveryTimeEnd;
    },
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
    projects() {
      this.$store.state.OrderTrip.projects;
    },
  },
};
</script>