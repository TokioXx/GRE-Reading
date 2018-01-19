<template>
  <div>
    <div class="content" :style='style'>
      <p v-for="(pa, i) in passage.content" :key='i'>{{ pa }}</p>
    </div>
  </div>
</template>
<script>
import { ACTION_PASSAGE_FETCH } from '../store/types.js'
export default {
  props: {
    id: String
  },
  computed: {
    passage () {
      return this.$store.state.passage.passages[this.id] || {}
    },
    config: function () {
      return this.$store.state.config
    },
    style: function () {
      return {
        'font-size': this.config.passage.fontSize + 'px'
      }
    }
  },
  mounted () {
    if (!this.id) return
    this.$store.dispatch(ACTION_PASSAGE_FETCH, { id: this.id })
  },
  updated () {
    if (!this.id) return
    this.$store.dispatch(ACTION_PASSAGE_FETCH, { id: this.id })
  }
}
</script>

<style lang="sass" scoped>

.content
  margin: 60px
  text-align: left
</style>
