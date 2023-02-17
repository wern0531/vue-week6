import{_ as m,o as u,c as h,d as t,F as p,f as x,g as v,t as n,a as g,h as b,v as C}from"./index-12c020d6.js";const{VITE_APP_URL:c,VITE_APP_PATH:i}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"wern",BASE_URL:"/vue-week6/",MODE:"production",DEV:!1,PROD:!0},f={data(){return{products:[],product:{},carts:[],user:{name:"",email:"",tel:"",address:""},message:"",loadingItem:"",isLoading:!1}},methods:{getCart(){this.$http.get(`${c}/v2/api/${i}/cart`).then(e=>{this.carts=e.data.data.carts,console.log(this.carts)}).catch(e=>{alert(e.response.data.message)})},updateQty(e,l,a){const _={product_id:e,qty:l};this.loadingItem=e,this.$http.put(`${c}/v2/api/${i}/cart/${a}`,{data:_}).then(o=>{console.log(e,l),this.getCart(),this.loadingItem=""}).catch(o=>{alert(o.response.data.message)})},delCart(e,l){this.$http.delete(`${c}/v2/api/${i}/cart/${e}`).then(a=>{alert(`商品 ${l} 已刪除`),this.getCart()}).catch(a=>{alert(a.response.data.message)})},delCarts(){this.carts.length>0?this.$http.delete(`${c}/api/${i}/carts`).then(e=>{this.getCart(),alert("購物車已清空")}).catch(e=>{alert(e.response.data.message)}):alert("購物車是空的,請先將商品加入購物車!!")},calculateTotal(e){return e.reduce((l,a)=>l+a.product.origin_price*a.qty,0)},calculateFinalTotal(e){return e.reduce((l,a)=>l+a.total,0)},doAjax(){this.isLoading=!0,setTimeout(()=>{this.isLoading=!1},1e3)}},mounted(){this.getCart()}},y=t("div",null,"這是購物車頁面",-1),T={class:"table align-middle"},$=t("thead",null,[t("tr",null,[t("th"),t("th",null,"品名"),t("th",{style:{width:"150px"}},"數量/單位"),t("th",null,"單價")])],-1),P=["onClick"],V=t("div",{class:"text-success"},"已套用優惠券",-1),A={class:"input-group input-group-sm"},E={class:"input-group mb-3"},I=["onUpdate:modelValue","disabled","onChange"],k={class:"input-group-text",id:"basic-addon2"},L={class:"text-end"},w=t("small",{class:"text-success"},"折扣價：",-1),D=t("td",{colspan:"3",class:"text-end"},"總計",-1),U={class:"text-end"},q=t("td",{colspan:"3",class:"text-end text-success"},"折扣價",-1),B={class:"text-end text-success"};function F(e,l,a,_,o,d){return u(),h(p,null,[y,t("table",T,[$,t("tbody",null,[o.carts?(u(!0),h(p,{key:0},x(o.carts,s=>(u(),h("tr",{key:s.id},[t("td",null,[t("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:r=>d.delCart(s.id,s.product.title)}," x ",8,P)]),t("td",null,[g(n(s.product.title)+" ",1),V]),t("td",null,[t("div",A,[t("div",E,[b(t("input",{min:"1",type:"number",class:"form-control","onUpdate:modelValue":r=>s.qty=r,disabled:s.product.id===o.loadingItem,onChange:r=>d.updateQty(s.product_id,s.qty,s.id)},null,40,I),[[C,s.qty,void 0,{number:!0}]]),t("span",k,n(s.product.unit),1)])])]),t("td",L,[w,g(" "+n(s.total),1)])]))),128)):v("",!0)]),t("tfoot",null,[t("tr",null,[D,t("td",U,n(d.calculateTotal(o.carts)),1)]),t("tr",null,[q,t("td",B,n(d.calculateFinalTotal(o.carts)),1)])])])],64)}const N=m(f,[["render",F]]);export{N as default};