<script>
import { computed } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const isLogIn = computed(() => store.getters["Auth/isLogIn"]);

    const logoutUser = () => {
      store.dispatch("Auth/logout").then(() => {
        router.push({ path: "/" });
      });
    };

    return { isLogIn, logoutUser };
  },
};
</script>

<template>
  <div class="container mt-5">
    <div v-if="!isLogIn" class="row d-flex justify-content-center text-center">
      <router-link to="/auth/register" class="card col-md-3 col-5 p-2">
        <div class="mt-5 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            class="bi bi-person-plus"
            viewBox="0 0 16 16"
          >
            <path
              d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
            />
            <path
              fill-rule="evenodd"
              d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
            />
          </svg>
        </div>
        <h5 class="mb-5">註冊會員</h5>
      </router-link>
      <router-link to="/auth/login" class="card col-md-3 col-5 p-2">
        <div class="mt-5 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            class="bi bi-person"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
            />
          </svg>
        </div>
        <h5 class="mb-5">登入會員</h5>
      </router-link>
    </div>
    <div v-if="isLogIn" class="row d-flex justify-content-center text-center">
      <button class="card cardDanger col-md-3 col-5 p-2" @click="logoutUser">
        <div class="mt-5 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            fill="currentColor"
            class="bi bi-person-x"
            viewBox="0 0 16 16"
          >
            <path
              d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
            />
            <path
              fill-rule="evenodd"
              d="M12.146 5.146a.5.5 0 0 1 .708 0L14 6.293l1.146-1.147a.5.5 0 0 1 .708.708L14.707 7l1.147 1.146a.5.5 0 0 1-.708.708L14 7.707l-1.146 1.147a.5.5 0 0 1-.708-.708L13.293 7l-1.147-1.146a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </div>
        <h5 class="mb-5">登出</h5>
      </button>
    </div>
  </div>
  <router-view></router-view>
</template>

<style lang="scss" scoped>
.row > a:nth-child(1) {
  margin-right: 2rem;

  @media screen and (max-width: 576px) {
    margin-right: 1rem;
  }
}
.card {
  cursor: pointer;
  text-decoration: none;
  color: var(--bs-dark);
  transition: 0.1s ease;

  &:hover {
    transform: scale(1.05);
    color: var(--bs-success);
    border-color: var(--bs-success);
  }
}

.cardDanger:hover {
  color: var(--bs-danger);
  border-color: var(--bs-danger);
}
</style>
