<template>
  <div>這是購物車頁面</div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="carts">
        <tr v-for="cart in carts" :key="cart.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="delCart(cart.id, cart.product.title)"
            >
              <!-- <i class="fas fa-spinner fa-pulse"></i> -->
              x
            </button>
          </td>
          <td>
            {{ cart.product.title }}
            <div class="text-success">已套用優惠券</div>
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <input
                  min="1"
                  type="number"
                  class="form-control"
                  v-model.number="cart.qty"
                  :disabled="cart.product.id === loadingItem"
                  @change="updateQty(cart.product_id, cart.qty, cart.id)"
                />
                <span class="input-group-text" id="basic-addon2">{{
                  cart.product.unit
                }}</span>
              </div>
            </div>
          </td>
          <td class="text-end">
            <small class="text-success">折扣價：</small>
            {{ cart.total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ calculateTotal(carts) }}</td>
      </tr>
      <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ calculateFinalTotal(carts) }}</td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      product: {},
      carts: [],
      user: {
        name: "",
        email: "",
        tel: "",
        address: "",
      },
      message: "",
      loadingItem: "",
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.carts = res.data.data.carts;
          console.log(this.carts);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    updateQty(product_id, qty, id) {
      const data = {
        product_id: product_id,
        qty: qty,
      };
      this.loadingItem = product_id;
      this.$http
        .put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${id}`, { data })
        .then((res) => {
          console.log(product_id, qty);
          this.getCart();
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    delCart(cartId, title) {
      this.$http
        .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${cartId}`)
        .then((res) => {
          alert(`商品 ${title} 已刪除`);
          this.getCart();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    delCarts() {
      if (this.carts.length > 0) {
        this.$http
          .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/carts`)
          .then((res) => {
            this.getCart();
            alert("購物車已清空");
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      } else {
        alert("購物車是空的,請先將商品加入購物車!!");
      }
    },
    calculateTotal(carts) {
      return carts.reduce(
        (acc, cur) => acc + cur.product.origin_price * cur.qty,
        0
      );
    },
    calculateFinalTotal(carts) {
      return carts.reduce((acc, cur) => acc + cur.total, 0);
    },
    doAjax() {
      this.isLoading = true;
      // simulate AJAX
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  },
  mounted() {
    this.getCart();
  },
};
</script>
