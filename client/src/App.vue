<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Newsletter from "@/components/home/Newsletter.vue";
export default {
  components: { Navbar, Footer, Newsletter },
  setup() {},
};
</script>

<template>
  <Navbar />
  <router-view />
  <Newsletter />
  <Footer />
</template>

<style lang="scss">
* {
  margin: 0;
  left: 0;
}
</style>
