<script>
import Tipsproductmsg from "@/components/tooltips/Tipsproductmsg.vue";
import Cartcartproduct from "@/components/cart/Cartcartproduct.vue";
import { useStore } from "vuex";
import { computed, reactive } from "vue";

export default {
  components: { Cartcartproduct, Tipsproductmsg },
  setup() {
    const store = useStore();

    const cartProduct = computed(() => store.getters["Cart/product"]);
    const cartTotal = computed(() => store.getters["Cart/total"]);
    const isCartEmpty = computed(() => {
      const cartCount = computed(() => store.getters["Cart/cartCount"]);
      return cartCount.value === 0 ? true : false;
    });

    const toggleCart = reactive({
      isAdd: false,
      isChange: false,
      getContent: computed(() => {
        return toggleCart.isAdd
          ? "已將該商品加入購物車 !"
          : "已將該商品從購物車移除 !";
      }),
      setAdd(bool) {
        toggleCart.isAdd = bool;
      },
      setChange(bool) {
        toggleCart.isChange = bool;
      },
    });

    let timer = null;
    const handleEmit = (isTips) => {
      clearTimeout(timer);
      toggleCart.setAdd(isTips.value);
      toggleCart.setChange(true);
      timer = setTimeout(() => {
        toggleCart.setChange(false);
      }, 1000);
    };

    return { cartProduct, cartTotal, isCartEmpty, handleEmit, toggleCart };
  },
};
</script>

<template>
  <Tipsproductmsg v-if="toggleCart.isChange" :isTips="toggleCart" />
  <div class="container mt-3">
    <div v-if="isCartEmpty" class="row">
      <div class="col-md-12 text-center">
        <h2 class="my-5">購物車裡面什麼都沒有...</h2>
      </div>
    </div>
    <div v-if="!isCartEmpty" class="row d-flex flex-column flex-lg-row">
      <div class="col-lg-8">
        <Cartcartproduct
          v-for="product in cartProduct"
          :key="product.createdAt"
          :product="product"
          @isTips="handleEmit"
        />
      </div>
      <div class="col-lg-4 p-0 mt-5 mt-lg-0">
        <div class="d-flex summary flex-column px-3">
          <h2 class="py-2">訂單詳細</h2>
          <h5 class="d-flex justify-content-between">
            商品計價
            <p class="">$ {{ cartTotal }}</p>
          </h5>
          <h5 class="d-flex justify-content-between">
            運費
            <p>$ 100</p>
          </h5>
          <h5 class="d-flex justify-content-between">
            折抵運費
            <p>$ -100</p>
          </h5>
          <h4 class="d-flex justify-content-between fw-bold m-0 pt-3">
            總計
            <p>$ {{ cartTotal }}</p>
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summary {
  border: 2px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.35rem;

  > h2 {
    border-bottom: 2px solid rgba(0, 0, 0, 0.125);
  }

  > h4 {
    border-top: 2px solid rgba(0, 0, 0, 0.125);
  }
}
</style>