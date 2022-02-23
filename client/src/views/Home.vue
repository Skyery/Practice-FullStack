<script>
import Article from "@/components/home/Article.vue";
import Category from "@/components/home/Category.vue";
import Products from "@/components/home/Products.vue";

export default {
  name: "Home",
  components: { Article, Category, Products },
};
</script>

<template>
  <Article />
  <Category />
  <Products :home="true" />
</template>
