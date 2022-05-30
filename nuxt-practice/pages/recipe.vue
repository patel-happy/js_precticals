<template>
  <v-data-table
    :headers="headers"
    :items="Recipes"
    :search="search"
    class="elevation-1"
  >
    <!-- second templet for dta  -->
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>My Recipe</v-toolbar-title>
        <v-spacer></v-spacer>
        <!-- search button -->
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
        <!-- search button -->
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
              ADD RECIPE
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
                      v-model="recipeFrom.name"
                      label="Recipe Name"
                    ></v-text-field>
                    <v-text-field
                      v-model="recipeFrom.recipeItem"
                      label="Recipe Item"
                    ></v-text-field>

                    <v-file-input
                      truncate-length="15"
                      @change="uploadFile($event)"
                    >
                    </v-file-input>
                    <v-img
                      v-if="recipeFrom.image"
                      :src="recipeFrom.image"
                      height="200px"
                      cover
                    ></v-img>
                    <!--  <v-input-file
                      class="grey ma-2"
                      @change="uploadFile()"
                      ref="file"
                      type="file"
                    ></v-input-file> -->

                    <!-- <v-btn
                      color="blue darken-1"
                      text
                      type="file"

                      @click="ImageUpload"
                    >
                      ImageUpload
                    </v-btn> -->
                  </v-col>
                  <!-- 1 -->
                </v-row>
              </v-container>
            </v-card-text>
            <!-- card button -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="save()"
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
    <template v-slot:item.actions="{ item, index }">
      <v-icon
        small
        class="gray mr-2"
        @click="edititem(item, index)"
        v-show="isEditing"
      >
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item, index)"> </v-icon>
    </template>

    <!-- pencil template -->
    <!--template in add and resret btn-->
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click=""> view </v-btn>
    </template> -->
    <!-- template in add resret btn -->
  </v-data-table>
</template>


<script>
export default {
  name: 'RecipePage',

  data() {
    return {
      isEditing: false,
      dialog: false,
      search: '',
      headers: [
        {
          text: 'Recipe Name',
          align: 'start',
          value: 'name',
          sortable: false,
        },
        { text: 'Recipe Item', value: 'recipeItem' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      Recipes: [],
      name: '',
      recipeItem: {},
      recipeFrom: {},
      editedIndex: -1,
      image: '',
    }
  },
  methods: {
    newItem() {
      this.isEditing = false
      this.dialog = ''
      this.recipeFrom = {}
    },

    save() {
      this.Recipes.push(this.recipeFrom)
      this.isEditing = true
      this.dialog = false
    },
    edititem(item) {
      this.recipeFrom = { ...item }
      this.dialog = true
      this.isEditing = true
    },
    update() {
      this.editedIndex = this.Recipes.splice(
        this.editedIndex,
        1,
        this.recipeFrom
      )
    },
    uploadFile(e) {
      console.log(e)
      let url = URL.createObjectURL(e)
      this.recipeFrom = { ...this.recipeFrom, image: url }
      
    },
  },
}
</script>