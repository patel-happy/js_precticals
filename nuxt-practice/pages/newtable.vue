<template>
  <v-data-table :headers="headers" :items="projects" class="elevation-1">
    <!-- second templet for dta  -->
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My Project</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- first dialog box  -->
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
              @click="newItem"
            >
              New Item
            </v-btn>
          </template>
          <!-- v-card for new item -->

          <v-card>
            <v-card-title>
              <span class="text-h5"></span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <!-- 1 -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="name"
                      label="ProjectName"
                    ></v-text-field>
                  </v-col>
                  <!-- 1 -->
                  <!-- 2 -->
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="projectId"
                      label="ProjectId"
                    ></v-text-field>
                  </v-col>
                  <!-- 2 -->
                </v-row>
              </v-container>
            </v-card-text>
            <!-- card button -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close()">close </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
                v-show="!isEditing"
              >
                Save
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="update()"
                v-show="isEditing"
              >
                Update
              </v-btn>
            </v-card-actions>
            <!-- card button  -->
          </v-card>
          <!-- v card from new item -->
        </v-dialog>
        <!-- first dialog box -->
      </v-toolbar>
    </template>
    <!-- second template  -->
    <!-- pencil template -->
    <template v-slot:item.actions="{ item,index }">
      <v-icon
        small
        class="gray mr-2"
        @click="editItem(item,index)"
        v-show="isEditing"
      > 
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>

    <!-- pencil template -->
    <!--template in add and resret btn-->
    <!-- <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template> -->
    <!-- template in add resret btn -->
  </v-data-table>
</template>



<script>
export default {
  name: 'TablesPage',

  data() {
    return {
      isEditing: false,
      dialog: false,
      headers: [
        {
          text: 'Project Name',
          align: 'start',
          value: 'name',
          sortable: false,
        },
        { text: 'project ID', value: 'projectId' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      projects: [],
      name: '',
      projectId: '',
      edititem: {},
       editedIndex: -1,

    }
  },
  methods: {
    newItem() {
      this.dialog = ''
    },
    save() {
      this.projects.push({ name: this.name, projectId: this.projectId })
      this.isEditing = true
      this.dialog = false
    },
    close(index) {
      this.isEditing = true
      console.log(this.projects.indexOf(index))
      this.edititem = this.projects.indexOf()
      this.projects[index] = { ...this.edititem }
      this.edititem = {}
    },
    editItem(item) {
      this.dialog = true
      this.isEditing = true
    },
    update(){
        
       this.editedIndex = this.projects.splice(this.editedIndex,1,this.edititem)
    }
  },
}
</script>