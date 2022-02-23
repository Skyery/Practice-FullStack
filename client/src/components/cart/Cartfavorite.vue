<script>
import Tipsproductmsg from "@/components/tooltips/Tipsproductmsg.vue";
import ProductCard from "@/components/product/ProductCard.vue";
import { useStore } from "vuex";
import { computed, reactive } from "vue";
export default {
  components: { ProductCard, Tipsproductmsg },
  setup() {
    const store = useStore();

    const favorite = computed(() => store.getters["Cart/favorite"]);

    const isFavoriteEmpty = computed(() => {
      const favoriteCount = computed(() => store.getters["Cart/favoriteCount"]);
      return favoriteCount.value === 0 ? true : false;
    });

    const toggleFav = reactive({
      isAdd: false,
      isChange: false,
      getContent: computed(() => {
        return toggleFav.isAdd
          ? "已將該商品加入追縱 !"
          : "已將該商品移除追縱 !";
      }),
      setAdd(bool) {
        toggleFav.isAdd = bool;
      },
      setChange(bool) {
        toggleFav.isChange = bool;
      },
    });

    let timer = null;
    const handleEmit = (isFavorite) => {
      clearTimeout(timer);
      toggleFav.setAdd(isFavorite.value);
      toggleFav.setChange(true);
      timer = setTimeout(() => {
        toggleFav.setChange(false);
      }, 1000);
    };

    return { favorite, isFavoriteEmpty, handleEmit, toggleFav };
  },
};
</script>

<template>
  <Tipsproductmsg v-if="toggleFav.isChange" :isTips="toggleFav" />
  <div class="container mt-3">
    <div v-if="isFavoriteEmpty" class="row">
      <h2 class="text-center my-5">願望清單裡面什麼都沒有...</h2>
    </div>
    <div v-if="!isFavoriteEmpty" class="row">
      <ProductCard
        v-for="product in favorite"
        :key="product._id"
        :product="product"
        @isTips="handleEmit"
      />
    </div>
  </div>
</template>

<style>
</style>