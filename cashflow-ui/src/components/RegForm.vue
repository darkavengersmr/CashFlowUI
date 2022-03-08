<template>
  <div class="card">
    <div>
      Имя
      <input
        class="login input"
        type="text"
        v-model="form_username"
        @keypress.enter="regUser"
      />
      <div></div>
      Email
      <input
        class="login input"
        type="text"
        v-model="form_email"
        @keypress.enter="regUser"
      />
      <div></div>
      Пароль
      <input
        class="login input"
        type="password"
        v-model="form_password"
        @keypress.enter="regUser"
      />
    </div>
    <br />
    <div class="card">
      <button class="btn login" @click="regUser">зарегистрироваться</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    username: String,
    password: String,
  },
  emits: ["clickBtnReg"],
  data() {
    return {
      form_username: "",
      form_password: "",
      form_email: "",
    };
  },
  computed: {
    ...mapState({}),
  },
  methods: {
    regUser() {
      this.$emit("clickBtnReg", {
        username: this.form_username,
        email: this.form_email,
        password: this.form_password,
      });
    },
  },
};
</script>

<style scoped>
.btn.login {
  font-size: 16px;
  background: #004209;
  color: rgb(255, 255, 255);
  width: 240px;
  height: 32px;
  border-radius: 8px;
  padding: 0px;
  margin: 0px 0px 0px 0px;
}

.login.input {
  font-size: 16px;
  background: #323232;
  color: rgb(255, 255, 255);
  width: 120px;
  height: 32px;
  border-radius: 8px;
  padding: 15px;
  margin: 20px 0px 20px 0px;
  border: 0;
  box-shadow: none;
  margin: 10px 0px 2px 2px;
}
</style>