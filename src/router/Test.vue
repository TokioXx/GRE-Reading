<template>
  <div>
      <Passage :id="id" class="passage"></Passage>
      <Question :id="id"></Question>
  </div>
</template>

<script>

import { Container, Main } from 'element-ui'
import Passage from '../components/Passage'
import Question from '../components/Question'

export default {
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  components: { Container, Main, Passage, Question }
}

</script>

<style lang="sass" scoped>

.passage
  width: 50%

</style>
