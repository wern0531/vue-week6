import{_ as r,e as c,o as n,c as u,d as t,t as a,F as i}from"./index-295021d0.js";const{VITE_APP_URL:d,VITE_APP_PATH:p}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"wern",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0},l={data(){return{product:{}}},components:{RouterLink:c},methods:{getProduct(){const{id:o}=this.$route.params;this.$http.get(`${d}/v2/api/${p}/product/${o}`).then(e=>{this.product=e.data.product,console.log(this.product)})}},mounted(){this.getProduct()}},_=t("div",null,"這是單一產品頁面",-1),h=["src"];function P(o,e,m,g,s,f){return n(),u(i,null,[_,t("h2",null,a(s.product.title),1),t("img",{src:s.product.imageUrl,class:"img-fluid",alt:""},null,8,h)],64)}const A=r(l,[["render",P]]);export{A as default};
