<template>
  <div>
    <v-dialog
      v-model="show"
      persistent
      no-click-animation
      width="60%"
      max-width="750"
    >
      <v-card>
        <v-card-title class="px-3 py-2" style="background-color: #175282">
          <span style="color: white">Templates</span>
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
          <v-card-text v-if="active == 'templateList'" class="pt-2">
            <v-row dense>
              <v-col class="pa-0 pb-2">
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
                      @click="addTemplate()"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </template>
                  <span>Add Template</span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col class="pa-0">
                <v-data-table
                  :headers="headers"
                  :items="template_list"
                  :items-per-page="5"
                >
                  <template #[`item.actions`]="{ item }">
                    <div class="d-flex justify-space-between">
                      <v-icon small @click="editTemplate(item)"
                        >mdi-pencil</v-icon
                      >
                      <v-icon small @click="deleteTemplate(item)"
                        >mdi-delete</v-icon
                      >
                    </div>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-scale-transition>
        <!-------------------------------------------- Add / Edit Template form -------------------------------------------->
        <v-scale-transition hide-on-leave mode="in-out" origin="center">
          <div
            v-if="active == 'templateAddForm' || active == 'templateEditForm'"
          >
            <v-card-text class="pa-0">
              <div
                class="pa-2"
                :style="{
                  'background-color': $vuetify.theme.dark
                    ? '#546E7A'
                    : '#e6e6e6',
                }"
              >
                <v-btn
                  @click="active = 'templateList'"
                  style="bottom: 2px !important"
                  x-small
                  fab
                  elevation="0"
                  dark
                  color="#175282"
                >
                  <v-icon>mdi-arrow-left</v-icon>
                </v-btn>
                <span
                  v-if="active == 'templateAddForm'"
                  class="font-weight-bold"
                  >Add Template Form</span
                >
                <span v-else class="font-weight-bold">Edit Template Form</span>
              </div>
              <div class="pa-4">
                <v-form v-model="isValid">
                  <v-row dense class="pb-2">
                    <v-col cols="6" lg="4" md="4" sm="6">
                      <v-text-field
                        v-model="formData.template_name"
                        :rules="[(v) => !!v || 'Template Name is required']"
                        dense
                        outlined
                        label="Template Name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" lg="4" md="4" sm="6">
                      <v-text-field
                        type="number"
                        v-model="formData.fill_ratio"
                        :rules="[(v) => !!v || 'Fill ratio is required']"
                        min="0"
                        dense
                        outlined
                        label="Fill Ratio (Percentage)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" lg="4" md="4" sm="6">
                      <v-text-field
                        type="number"
                        v-model="formData.vehicle_speed"
                        :rules="[
                          (v) => !!v || 'Vehicle avg. speed is required',
                        ]"
                        min="10"
                        dense
                        outlined
                        label="Average Speed (kmph)"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6" lg="4" md="4" sm="6">
                      <v-select
                        v-model="formData.capacity_type"
                        :items="capacityType"
                        item-text="name"
                        item-value="value"
                        :rules="[(v) => !!v || 'Capacity is required']"
                        dense
                        outlined
                        label="Capacity Type"
                      ></v-select>
                    </v-col>
                    <v-col cols="6" lg="4" md="4" sm="6">
                      <v-text-field
                        type="number"
                        v-model="formData.planning_duration"
                        :rules="[(v) => !!v || 'Planning duration is required']"
                        min="0"
                        dense
                        outlined
                        label="Planning Duration (Minutes)"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-divider></v-divider>
                  <v-row dense class="pt-2">
                    <v-col cols="6" lg="6" md="6" sm="6">
                      <v-menu
                        ref="menu"
                        v-model="menu1"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="formData.loading_start_time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="formData.loading_start_time"
                            append-icon="mdi-clock-time-four-outline"
                            :rules="[
                              (v) => !!v || 'Loading Time(From) is required',
                            ]"
                            @focus="menu1 = true"
                            @click="menu1 = true"
                            readonly
                            dense
                            outlined
                            label="Loading Time(From)"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu1"
                          v-model="formData.loading_start_time"
                          full-width
                          @click:minute="
                            $refs.menu.save(formData.loading_start_time)
                          "
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="6" lg="6" md="6" sm="6">
                      <v-menu
                        ref="menu2"
                        v-model="menu2"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="formData.loading_end_time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="formData.loading_end_time"
                            append-icon="mdi-clock-time-four-outline"
                            :disabled="formData.loading_start_time == ''"
                            :rules="loadingEndTimeRule"
                            @focus="menu2 = true"
                            @click="menu2 = true"
                            readonly
                            dense
                            outlined
                            label="Loading Time(To)"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu2"
                          v-model="formData.loading_end_time"
                          full-width
                          @click:minute="
                            $refs.menu2.save(formData.loading_end_time)
                          "
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                  <v-row dense>
                    <v-col cols="6" lg="6" md="6" sm="6">
                      <v-menu
                        ref="menu3"
                        v-model="menu3"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="formData.offloading_start_time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="formData.offloading_start_time"
                            append-icon="mdi-clock-time-four-outline"
                            readonly
                            @focus="menu3 = true"
                            @click="menu3 = true"
                            dense
                            outlined
                            label="Offloading Time(From)"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu3"
                          v-model="formData.offloading_start_time"
                          full-width
                          @click:minute="
                            $refs.menu3.save(formData.offloading_start_time)
                          "
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="6" lg="6" md="6" sm="6">
                      <v-menu
                        ref="menu4"
                        v-model="menu4"
                        :close-on-content-click="false"
                        :nudge-right="40"
                        :return-value.sync="formData.offloading_end_time"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="290px"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="formData.offloading_end_time"
                            append-icon="mdi-clock-time-four-outline"
                            :rules="offLoadingEndTimeRule"
                            :disabled="formData.offloading_start_time == ''"
                            readonly
                            @focus="menu4 = true"
                            @click="menu4 = true"
                            dense
                            outlined
                            label="Offloading Time(To)"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                          v-if="menu4"
                          v-model="formData.offloading_end_time"
                          full-width
                          @click:minute="
                            $refs.menu4.save(formData.offloading_end_time)
                          "
                        ></v-time-picker>
                      </v-menu>
                    </v-col>
                  </v-row>
                </v-form>
              </div>
            </v-card-text>
            <v-card-actions class="pa-4 d-flex justify-end">
              <v-btn type="reset" small @click="resetForm()">Reset</v-btn>
              <v-btn
                :dark="isValid"
                small
                color="#175282"
                :disabled="!isValid"
                @click="submitForm()"
                >Submit</v-btn
              >
            </v-card-actions>
          </div>
        </v-scale-transition>
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
    return {
      isValid: true,
      formData: {
        id: null,
        template_name: "",
        capacity_type: "",
        fill_ratio: "",
        vehicle_speed: "",
        planning_duration: "",
        loading_start_time: "",
        loading_end_time: "",
        offloading_start_time: "",
        offloading_end_time: "",
      },
      capacityType: [
        {
          name: "Weight",
          value: "weight",
        },
        {
          name: "Volume",
          value: "volume",
        },
      ],
      defaultColDef: {
        lockVisible: true,
        lockPosition: true,
      },
      active: "templateList",
      headers: [
        {
          text: "Template Name",
          value: "template_name",
          align: "start",
          sortable: false,
        },
        {
          text: "Fill Ratio",
          value: "fill_ratio",
          align: "start",
          sortable: true,
        },
        {
          text: "Avg Speed",
          value: "vehicle_speed",
          align: "start",
          sortable: false,
        },
        {
          text: "Loading Timings",
          value: "loading_timings",
          align: "start",
          sortable: false,
        },
        {
          text: "Offloading Timings",
          value: "offloading_timings",
          align: "start",
          sortable: false,
        },
        {
          text: "Capacity Type",
          value: "capacity_type",
          align: "start",
          sortable: false,
        },
        {
          text: "Actions",
          value: "actions",
          align: "start",
          sortable: false,
        },
      ],
      menu1: false,
      menu2: false,
      menu3: false,
      menu4: false,
    };
  },
  computed: {
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
        this.active = "templateList";
      },
    },
    template_list() {
      if (this.$store.state.TripPlanning.template_list) {
        const template_list = this.$store.state.TripPlanning.template_list;
        return template_list;
      } else {
        return "No row formData";
      }
    },
    loadingEndTimeRule() {
      const rules = [];
      const rule = (v) => !!v || "Loading Time(From) is required";

      rules.push(rule);

      if (this.formData.loading_start_time !== "") {
        const rule = (v) =>
          this.checkTimeDiff(v, this.formData.loading_start_time) ||
          `Loading Time(To) can not be less than Loading Time(From)`;

        rules.push(rule);
      }

      return rules;
    },
    offLoadingEndTimeRule() {
      const rules = [];
      const rule = (v) => !!v || "Offloading Time(From) is required";

      rules.push(rule);

      if (this.formData.offloading_start_time !== "") {
        const rule = (v) =>
          this.checkTimeDiff(v, this.formData.offloading_start_time) ||
          `Offloading Time(To) can not be less than Offloading Time(From)`;

        rules.push(rule);
      }

      return rules;
    },
  },
  methods: {
    addTemplate() {
      this.resetForm();
      this.active = "templateAddForm";
    },
    checkTimeDiff(time_1, time_2) {
      if (time_1 !== null || time_2 !== null) {
        (time_1 = time_1.split(":")), (time_2 = time_2.split(":"));

        let date1 = new Date(
            0,
            0,
            0,
            parseInt(time_1[0]),
            parseInt(time_1[1])
          ).getTime(),
          date2 = new Date(
            0,
            0,
            0,
            parseInt(time_2[0]),
            parseInt(time_2[1])
          ).getTime();

        return date1 > date2;
      }
    },
    fetch_template_list() {
      this.$store.dispatch("TripPlanning/GET_TEMPLATE_LIST");
    },
    editTemplate(tObj) {
      let p1 = {
        ...tObj,
      };
      this.formData = p1;
      this.active = "templateEditForm";
    },
    deleteTemplate(template) {
      var r = confirm(
        `Are You sure you want to delete template : ${template.template_name}`
      );
      if (r == true) {
        this.$store
          .dispatch("TripPlanning/DELETE_TEMPLATE", template.id)
          .then((success) => {
            console.log(success);
            this.$notifier.showMessage({
              content: "Template Deleted",
              color: "success",
            });
          })
          .catch((error) => {
            console.log(error);
            this.$notifier.showMessage({
              content: "Something went wrong. Please try again!",
              color: "error",
            });
          });
      }
    },
    resetForm() {
      this.formData = {
        template_name: null,
        capacity_type: null,
        fill_ratio: null,
        vehicle_speed: null,
        planning_duration: null,
        loading_start_time: null,
        loading_end_time: null,
        offloading_start_time: null,
        offloading_end_time: null,
      };
    },
    submitForm() {
      if (this.active === "templateAddForm") {
        this.$store
          .dispatch("TripPlanning/CREATE_TEMPLATE", this.formData)
          .then((success) => {
            console.log(success);
            this.$notifier.showMessage({
              content: "Template created",
              color: "success",
            });
            this.active = "templateList";
          })
          .catch((error) => {
            console.log(error.response.data);
            const errorMessage = error.response.data.detail;
            if (errorMessage) {
              this.$notifier.showMessage({
                content: errorMessage,
                color: "error",
              });
            } else {
              this.$notifier.showMessage({
                content: "Something went wrong. Please try again!",
                color: "error",
              });
            }
          });
      } else {
        this.$store
          .dispatch("TripPlanning/UPDATE_TEMPLATE", this.formData)
          .then((success) => {
            console.log(success);
            this.$notifier.showMessage({
              content: "Template Updated",
              color: "success",
            });
            this.active = "templateList";
          })
          .catch((error) => {
            console.log(error.message);
            const errorMessage = error.response.data.detail;
            this.$notifier.showMessage({
              content: errorMessage,
              color: "error",
            });
          });
      }
    },
  },
  async mounted() {
    this.gridOptions = {
      headerHeight: 40,
      rowHeight: 40,
    };
    await this.fetch_template_list();
  },
};
</script>

<style>
</style>