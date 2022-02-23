<script>
import Tipsproductmsg from "@/components/tooltips/Tipsproductmsg.vue";
import { computed, reactive } from "@vue/reactivity";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "@vue/runtime-core";
import axios from "axios";
import { useStore } from "vuex";
export default {
  components: { Tipsproductmsg },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const productData = reactive({
      data: {},
      inputSize: "",
      state: false,
      getColor: computed(() => {
        const colors = [];
        colors.push(productData.data.color[0].split(" ")[1]);
        return colors;
      }),
      initData(data) {
        productData.data = data;
        productData.inputSize = productData.data.size[0];
        productData.state = true;
      },
    });

    const addToCart = () => {
      const product = productData.data;
      const quantity = inputQuantity.inputText;
      const color = productData.getColor;
      const size = productData.inputSize;
      const createdAt = Date.now();

      if (!store.getters["Auth/isLogIn"]) {
        router.push({ path: "/auth/login" });
      } else {
        store.dispatch("Cart/addToCart", {
          ...product,
          quantity,
          color,
          size,
          createdAt,
        });
        handleClick(true);
      }
    };

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
    const handleClick = (isCart) => {
      clearTimeout(timer);
      toggleCart.setAdd(isCart);
      toggleCart.setChange(true);
      timer = setTimeout(() => {
        toggleCart.setChange(false);
      }, 1000);
    };

    const inputQuantity = reactive({
      inputText: 1,
      setValue(num) {
        inputQuantity.inputText === 1 && num === -1
          ? (inputQuantity.inputText = 1)
          : (inputQuantity.inputText += num);
      },
    });

    const changeQuantity = () => {
      let inputUqantity = parseInt(inputQuantity.inputText, 10);
      inputUqantity < 1
        ? (inputQuantity.inputText = 1)
        : (inputQuantity.inputText = inputUqantity);
    };

    onMounted(async () => {
      const res = await axios.get(`/api/product/find/${route.params.id}`);
      productData.initData(res.data);
    });

    return {
      inputQuantity,
      changeQuantity,
      productData,
      addToCart,
      toggleCart,
    };
  },
};
</script>

<template>
  <Tipsproductmsg v-if="toggleCart.isChange" :isTips="toggleCart" />
  <div class="container mt-5">
    <div class="row" v-if="productData.state">
      <div class="col-md-6">
        <div class="imgContent">
          <img :src="productData.data.img" />
        </div>
      </div>
      <div class="col-md-6 d-flex flex-column justify-content-center">
        <h2 class="my-4 text-md-start text-center">
          {{ productData.data.title }}
        </h2>
        <p class="mb-4">
          {{ productData.data.desc }}
        </p>
        <h2 class="fw-light mb-5 text-md-start text-center">
          $ {{ productData.data.price }}
        </h2>
        <div class="row mb-4">
          <div
            class="col-md-8 d-flex justify-content-between align-items-center"
          >
            <div class="d-flex">
              <h5>顏色</h5>
              <div
                class="colorSelect ms-2"
                v-for="color in productData.getColor"
                :key="color"
                :style="`background-color: ${color}`"
              ></div>
            </div>
            <div class="d-flex align-items-center">
              <h5>尺寸</h5>
              <select class="form-select ms-2" v-model="productData.inputSize">
                <option
                  v-for="size in productData.data.size"
                  :key="size"
                  :value="size"
                >
                  {{ size }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="d-flex justify-content-between">
              <div class="d-flex">
                <button
                  class="countBtn me-2"
                  @click="inputQuantity.setValue(-1)"
                >
                  -
                </button>
                <input
                  class="form-control"
                  type="text"
                  v-model="inputQuantity.inputText"
                  @change="changeQuantity"
                />
                <button
                  class="countBtn ms-2"
                  @click="inputQuantity.setValue(1)"
                >
                  +
                </button>
              </div>
              <button class="btn btn-outline-success" @click="addToCart">
                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.imgContent {
  width: 100%;
  height: 70vh;
  > img {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
    object-fit: contain;
  }
}

h5 {
  margin: 0;
  white-space: nowrap;
}

.colorSelect {
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid var(--bs-gray-500);
  border-radius: 50%;
  cursor: pointer;
}

.countBtn {
  border: none;
  background-color: transparent;
  font-size: 1.5rem;
  font-weight: bold;
}

.form-control {
  padding: 0;
  width: 3rem;
  text-align: center;
}
</style>