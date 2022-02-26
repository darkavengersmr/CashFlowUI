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
      <button class="btn main" @click="regUser">зарегистрироваться</button>
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
    ...mapState({      
    }),
  },
  methods: {
    regUser() {      
      this.$emit("clickBtnReg", {        
        username: this.form_username,
        password: this.form_password,
      });
    },
  },
};
</script>