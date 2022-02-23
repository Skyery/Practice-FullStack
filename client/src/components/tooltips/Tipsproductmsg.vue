<script>
export default {
  props: ["isTips"],
  setup(props) {
    return { props };
  },
};
</script>

<template>
  <div v-show="props.isTips.isAdd" class="fixedTop addFavorite">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      fill="currentColor"
      class="bi bi-check"
      viewBox="0 0 16 16"
    >
      <path
        d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"
      />
    </svg>
    <p>{{ props.isTips.getContent }}</p>
  </div>
  <div v-show="!props.isTips.isAdd" class="fixedTop removeFavorite">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      class="bi bi-info-circle"
      viewBox="0 0 16 16"
    >
      <path
        d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
      />
      <path
        d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
      />
    </svg>
    <p>{{ props.isTips.getContent }}</p>
  </div>
</template>

<style lang="scss" scoped>
.fixedTop {
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 50px;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
  z-index: 1500;

  > svg {
    color: var(--bs-light);
    margin-right: 1rem;
  }

  > p {
    margin: 0;
    color: var(--bs-light);
  }
}

.fixedTop.addFavorite {
  box-shadow: 0 3px 6px #2d453a;
  background-color: rgba(25, 135, 84, 0.85);
}

.fixedTop.removeFavorite {
  box-shadow: 0 3px 6px #3b4f6b;
  background-color: rgba(13, 110, 253, 0.85);
}
</style>