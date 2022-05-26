<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />

      <div>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Search"
              v-model="searchText"
              clearable
            ></v-text-field>
          </v-col>
        </v-row>
      </div>

      <v-row>
        <div>
          <v-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
          <!--for all tabs contain-->

          <v-tabs-items v-model="tab">
            <!--1-->
            <v-tab-item>
              <v-card flat v-for="(item, index) in Movies" :key="index">
                <v-card-title>
                  {{ item.name }}
                </v-card-title>
                <v-card-text>{{ item.language }}</v-card-text>
                <v-card-text>{{ item.type }}</v-card-text>
              </v-card>
            </v-tab-item>
            <!-- 1 -->
            <v-tab-item>
              <v-card flat v-for="(item, index) in actionMovie" :key="index">
                <v-card-title>
                  {{ item.name }}
                </v-card-title>
                <v-card-text>{{ item.language }}</v-card-text>
                <v-card-text>{{ item.type }}</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat v-for="(item, index) in dramaMovies" :key="index">
                <v-card-title>
                  {{ item.name }}
                </v-card-title>
                <v-card-text>{{ item.language }}</v-card-text>
                <v-card-text>{{ item.type }}</v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat v-for="(item, index) in comedyMovies" :key="index">
                <v-card-title>
                  {{ item.name }}
                </v-card-title>
                <v-card-text>{{ item.language }}</v-card-text>
                <v-card-text>{{ item.type }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>

          <!--for all tabs contain-->
        </div>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'TabsPage',

  data() {
    return {
      searchText: null,
      tab: null,
      items: ['ALL', 'Action', 'Drama', 'Comedy'],

      moviesName: [
        { name: 'pagalpanti', language: 'hindi', type: 'drama' },
        { name: 'paa', language: 'hindi', type: 'drama' },
        { name: 'bajiraowmastani', language: 'hindi', type: 'drama' },
        { name: 'fataposternikalahero', language: 'hindi', type: 'drama' },
        { name: 'bajigar', language: 'hindi', type: 'drama' },
        { name: 'fataposternikalahero', language: 'hindi', type: 'drama' },
        { name: 'paa', language: 'hindi', type: 'drama' },

        { name: 'badhaiho', language: 'hindi', type: 'comedy' },
        { name: 'hangama', language: 'hindi', type: 'comedy' },
        { name: 'badhaiho', language: 'hindi', type: 'comedy' },
        { name: 'heropanti ', language: 'hindi', type: 'comedy' },
        { name: 'hangama2', language: 'hindi', type: 'comedy' },
        { name: 'bhoolbhulaiya', language: 'hindi', type: 'comedy' },
        { name: 'bhootpolice', language: 'hindi', type: 'comedy' },

        { name: 'hero', language: 'hindi', type: 'action' },
        { name: 'Dhaakad', language: 'hindi', type: 'action' },
        { name: 'Sooryavanshi', language: 'hindi', type: 'action' },
        { name: 'banchhanpandey', language: 'hindi', type: 'action' },
        { name: 'bellbottom', language: 'hindi', type: 'action' },
        { name: 'radhe', language: 'hindi', type: 'action' },
        { name: 'sayonee', language: 'hindi', type: 'action' },
      ],
    }
  },
  computed: {
    Movies() {
      if (this.searchText) {
        return this.moviesName.filter((item) => {
          return this.searchText
            .toLowerCase()
            .split(' ')
            .every((v) => item.name.toLowerCase().includes(v))
        })
      } else {
        return this.moviesName
      }
    },
    actionMovie() {
      return this.Movies.filter((item) => item.type == 'action')  
    },
    dramaMovies() {
      return this.Movies.filter((item) => item.type == 'drama')
    },
    comedyMovies() {
      return this.Movies.filter((item) => item.type == 'comedy')
    },
  },
}
</script>
