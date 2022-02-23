<script>
import Products from "@/components/home/Products.vue";
import { reactive } from "@vue/reactivity";
import { useRoute } from "vue-router";
export default {
  components: { Products },
  setup() {
    const route = useRoute();

    const cat = route.path.split("/")[2];

    const filters = reactive({
      inputColor: "全部",
      inputSize: "全部",
      inputSort: "最新",
      colorsModel: [
        { color: "全部" },
        { color: "白色" },
        { color: "灰色" },
        { color: "黑色" },
        { color: "紅色" },
        { color: "藍色" },
        { color: "綠色" },
        { color: "紫色" },
      ],
      sizesModel: [
        { size: "全部" },
        { size: "XS" },
        { size: "S" },
        { size: "M" },
        { size: "L" },
        { size: "XL" },
      ],
      sortsModel: [
        { sort: "最新" },
        { sort: "價格(低→高)" },
        { sort: "價格(高→低)" },
      ],
    });

    return { filters, cat };
  },
};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-6 d-flex align-items-center mb-2 mb-md-0">
        <h4 class="me-2">類別篩選 :</h4>
        <select class="form-select me-2" v-model="filters.inputColor">
          <option
            v-for="color in filters.colorsModel"
            :key="color.color"
            :value="color.color"
          >
            {{ color.color }}
          </option>
        </select>
        <select class="form-select" v-model="filters.inputSize">
          <option
            v-for="size in filters.sizesModel"
            :key="size.size"
            :value="size.size"
          >
            {{ size.size }}
          </option>
        </select>
      </div>
      <div class="col-md-6 d-flex align-items-center">
        <h4 class="me-2">排序方式 :</h4>
        <select class="form-select" v-model="filters.inputSort">
          <option
            v-for="sort in filters.sortsModel"
            :key="sort.sort"
            :value="sort.sort"
          >
            {{ sort.sort }}
          </option>
        </select>
      </div>
    </div>
  </div>
  <Products :cat="cat" :filters="filters" />
</template>


<style lang="scss" scoped>
h4 {
  white-space: nowrap;
  margin: 0;
}
</style>