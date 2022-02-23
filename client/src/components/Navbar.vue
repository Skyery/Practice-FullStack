<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const cartCount = computed(() => store.getters["Cart/cartCount"]);

    return { cartCount };
  },
};
</script>

<template>
  <nav class="py-2 bg-light sticky-top">
    <div class="container">
      <div class="row justify-content-between">
        <div class="col-md-9 order-md-last">
          <div class="row">
            <div
              class="col-md-8 d-flex justify-content-center align-item-center"
            >
              <router-link to="/" class="navbar-brand m-0 text-dark"
                >E-SHOP</router-link
              >
            </div>
            <div class="col-md-4">
              <ul
                class="navbar-nav justify-content-md-end justify-content-center"
              >
                <li class="nav-item">
                  <router-link to="/auth" class="nav-link">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                      /></svg
                  ></router-link>
                </li>
                <li class="nav-item ms-4">
                  <router-link
                    to="/cart"
                    class="cartIcon nav-link"
                    :data-totalItems="cartCount"
                    ><svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      class="bi bi-cart2"
                      viewBox="0 0 16 16"
                    >
                      <path
                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z"
                      /></svg
                  ></router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <form class="search-form">
            <div class="form-group d-flex">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-outline-success" type="submit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </nav>
</template>


<style lang="scss" scoped>
.navbar-nav {
  flex-direction: row;

  .nav-item > a {
    color: var(--bs-secondary);

    &:hover,
    &.router-link-exact-active {
      color: var(--bs-dark);
    }
  }

  .cartIcon {
    position: relative;

    &::after {
      position: absolute;
      content: attr(data-totalItems);
      top: 0;
      right: -0.5rem;
      width: 1rem;
      height: 1rem;
      text-align: center;
      line-height: 1rem;
      color: var(--bs-light);
      font-size: 0.75rem;
    }

    &::before {
      position: absolute;
      content: "";
      top: 0;
      right: -0.5rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      background-color: var(--bs-danger);
    }
  }
}
</style>