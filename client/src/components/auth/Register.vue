<script>
import { reactive, computed } from "vue";
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
      email: "",
      password: "",
      confirm_password: "",
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

    const registerUser = () => {
      const userData = {
        username: inputText.username,
        email: inputText.email,
        password: inputText.password,
        confirm_password: inputText.confirm_password,
      };

      store.dispatch("Auth/register", userData).then((success) => {
        success
          ? router.push({ path: "/auth/login" })
          : error.setErrorMsg(store.getters["Auth/error"]);
      });
    };

    return { inputText, registerUser, error };
  },
};
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="card mx-auto col-md-6">
        <Error v-if="error.isError" :msg="error.msg" />
        <div class="card-header text-dark">
          <h4>註冊帳號</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="registerUser">
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
              <label class="mb-1" for="email">電子信箱</label>
              <input
                type="text"
                id="email"
                class="form-control"
                placeholder="電子信箱"
                name="email"
                v-model="inputText.email"
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
            <div class="form-group mb-3">
              <label class="mb-1" for="confirm_password">密碼驗證</label>
              <input
                type="password"
                id="confirm_password"
                class="form-control"
                placeholder="密碼驗證"
                name="confirm_password"
                v-model="inputText.confirm_password"
              />
            </div>
            <input type="submit" class="btn btn-success me-3" value="註冊" />
            <span>已擁有帳號?</span>
            <router-link to="/auth/login" class="ms-2">前往登入</router-link>
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