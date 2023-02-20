<template>
  <div>這是購物車頁面</div>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th class="text-end">單價</th>
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
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ calculateFinalTotal(carts) }}</td>
      </tr>
    </tfoot>
  </table>

  <div class="my-5 row justify-content-center">
    <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="onSubmit">
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <v-field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="user.email"
        ></v-field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <v-field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="user.name"
        ></v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">收件人電話</label>
        <v-field
          id="tel"
          name="電話"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          :rules="isPhone"
          v-model="user.tel"
        ></v-field>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <v-field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="user.address"
        ></v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="message"
        ></textarea>
      </div>
      <div class="text-end">
        <button
          type="submit"
          class="btn btn-danger"
          :disabled="isclick === true"
        >
          送出訂單
        </button>
      </div>
    </v-form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage, defineRule, configure } from "vee-validate";
import { required, email } from "@vee-validate/rules";
import { localize, loadLocaleFromURL } from "@vee-validate/i18n";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;

defineRule("required", required);
defineRule("email", email);

// Object.keys("@vee-validate/rules").forEach((rule) => {
//   if (rule !== "default") {
//     defineRule(rule, "@vee-validate/rules"[rule]);
//   }
// });

// 讀取外部的資源
loadLocaleFromURL("./zh_TW.json");

// Activate the locale
configure({
  generateMessage: localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

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
      isclick: false,
    };
  },
  methods: {
    getCart() {
      const loader = this.$loading.show({
        // Optional parameters
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel,
      });
      this.$http
        .get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          this.carts = res.data.data.carts;
          loader.hide();
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
          .delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
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

    // 驗證用
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : "需要正確的電話號碼";
    },
    //送出訂單
    onSubmit() {
      this.isclick = true;
      const data = {
        user: this.user,
        message: this.message,
      };
      if (this.carts.length > 0) {
        this.$http
          .post(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/order`, { data })
          .then((res) => {
            alert(res.data.message);
            this.doAjax();
            this.$refs.form.resetForm();
            this.getCart();
            this.isclick = false;
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      } else {
        alert("購物車沒有東西喔!!");
      }
    },
  },
  components: {
    VForm: Form,
    VField: Field,
    ErrorMessage,
  },
  mounted() {
    this.getCart();
  },
};
</script>
