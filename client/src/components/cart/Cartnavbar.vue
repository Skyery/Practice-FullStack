<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const cartCount = computed(() => store.getters["Cart/cartCount"]);
    const favoriteCount = computed(() => store.getters["Cart/favoriteCount"]);

    return { cartCount, favoriteCount };
  },
};
</script>

<template>
  <div class="container mt-5">
    <h2 class="text-center mb-3">購物車</h2>
    <div class="row d-flex justify-content-between align-items-center">
      <div class="col-4 col-md-2">
        <router-link to="/products" class="btn btn-outline-success"
          >繼續選購</router-link
        >
      </div>
      <div
        class="
          col-4 col-md-4
          d-flex
          flex-column flex-sm-row
          justify-content-center
          align-items-center
        "
      >
        <router-link to="/cart/cart" class="me-2"
          >購物車({{ cartCount }})</router-link
        >
        <router-link to="/cart/favorite"
          >願望清單({{ favoriteCount }})</router-link
        >
      </div>
      <div class="col-4 col-md-2 text-end">
        <a href="#" class="btn btn-success">前往結帳</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.row div:nth-child(2) a {
  text-decoration: none;
  color: var(--bs-dark);
  transition: 0.1s ease;
  white-space: nowrap;

  &:hover {
    text-decoration: underline;
  }
}
</style>