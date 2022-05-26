<template>
  <div>
    <tr v-for="(invoice_product, index) in invoice_products" :key="index">
      <td>
        <input
          class="form-control"
          type="text"
          v-model="products.productsName"
        />
      </td>
      <td>
        <input class="form-control" type="text" v-model="products.productsId" />
      </td>
      <td>
        <input
          class="form-control"
          type="text"
          v-model="products.productsWork"
        />
      </td>
      <button type="button" class="btn btn-info" @click="addNewRow">
        <i class="fas fa-plus-circle"></i>
        Add
      </button>
    </tr>
  </div>
</template>

<script>
export default {
  name: 'TablePage',

  data() {
    return
    {
         
      products: [
        {
          productsName: '',
          productsId: '',
          productsWork: '',
        },
      ]
    }
  },
  methods: {
    addNewRow() {
      this.products.push({
        productsName: '',
        productsId: '',
        productsWork: '',
      })
    },
  },
}
</script>
