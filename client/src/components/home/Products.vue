<script>
import Tipsproductmsg from "@/components/tooltips/Tipsproductmsg.vue";
import ProductCard from "@/components/product/ProductCard.vue";
import { computed, reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";

export default {
  props: {
    home: {
      type: Boolean,
      default: false,
    },
    cat: {
      type: String,
    },
    filters: {
      type: Object,
      default: () => ({}),
    },
  },
  components: { ProductCard, Tipsproductmsg },
  setup(props) {
    const products = reactive({
      products: {},
      setProducts(data) {
        products.products = data;
      },
    });

    const getFilter = () => {
      if (Object.keys(props.filters).length == 0) {
        return products.products;
      } else if (Object.keys(products.products).length > 0) {
        let arr = [];
        let isAllColor, isAllSize;
        if (props.filters.inputColor === "全部") isAllColor = true;
        if (props.filters.inputSize === "全部") isAllSize = true;

        if (isAllColor && isAllSize) return sortData(products.products);

        products.products.forEach((el) => {
          const color = el.color[0].split(" ")[0];
          const isSize = el.size.includes(props.filters.inputSize);
          const isColor = color.includes(props.filters.inputColor);

          if (isAllColor && isSize) arr.push(el);
          if (isAllSize && isColor) arr.push(el);
          if (isColor && isSize) arr.push(el);
        });
        return sortData(arr);
      }
    };

    const sortData = (data) => {
      if (props.filters.inputSort == "最新") {
        return data.sort((a, b) => a.createdAt - b.createdAt);
      } else if (props.filters.inputSort == "價格(低→高)") {
        return data.sort((a, b) => a.price - b.price);
      } else {
        return data.sort((a, b) => b.price - a.price);
      }
    };

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

    onMounted(async () => {
      const res = await axios.get(
        props.cat ? `/api/product?category=${props.cat}` : "/api/product/"
      );
      let data;
      props.home ? (data = res.data.slice(0, 8)) : (data = res.data);
      products.setProducts(data);
    });

    return { props, products, getFilter, handleEmit, toggleFav };
  },
};
</script>
<template>
  <Tipsproductmsg v-if="toggleFav.isChange" :isTips="toggleFav" />
  <div class="container mt-5">
    <div class="row">
      <ProductCard
        v-for="product in getFilter()"
        :key="product._id"
        :product="product"
        @isTips="handleEmit"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: none;

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.3);
  }

  &:hover .card-img-overlay > a {
    opacity: 1;
  }

  &::after {
    position: absolute;
    content: "";
    width: calc(100% - 16px);
    height: calc(100% - 16px);
    top: 8px;
    left: 8px;
    transition: 0.2s ease;
  }

  .card-img-overlay {
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.2s ease;

    a:not(:first-child) {
      @media screen and (max-width: 992px) {
        margin-left: 1.5rem !important;
      }
      @media screen and (max-width: 768px) {
        margin-left: 3rem !important;
      }
    }

    > a {
      position: relative;
      color: var(--bs-dark);
      transition: 0.2s ease-in-out;
      opacity: 0;

      @media screen and (max-width: 992px) {
        transform: scale(0.7);
      }
      @media screen and (max-width: 768px) {
        transform: scale(1);
      }

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 180%;
        height: 180%;
        background-color: var(--bs-gray-200);
        border-radius: 50%;
        transition: 0.1s ease;
        z-index: -1;
      }

      &:hover::before {
        background-color: rgb(211, 235, 248);
      }
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
</style>