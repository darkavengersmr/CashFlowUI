<template>
  <div class="card">
    <RegForm />
  </div>
</template>

<script>
// @ is an alias to /src
import RegForm from '@/components/RegForm.vue'

export default {
  name: 'RegFormView',
  components: {
    RegForm
  }
}
</script>
