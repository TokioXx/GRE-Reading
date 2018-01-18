<template>
  <div>
    {{ passage }}
  </div>
</template>
<script>
import { passage } from '../../assets/passages/unit1/passage1.json'

export default {
  data () {
    return {
      passage
    }
  }
}
</script>
