<template>
  <div>
    <Carousel trigger='click' height="600px" :autoplay='false' class="carousel">
      <CarouselItem v-for="(q,i) in passage.questions" :key='i'>
      <Card class="card">
        <div slot='header' class='subject' :style="{'font-size': fontSize + 'px'}">
          <span class='subject-index'>{{i+1}}. </span>
          <span class='subject-content'>{{ q.subject }}</span>
        </div>
        <div class="options" :style="{'font-size': fontSize - 2 + 'px'}">
          <div v-for="(o, j) in q.options" :key='j' class='option'>{{ 'ABCDEFGHIJK'[j] }}. {{ o }}</div>
        </div>
      </Card>
      </CarouselItem>
    </Carousel>
  </div>
</template>
<script>
import { ACTION_PASSAGE_FETCH } from '../store/types.js'
import { Carousel, CarouselItem, Card } from 'element-ui'
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
    fontSize: function () {
      return this.config.passage.fontSize
    }
  },
  mounted () {
    if (!this.id) return
    this.$store.dispatch(ACTION_PASSAGE_FETCH, { id: this.id })
  },
  updated () {
    if (!this.id) return
    this.$store.dispatch(ACTION_PASSAGE_FETCH, { id: this.id })
  },
  components: { Carousel, CarouselItem, Card }
}
</script>

<style lang="sass" scoped>
.card
  min-height: 400px

.subject
  font-weight: bold

.option
  font-size: 16px
  margin-bottom: 18px

  &:hover

.carousel
  text-align: left
  position: fixed
  width: 50%
  right: 30px
  top: 30px
</style>
