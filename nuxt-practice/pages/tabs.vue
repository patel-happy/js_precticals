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
         <v-btn type="button">search</v-btn>

        </v-row>
       
        
      </div>

      <div>
        <v-tabs v-model="tab">
          <v-tab v-for="item in items" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
        <!--for all tablscontaint-->
        <v-layout row wrap>
        
        <v-tabs-items  v-model="tab">
            <!--1-->
          <v-tab-item>
            <v-card flat v-for="(item,index) in Movies" :key="index" >
              <v-card-title >
                  {{item.name}}
            </v-card-title>
            <v-card-text>{{item.language}}</v-card-text>
            </v-card>
          </v-tab-item>
          <!-- 1 -->
          <v-tab-item>
            <v-card flat v-for="(item,index) in moviesName" :key="index" >
              <v-card-title >
                  {{item.name}}
            </v-card-title>
            <v-card-text>{{item.language}}</v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat v-for="(item,index) in moviesName" :key="index" >
              <v-card-title >
                  {{item.name}}
            </v-card-title>
            <v-card-text>{{item.language}}</v-card-text>
            </v-card>
          </v-tab-item>
          <v-tab-item>
            <v-card flat v-for="(item,index) in moviesName" :key="index" >
              <v-card-title >
                  {{item.name}}
            </v-card-title>
            <v-card-text>{{item.language}}</v-card-text>
            </v-card>
          </v-tab-item>
          
        </v-tabs-items>
       
        </v-layout>
        <!--for all tablscontaint-->
      </div>
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
      obj: {},
      moviesName: [
        { name: 'pagalpanti', language: 'hindi' },
        { name: 'pagalpanti', language: 'hindi' },
        { name: 'bajiraowmastani', language: 'hindi' },
        { name: 'heropanti ', language: 'hindi' },
        { name: 'hero', language: 'hindi' },
        { name: 'bajigar', language: 'hindi' },
        { name: 'hasmatpagli', language: 'hindi' },
      ],
    }
  },
  computed: {
    Movies() {
      if (this.searchText) {
        return this.moviesName.filter((item) => {
          return this.searchText.toLowerCase().split(' ').every(v => item.name.toLowerCase().includes(v))
        })
      } else {
        return this.moviesName
      }
    },
  },
}
</script>
