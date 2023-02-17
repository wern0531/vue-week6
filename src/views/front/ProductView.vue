<template>
  <div>這是單一產品頁面</div>
  <h2>{{ product.title }}</h2>
  <img :src="product.imageUrl" class="img-fluid" alt="" />
</template>

<script>
import { RouterLink } from "vue-router";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      product: {},
    };
  },
  components: {
    RouterLink,
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.product = res.data.product;
          console.log(this.product);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
