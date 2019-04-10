<template>
  <div class="config">
    <Command msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Command from '@/components/Command.vue'

export default {
  name: 'config',
  components: {
    Command
  }
}
</script>
