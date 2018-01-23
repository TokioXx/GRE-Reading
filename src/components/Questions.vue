<template>
  <div class="container">
    <Button class="verify" type="text" @click="onVerify">{{ showAnswer ? '隐藏' : '显示' }}答案</Button>
    <Score :id="id" :visible="showAnswer" class="score"></Score>
    <Carousel trigger='click' height="600px" :autoplay='false' class="carousel">
      <CarouselItem v-for="(q,i) in passage.questions" :key='i'>
        <Question :id="id" :index="i+1" :subject="q.subject" :options="q.options" :answer="passage.answers[i]" :showAnswer="showAnswer"></Question>
      </CarouselItem>
    </Carousel>
  </div>
</template>
<script>
import { ACTION_PASSAGE_FETCH } from '../store/types.js'
import { Carousel, CarouselItem, Button } from 'element-ui'
import Question from './Question'
import Score from './Score'
export default {
  data () {
    return {
      showAnswer: false,
      userAnswers: []
    }
  },
  props: {
    id: String
  },
  computed: {
    passage () {
      return this.$store.state.passage.passages[this.id] || {}
    }
  },
  methods: {
    onVerify () {
      this.showAnswer = !this.showAnswer
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
  components: { Carousel, CarouselItem, Question, Button, Score }
}
</script>

<style lang="sass" scoped>
.score
  margin-bottom: 20px

.container
  text-align: left
  position: fixed
  width: 50%
  right: 30px
  top: 30px

.verify
  position: absolute
  right: 40px
  top: 10px

</style>
