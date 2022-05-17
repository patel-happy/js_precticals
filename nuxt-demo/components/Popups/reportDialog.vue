<template>
  <div>
    <v-dialog persistent no-click-animation v-model="statusDialog" width="70%">
      <v-card>
        <v-card-title class="headline grey lighten-2">
          {{ reportFor }} Report
          <v-spacer />
          <v-btn icon dark @click="closeModel()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-dialog
            ref="dialog"
            v-model="dateRangeModal"
            :return-value.sync="dates"
            persistent
            width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                label="Picker in dialog"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker range v-model="dates" scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="dateRangeModal = false">
                Cancel
              </v-btn>
              <v-btn text color="primary" @click="$refs.dialog.save(dates)">
                OK
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </v-card-text>

        <div v-show="reportData.length > 0">
          <v-divider></v-divider>
          <AgGridVue
            style="width: 100%; height: 300px"
            class="ag-theme-material"
            :gridOptions="gridOptions"
            :columnDefs="headers"
            :rowData="reportData"
            :defaultColDef="defaultColDef"
            :rowDragManaged="true"
            :animateRows="true"
          >
          </AgGridVue>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="getResults()" text> Filter </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { AgGridVue } from "ag-grid-vue";

export default {
  props: {
    value: Boolean,
    reportFor: String,
  },
  data() {
    return {
      dates: [new Date().toISOString().substr(0, 10), new Date().toISOString().substr(0, 10)],
      dateRangeModal: false,
      addCol: false,
      defaultColDef: {
        lockVisible: true,
        lockPosition: true,
      },
      headers: [],
      reportData: [],
      gridOptions: null,
    };
  },
  components: {
    AgGridVue,
  },
  beforeMount() {
    this.gridOptions = {
      headerHeight: 40,
      rowHeight: 40,
    };
  },
  methods: {
    closeModel() {
      this.statusDialog = false;
    },
    getResults() {
    },
  },
  computed: {
    dateRangeText() {
      return this.dates.join(" To ");
    },
    statusDialog: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      },
    },
  },
};
</script>

<style>
</style>