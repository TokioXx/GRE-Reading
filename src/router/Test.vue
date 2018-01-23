<template>
  <div>
      <Passage :id="id" class="passage"></Passage>
      <Questions :id="id"></Questions>
  </div>
</template>

<script>

import { Container, Main } from 'element-ui'
import Passage from '../components/Passage'
import Questions from '../components/Questions'

export default {
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  components: { Container, Main, Passage, Questions }
}

</script>

<style lang="sass" scoped>

.passage
  width: 50%

</style>
