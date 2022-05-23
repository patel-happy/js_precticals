<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <div>
        <v-container class="my-5">
          <v-flex xs12 sm6 md4 lg3>
           <div>
  <button @click="counterComputed++">computed button</button>
  <p>{{ counterComputed }}</p> <br/>
  <button @click="counterMethod++">method button</button>   
  <p>{{ counterMethod }}</p> <br/>
  {{ printTextMethod() }}
  {{ printTextComputed }}
</div>
            

           
          </v-flex>
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
  name: 'GetsetPage',

  data() {
    return {

    counterComputed: 0,
    counterMethod: 0

    }
  },
  computed: {
  printTextComputed()
     { 
    console.log('counter printed from computed:', this.counterComputed);
  }
},
  methods: {
  printTextMethod() 
  {
    console.log('counter printed from method:',this.counterMethod);
  }
},
}
</script>

