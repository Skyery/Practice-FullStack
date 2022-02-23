<script>
export default {
  props: ["msg"],
  setup(props) {
    return { props };
  },
};
</script>

<template>
  <div class="my-2 d-flex align-items-center">
    <h4 class="m-0 px-3 fw-bold text-danger">{{ props.msg }}</h4>
  </div>
</template>