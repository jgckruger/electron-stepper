<template>
  <div class="config">
    <Config msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Config from '@/components/Config.vue'

export default {
  name: 'config',
  components: {
    Config
  }
}
</script>
