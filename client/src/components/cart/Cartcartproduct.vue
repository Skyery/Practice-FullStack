<script>
import { reactive } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  props: ["product"],
  setup(props, { emit }) {
    const store = useStore();

    const inputQuantity = reactive({
      inputText: props.product.quantity,
      setValue(num) {
        inputQuantity.inputText === 1 && num === -1
          ? (inputQuantity.inputText = 1)
          : (inputQuantity.inputText += num);

        updateState();
      },
    });

    const changeQuantity = () => {
      let inputUqantity = parseInt(inputQuantity.inputText, 10);
      inputUqantity < 1
        ? (inputQuantity.inputText = 1)
        : (inputQuantity.inputText = inputUqantity);

      updateState();
    };

    const updateState = () => {
      const quantity = inputQuantity.inputText;
      store.dispatch("Cart/updateCart", { ...props.product, quantity });
    };

    const deletFromCart = () => {
      store.dispatch("Cart/deleteFromCart", props.product);
      emit("isTips", 0);
    };

    return { props, inputQuantity, changeQuantity, deletFromCart };
  },
};
</script>

<template>
  <div class="row item py-3 d-flex flex-column flex-md-row">
    <div class="col-12 col-md-9 d-flex">
      <div class="col-4">
        <div class="imgContent">
          <img :src="props.product.img" />
        </div>
      </div>
      <div class="col-8 ms-2 d-flex flex-column justify-content-around">
        <h5 class="d-flex">
          商品 :
          <p class="ms-2">{{ props.product.title }}</p>
        </h5>
        <h5 class="d-flex">
          ID :
          <p class="ms-2">{{ props.product._id }}</p>
        </h5>
        <h5 class="d-flex">
          顏色 :
          <div
            class="ms-2 colorSelect"
            :style="`background: ${props.product.color[0]}`"
          ></div>
        </h5>
        <h5 class="d-flex">
          尺寸 :
          <p class="ms-2">{{ props.product.size }}</p>
        </h5>
      </div>
    </div>
    <div
      class="
        col-12 col-md-3
        mt-3 mt-md-0
        d-flex
        flex-row flex-md-column
        justify-content-around justify-content-md-center
        align-items-center
      "
    >
      <button class="deleteBtn mb-0 mb-md-3 p-0" @click="deletFromCart">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-trash"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </button>
      <div class="d-flex mb-0 mb-md-3">
        <button class="countBtn me-2" @click="inputQuantity.setValue(-1)">
          -
        </button>
        <input
          class="form-control"
          type="text"
          v-model="inputQuantity.inputText"
          @change="changeQuantity"
        />
        <button class="countBtn ms-2" @click="inputQuantity.setValue(1)">
          +
        </button>
      </div>
      <h2 class="m-0">$ {{ props.product.price * inputQuantity.inputText }}</h2>
    </div>
  </div>
</template>

<style lang="scss" scoped>
h5 {
  white-space: nowrap;
}
p {
  word-break: break-all;
  white-space: pre-wrap;
}
h5,
p {
  margin: 0;
}
.item {
  border-bottom: 2px solid rgba(0, 0, 0, 0.125);
}
.imgContent {
  width: 100%;
  height: 200px;

  > img {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
    object-fit: contain;
  }
}
.colorSelect {
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid var(--bs-gray-500);
  border-radius: 50%;
  cursor: pointer;
}
.countBtn {
  width: 2rem;
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

.deleteBtn {
  border: none;
  background-color: transparent;

  &:hover {
    color: var(--bs-danger);
  }
}
</style>