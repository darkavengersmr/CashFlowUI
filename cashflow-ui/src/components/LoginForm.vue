<template>
  <div class="card">      
    <div>
      Имя
      <input
        class="login input"
        type="text"
        v-model="form_username"
        @keypress.enter="loginTo"        
      />
      <div></div>
      Пароль
      <input
        class="login input"
        type="password"
        v-model="form_password"
        @keypress.enter="loginTo"
      />
    </div>
    <br />
    <div class="card">
      <button class="btn main" @click="loginTo">войти</button>
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
  emits: ["clickBtnLogin"],
  data() {
    return {
      form_username: this.username,
      form_password: this.password,
    };
  },
  computed: {
    ...mapState({      
    }),
  },
  methods: {
    loginTo() {      
      this.$emit("clickBtnLogin", {        
        username: this.form_username,
        password: this.form_password,
      });
    },
  },
};
</script>