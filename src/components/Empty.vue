<template>
  <div v-bind:style="{height: height}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  mounted () {
    this.height = Math.max(window.innerHeight - this.$el.offsetTop, 0) + 'px'
  },
  data () {
    return {
      height: 0
    }
  }
}

</script>
