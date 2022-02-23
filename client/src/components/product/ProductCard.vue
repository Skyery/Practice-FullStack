<script>
import { computed } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  props: ["product"],
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();

    const addToFavorite = (product) => {
      if (!store.getters["Auth/isLogIn"]) {
        router.push({ path: "/auth/login" });
      } else {
        store.dispatch("Cart/addToFavorite", product);
        emit("isTips", isFavorite);
      }
    };

    const isFavorite = computed(() => {
      return store.getters["Cart/favorite"].some(
        (el) => el._id === props.product._id
      );
    });

    return { props, addToFavorite, isFavorite };
  },
};
</script>

<template>
  <div class="col-md-3 col-sm-6 card p-2 mx-auto">
    <img :src="props.product.img" />
    <div
      class="card-img-overlay d-flex justify-content-center align-items-center"
    >
      <router-link :to="`/product/${props.product._id}`"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-search"
          viewBox="0 0 16 16"
        >
          <path
            d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
          /></svg
      ></router-link>
      <button
        class="ms-5"
        :class="{ favorite: isFavorite }"
        @click="addToFavorite(props.product)"
      >
        <svg
          v-show="!isFavorite"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-heart"
          viewBox="0 0 16 16"
        >
          <path
            d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
          />
        </svg>
        <svg
          v-show="isFavorite"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          class="bi bi-heart-fill"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  border: none;

  &:hover::after {
    background-color: rgba(0, 0, 0, 0.3);
  }

  &:hover .card-img-overlay > button,
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

    > button,
    > a {
      position: relative;
      color: var(--bs-dark);
      transition: 0.2s ease-in-out;
      opacity: 0;
      border: none;
      padding: 0;

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
    > button.favorite {
      color: var(--bs-danger);
    }
  }
}
</style>