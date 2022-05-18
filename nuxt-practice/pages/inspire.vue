<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <div>
        <form @submit.prevent="addMovie()">
          <input class="grey ma-2" v-model="obj.name" type="text" />
          <input class="grey ma-2" v-model="obj.date" type="text" />
          <input class="grey ma-2" v-model="obj.language" type="text" />
          <input class="grey ma-2" v-model="obj.Produced_by" type="text" />
          <v-btn type="submit" v-show="!isEditing">Add</v-btn>
          <v-btn type="button" @click="updateMovie(obj.key)" v-show="isEditing">
            Edit
          </v-btn>
          <v-btn type="reset">Reset</v-btn>
        </form>
        <v-container class="my-5">
          <v-layout row wrap>
            <v-flex
              xs12
              sm6
              md4
              lg3
              v-for="(item, index) in currentmovie"
              :key="index"
            >
              <v-card flat class="text-xs-center ma-3">
                MOVIE

                <v-card-text>
                  <v-img
                    v-for="card in cards"
                    :key="card.title"
                    :src="card.src"
                    height="200px"
                    cover
                  ></v-img>
                  <div class="subheanding">NAME :{{ item.name }}</div>
                  <div class="subheanding">DATE :{{ item.date }}</div>
                  <div class="subheanding">LANGUAGE :{{ item.language }}</div>
                  <div class="subheanding">
                    PRODUCED_BY{{ item.Produced_by }}
                  </div>
                </v-card-text>
                <v-card-actions class="grey" @click="deleteItem(index)"
                  >Delete</v-card-actions
                >
                <v-card-actions class="grey mt-3" @click="editItem(index)"
                  >Edit
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </div>

      <blockquote class="blockquote">
        &#8220;First, solve the problem. Then, write the code.&#8221;
        <footer>
          <small>
            <em>&mdash;John Johnson</em>
          </small>
        </footer>
      </blockquote>
    </v-col>
    <!--<v-col v-show="check">123</v-col>-->
  </v-row>
</template>

<script>
export default {
  name: 'InspirePage',

  data() {
    return {
      isEditing: false,
      obj: {},
      currentmovie: [],
      cards: [
        {
          title: 'Pre-fab homes',
          src: 'https://maxcdn.icons8.com/app/uploads/2019/05/poster-for-movie.png',
        },
      ],
    }
  },
  methods: {
    addMovie(index) {
      this.currentmovie.push({ ...this.obj })
      this.obj = {}
    },
    deleteItem(index) {
      this.currentmovie.splice(index, 1)
    },
    editItem(index) {
      this.isEditing = true
      this.obj = { ...this.currentmovie[index], key: index }
    },
    updateMovie(index) {
      this.isEditing = false
      this.currentmovie[index] = { ...this.obj }
      this.obj = {}
    },
  },
}
</script>

