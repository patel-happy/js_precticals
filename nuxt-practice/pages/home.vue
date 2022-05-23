<template>
  <v-row>
    <v-col class="text-center">
      <img src="/v.png" alt="Vuetify.js" class="mb-5" />
      <div>
        <v-container class="my-5">
          <v-flex xs12 sm6 md4 lg3>
            <p class="grey ma-2">{{ obj.nested  }}</p>
            <p class="grey ma-2">{{ obj.arrs }}</p>
            <v-btn type="button" @click="increment()"> click</v-btn>
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
  name: 'HomePage',

  data() {
    return {
      obj: 
      {
         nested: { count: 0 },
       arrs: ['happy', 'sunny'] 
       
       },
    }
  },
  methods: {
    increment() {
      this.obj.nested.count++
      this.obj.arrs.push('gunj')
    },
  },
}
</script>

