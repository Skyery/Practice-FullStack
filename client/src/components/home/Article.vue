<script>
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";
import "swiper/swiper-bundle.min.css";

export default {
  components: { Swiper, SwiperSlide },
};
</script>

<template>
  <article>
    <swiper
      :slidesPerView="1"
      :spaceBetween="0"
      :loop="true"
      :navigation="false"
      class="mySwiper"
    >
      <swiper-slide>
        <div class="innerSlider">
          <div class="container">
            <div class="row">
              <div class="imgContent col-6 pt-5">
                <img class="" src="@/img/img1.png" />
              </div>
              <div
                class="
                  col-6
                  ps-5
                  d-flex
                  flex-column
                  justify-content-center
                  align-items-start
                  txtContent
                "
              >
                <h2 class="mb-2">夏季特賣</h2>
                <p class="mb-4">新會員現享 30% 優惠 !</p>
                <router-link class="p-1 px-4" to="/products"
                  >購物去</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="innerSlider">
          <div class="container">
            <div class="row">
              <div class="imgContent col-6 pt-5">
                <img class="" src="@/img/img2.png" />
              </div>
              <div
                class="
                  col-6
                  ps-5
                  d-flex
                  flex-column
                  justify-content-center
                  align-items-start
                  txtContent
                "
              >
                <h2 class="mb-2">夏季特賣</h2>
                <p class="mb-4">新會員現享 30% 優惠 !</p>
                <router-link class="p-1 px-4" to="/products"
                  >購物去</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="innerSlider">
          <div class="container">
            <div class="row">
              <div class="imgContent col-6 pt-5">
                <img class="" src="@/img/img3.png" />
              </div>
              <div
                class="
                  col-6
                  ps-5
                  d-flex
                  flex-column
                  justify-content-center
                  align-items-start
                  txtContent
                "
              >
                <h2 class="mb-2">夏季特賣</h2>
                <p class="mb-4">新會員現享 30% 優惠 !</p>
                <router-link class="p-1 px-4" to="/products"
                  >購物去</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
      <swiper-slide>
        <div class="innerSlider">
          <div class="container">
            <div class="row">
              <div class="imgContent col-6 pt-5">
                <img class="" src="@/img/img4.png" />
              </div>
              <div
                class="
                  col-6
                  ps-5
                  d-flex
                  flex-column
                  justify-content-center
                  align-items-start
                  txtContent
                "
              >
                <h2 class="mb-2">夏季特賣</h2>
                <p class="mb-4">新會員現享 30% 優惠 !</p>
                <router-link class="p-1 px-4" to="/products"
                  >購物去</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </article>
</template>

<style lang="scss" scoped>
.innerSlider {
  width: 100%;
  background-color: var(--bs-gray-400);
  cursor: grab;

  .imgContent {
    height: 500px;

    @media screen and (max-width: 992px) {
      height: 350px;
    }
    @media screen and (max-width: 768px) {
      height: 290px;
    }
    @media screen and (max-width: 576px) {
      height: 200px;
    }

    > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
      vertical-align: bottom;
    }
  }

  .txtContent {
    h2 {
      font-size: 4rem;
    }
    p {
      font-size: 1.5rem;
    }
    a {
      font-size: 1.5rem;
      text-decoration: none;
      color: var(--bs-gray-700);
      font-weight: bold;
      border: 2px solid var(--bs-gray-700);
      transition: 0.1s ease;

      &:hover {
        background-color: var(--bs-gray-700);
        color: var(--bs-light);
      }
    }

    @media screen and (max-width: 992px) {
      h2 {
        font-size: 3rem;
      }
      p,
      a {
        font-size: 1.25rem;
      }
    }
    @media screen and (max-width: 576px) {
      h2 {
        font-size: 2rem;
      }
      p,
      a {
        font-size: 1rem;
      }
    }
  }
}
</style>