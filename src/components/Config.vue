<template>
  <div class="config">
    <div class="font">
      <span>字体大小:</span>
      <InputNumber :value="config.passage.fontSize" size='small' @change="onSizeChange" :min='14' :max='28'></InputNumber>
    </div>
  </div>
</template>

<script>

import { InputNumber } from 'element-ui'
import { CONFIG_FONTSIZE } from '../store/types.js'

export default {
  computed: {
    config: function () {
      return this.$store.state.config
    }
  },
  methods: {
    onSizeChange (size) {
      this.$store.commit(CONFIG_FONTSIZE, size)
    }
  },
  components: { InputNumber }
}

</script>

<style lang="sass" scoped>

.config
  display: flex
  flex-direction: row-reverse
  margin-bottom: 30px

.font
  span
    margin-right: 10px
    font-weight: bold
</style>
