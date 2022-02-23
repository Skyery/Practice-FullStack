<script>
export default {};
</script>

<template>
  <section class="py-5 mt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-8 d-flex flex-column align-items-center">
          <h1 class="fw-bold">訂閱通知</h1>
          <p>訂閱我們，您將收到關注商品的即時通知</p>
          <div class="d-flex w-100">
            <input
              class="form-control px-3 py-2"
              type="email"
              placeholder="Your email"
              aria-label="Email"
            />
            <button class="btn btn-success px-4 ms-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-send"
                viewBox="0 0 16 16"
              >
                <path
                  d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section {
  background-color: #fdf5ee;

  h1 {
    font-size: 4rem;
  }
  p {
    font-size: 1.5rem;
  }
}
</style>