<template>
  <div>
    <v-dialog
      persistent
      no-click-animation
      v-model="bulkUploadDialog"
      width="70%"
    >
      <v-card>
        <v-card-title class="headline grey lighten-2">
          Bulk Upload Test
          <v-spacer></v-spacer>
          <v-btn icon dark @click="closeModel()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>

        <v-card-text>
          <v-file-input
            v-model="selectedFile"
            counter
            show-size
            truncate-length="6"
            @change="selectedFiles($event)"
          ></v-file-input>
          <v-alert
            class="mt-2 mb-0 mx-0"
            v-for="error in totalHeaderErrors"
            :key="error.index"
            dense
            outlined
            type="error"
          >
            {{ error }}
          </v-alert>
        </v-card-text>

        <div v-show="excelData.length > 0">
          <v-divider></v-divider>
          <AgGridVue
            style="width: 100%; height: 300px"
            class="ag-theme-material"
            :gridOptions="gridOptions"
            :columnDefs="headers"
            :rowData="excelData"
            :defaultColDef="defaultColDef"
            :rowDragManaged="true"
            :animateRows="true"
          >
          </AgGridVue>
        </div>

        <v-divider></v-divider>

        <v-card-actions>
          <div v-show="excelData.length > 0">
            <v-menu top :close-on-content-click="false" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-bind="attrs" v-on="on">Add Column</v-btn>
              </template>

              <v-card>
                <v-card-text class="pa-4">
                  <v-text-field
                    placeholder="Column Name"
                    dense
                    hide-details
                    v-model="ColHeader"
                    label="Add Column"
                    append-outer-icon="mdi-plus"
                    @click:append-outer="addColumn($event)"
                    @keydown.enter="addColumn($event)"
                    outlined
                  ></v-text-field>
                </v-card-text>
              </v-card>
            </v-menu>
            <v-btn color="primary" text @click="addRow()"> Add Row </v-btn>
            <v-btn color="primary" text @click="exportData()"> Export </v-btn>
          </div>

          <v-spacer></v-spacer>
          <v-btn color="primary" @click="checkForBlankValues()" text>
            Upload
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
import { AgGridVue } from "ag-grid-vue";
import fuzz from "fuzzball";
var requiredHeaders = [];

export default {
  props: {
    value: Boolean,
    uploadTo: String,
  },
  data() {
    return {
      addCol: false,
      defaultColDef: {
        lockVisible: true,
        lockPosition: true,
      },
      driversRequiredFields: this.$store.state.bulkUpload.driversRequiredFields,
      vehicalsRequiredFields: this.$store.state.bulkUpload
        .vehicalsRequiredFields,
      customersRequiredFields: this.$store.state.bulkUpload
        .customersRequiredFields,
      ColHeader: "",
      headers: [],
      selectedFile: [],
      addColDialog: false,
      excelData: [],
      gridOptions: null,
      gridApi: null,
      gridColumnApi: null,
      totalHeaderErrors: [],
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
    selectedFiles($event) {
      if ($event) {
        var reader = new FileReader();
        reader.onload = async () => {
          /**
           * Clear previous data if any
           */
          this.excelData = [];

          /**
           * Read the uploaded file
           */
          var fileData = reader.result;
          var wb = XLSX.read(fileData, { type: "binary" });

          /** Check what to upload */
          let _reqFields,
            headers = [];
          if (this.uploadTo == "Driver") {
            _reqFields = this.driversRequiredFields;
          }
          if (this.uploadTo == "Vehical") {
            _reqFields = this.vehicalsRequiredFields;
          }
          if (this.uploadTo == "Customer") {
            _reqFields = this.customersRequiredFields;
          }

          let rowData = [];
          this.totalHeaderErrors = [];
          /** Get data from sheet(s) */
          await wb.SheetNames.forEach(async (sheetName) => {
            var rowObj = XLSX.utils.sheet_to_row_object_array(
              wb.Sheets[sheetName]
            );

            /** Check if other headers are present. */
            let _h = this.getAllKeys(rowObj);

            await this.checkHeaders(_h, _reqFields, sheetName);

            headers = [...new Set([...headers, ..._h])];

            if (rowObj.length > 0) {
              // For file with multiple sheets
              rowData = [...rowData, ...rowObj];
            }
          });

          if (this.totalHeaderErrors.length == 0) {
            /** Set Headers */
            await this.setHeaders(headers);
            this.excelData = rowData;

            this.gridApi = this.gridOptions.api;
            this.gridColumnApi = this.gridOptions.columnApi;
            let allColumnIds = [];

            await this.gridColumnApi.getAllColumns().forEach(function (column) {
              allColumnIds.push(column.colId);
            });

            this.gridColumnApi.autoSizeColumns(allColumnIds);
          }
        };
        reader.readAsBinaryString($event);
      } else {
        this.excelData = [];
        requiredHeaders = [];
        this.totalHeaderErrors = [];
      }
    },
    getAllKeys(rowObj) {
      let h = [];
      rowObj.forEach((obj) => {
        h = [...new Set([...h, ...Object.keys(obj)])];
      });
      return h;
    },
    async checkHeaders(toCheck, checkFrom, sheetName) {
      requiredHeaders = [];

      checkFrom.forEach((val, index) => {
        let i = 0;

        while (i < toCheck.length) {
          let _val = toCheck[i];

          if (fuzz.ratio(val.toLowerCase(), _val.toLowerCase()) >= 90) {
            requiredHeaders.push(_val);
            return;
          } else if (
            !(fuzz.ratio(val.toLowerCase(), _val.toLowerCase()) >= 90) &&
            toCheck.length == i + 1
          ) {
            this.totalHeaderErrors.push(
              `Required field not found: ${val} in ${sheetName}`
            );
          }
          i++;
        }
      });
    },
    async setHeaders(headers) {
      this.headers = [
        {
          headerName: "#",
          width: 70,
          valueGetter: "node.rowIndex + 1",
          rowDrag: true,
          pinned: "left",
        },
        {
          headerName: "action",
          pinned: "right",
          cellRenderer: () => {
            return `X `;
          },
        },
      ];

      headers.forEach((header) => {
        let obj = {
          headerName: header,
          field: header,
          editable: true,
          cellStyle: function (params) {
            if (requiredHeaders.includes(params.colDef.field)) {
              if (params.value == "" || params.value == null) {
                return { background: "#8400004a" };
              } else {
                return { background: "white" };
              }
            }
          },
        };
        this.headers.push(obj);
      });
    },
    addColumn(ev) {
      this.addColDialog = false;
      if (ev.target.value) {
        let obj = {
          headerName: ev.target.value,
          field: ev.target.value,
          editable: true,
        };
        this.headers.unshift(obj);
        this.ColHeader = "";
      }
    },
    async addRow() {
      let obj = {};
      await this.headers.forEach((h) => {
        obj[h.headerName] = "";
      });
      this.excelData.unshift(obj);
    },
    async exportData() {
      let jsonData = [];
      await this.gridApi.forEachNode(function (rowNode, index) {
        jsonData.push(rowNode.data);
      });

      //Create a new workbook and set metadata properties
      var wb = XLSX.utils.book_new();
      wb.Props = {
        Title: "Sample Excel File",
        Subject: "Test",
        Author: "Fero.ai",
        CreatedDate: new Date(),
      };
      //Create new Sheet and push it to the workbook
      wb.SheetNames.push("Sheet 1");
      //Create dummy data and write it to the worksheet

      var ws = XLSX.utils.json_to_sheet(jsonData);
      wb.Sheets["Sheet 1"] = ws;
      var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });
      //Convert the written binary data object to ArrayBuffer (i.e. binary to octet-stream)
      function binaryToArrayBuffer(s) {
        var buf = new ArrayBuffer(s.length);
        //Create uint8array as viewer
        var view = new Uint8Array(buf);
        //Convert to octet
        for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        //Return ArrayBuffer
        return buf;
      }

      let url = URL.createObjectURL(
        new Blob([binaryToArrayBuffer(wbout)], {
          type: "application/octet-stream",
        })
      );

      /**
       * Default saveas dont work here so create link and make it downloadable
       */
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.xlsx");
      document.body.appendChild(link);
      link.click();
    },
    checkForBlankValues() {
      return new Promise((resolve, reject) => {
        this.gridApi.forEachNode((rowNode, index) => {
          let len = requiredHeaders.length,
            i = 0;
          while (len > i) {
            let key = requiredHeaders[i];

            if (
              rowNode.data[key] &&
              (rowNode.data[key] == "" || rowNode.data[key] == null)
            ) {
              reject(false);
            }

            i++;
          }

          if (this.excelData.length - 1 == index) {
            resolve(true)
          }
        });
      });
    },
    uploadData() {
      this.checkForBlankValues().then(res => {
        /** Code for upload here. */
      }).catch(err => {
        throw new Error("Problem With data. check data and try again.")
      })
    },
    closeModel() {
      this.totalHeaderErrors = [];
      this.excelData = [];
      this.selectedFile = null;
      this.bulkUploadDialog = false;
    },
  },
  computed: {
    bulkUploadDialog: {
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