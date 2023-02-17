<template>
  這是後台頁面
  <router-link to="/admin/products">後臺產品列表</router-link> |
  <router-link to="/admin/orders">後臺訂單列表</router-link> |
  <router-link to="/">回前台</router-link> |
  <a href="#" @click.prevent="logout">登出</a>
  <hr />
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from "vue-router";
const { VITE_APP_URL } = import.meta.env;

export default {
  components: {
    RouterView,
  },
  methods: {
    logout() {
      document.cookie = `hexToken=;expires=${new Date()}`;
      this.$router.push("/login");
    },
    checkAdmin() {
      // 取出 Token(google取得)
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      // 將token放入headers,只需發送一次(google取得)
      this.$http.defaults.headers.common.Authorization = token;

      // 驗證使用者是否有登入(有登入取得商品資訊，沒有則返回登入頁面)
      const api = `${VITE_APP_URL}/v2/api/user/check`;
      this.$http.post(api).then((res) => {
        console.log(123);
        if (!res.data.success) {
          this.$router.push("/login");
        }
      });
    },
  },
  mounted() {
    this.checkAdmin();
  },
};
</script>
