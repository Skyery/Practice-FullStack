<script>
export default {};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-4 card text-white">
        <img
          src="https://images.unsplash.com/photo-1622445272461-c6580cab8755?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <div
          class="
            card-img-overlay
            d-flex
            flex-column
            justify-content-center
            align-items-center
          "
        >
          <h4 class="mb-4">T-shirt</h4>
          <router-link class="p-1 px-3" to="/products/tshirt"
            >購物去</router-link
          >
        </div>
      </div>
      <div class="col-md-4 card text-white">
        <img
          src="https://images.unsplash.com/photo-1551537482-f2075a1d41f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <div
          class="
            card-img-overlay
            d-flex
            flex-column
            justify-content-center
            align-items-center
          "
        >
          <h4 class="mb-4">薄外套</h4>
          <router-link class="p-1 px-3" to="/products/jacket"
            >購物去</router-link
          >
        </div>
      </div>
      <div class="col-md-4 card text-white">
        <img
          src="https://images.unsplash.com/photo-1552664199-fd31f7431a55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        />
        <div
          class="
            card-img-overlay
            d-flex
            flex-column
            justify-content-center
            align-items-center
          "
        >
          <h4 class="mb-4">休閒服飾</h4>
          <router-link class="p-1 px-3" to="/products/casual"
            >購物去</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.card {
  border: none;

  &::after {
    position: absolute;
    content: "";
    width: calc(100% - 24px);
    height: 100%;
    top: 0;
    left: 12px;
    background-color: rgba(0, 0, 0, 0.3);
  }

  > img {
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }

  .card-img-overlay {
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h4 {
      font-weight: bold;
      white-space: nowrap;
    }

    a {
      font-size: 1.5rem;
      text-decoration: none;
      color: var(--bs-light);
      font-weight: bold;
      border: 2px solid var(--bs-light);
      white-space: nowrap;
      transition: 0.1s ease;

      &:hover {
        background-color: var(--bs-light);
        color: var(--bs-gray-700);
      }
    }
  }
}
</style>