<template>
  <div class="card">
    <RegForm
      @clickBtnReg="
        registerUser({
          username: $event.username,
          email: $event.email,
          password: $event.password,
          is_active: true
        })
      "
    />
  </div>
</template>

<script>
// @ is an alias to /src
import RegForm from "@/components/RegForm.vue";
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "RegFormView",
  components: {
    RegForm,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      auth: "auth",
    }),
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      registerUser: "registerUser",
    }),
  },
};
</script>

