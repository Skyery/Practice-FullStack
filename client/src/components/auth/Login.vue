<script>
import { computed, reactive } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Error from "@/components/auth/Error.vue";
export default {
  components: { Error },
  setup() {
    const store = useStore();
    const router = useRouter();

    const inputText = reactive({
      username: "",
      password: "",
    });

    const error = reactive({
      msg: "",
      isError: computed(() => {
        return error.msg === "" ? false : true;
      }),
      setErrorMsg(msg) {
        error.msg = msg;
      },
    });

    const loginUser = () => {
      const user = {
        username: inputText.username,
        password: inputText.password,
      };

      store.dispatch("Auth/login", user).then((success) => {
        success
          ? window.history.state.back === "/auth"
            ? router.push({ path: "/" })
            : router.go(-1)
          : error.setErrorMsg(store.getters["Auth/error"]);
      });
    };

    return { inputText, loginUser, error };
  },
};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="card mx-auto col-md-6">
        <Error v-if="error.isError" :msg="error.msg" />
        <div class="card-header text-dark">
          <h4>登入</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="loginUser">
            <div class="form-group mb-3">
              <label class="mb-1" for="username">使用者名稱</label>
              <input
                type="text"
                id="username"
                class="form-control"
                placeholder="使用者名稱"
                name="username"
                v-model="inputText.username"
              />
            </div>
            <div class="form-group mb-3">
              <label class="mb-1" for="password">密碼</label>
              <input
                type="password"
                id="password"
                class="form-control"
                placeholder="密碼"
                name="password"
                v-model="inputText.password"
              />
            </div>
            <input type="submit" class="btn btn-success me-3" value="登入" />
            <span>需要註冊新帳號?</span>
            <router-link to="/auth/register" class="ms-2">前往註冊</router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-header {
  background-color: transparent;

  > h4 {
    margin: 0;
  }
}
</style>