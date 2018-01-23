<template>
      <Card class="card">
        <div slot='header' class='subject' :style="{'font-size': fontSize + 'px'}">
          <span class='subject-index'>{{index}}. </span>
          <span class='subject-content'>{{ subject }}</span>
        </div>
        <div :class="{ options: true, answer: showAnswer }" :style="{'font-size': fontSize - 2 + 'px'}">
          <div v-for="(o, j) in options" :key='j' class='option'  @click="onSelected(j)" :class="{ right: isRight(j), wrong: !isRight(j), active: j === selected }">
            <div class="index">{{ 'ABCDEFGHIJK'[j] }}</div>
            <div class="content">{{ o }}</div>
            <i class="el-icon-success"></i>
            <i class="el-icon-error"></i>
          </div>
        </div>
      </Card>
</template>

<script>
import { Card } from 'element-ui'
import { SCORE_SET } from '../store/types.js'
export default {
  data () {
    return {
      selected: null
    }
  },
  props: {
    index: Number,
    subject: String,
    options: Array,
    answer: String,
    showAnswer: false,
    id: String
  },
  computed: {
    fontSize: function () {
      return this.$store.state.config.passage.fontSize
    }
  },
  mounted () {
    this.$store.commit(SCORE_SET, { id: this.id, index: this.index - 1, score: undefined })
  },
  methods: {
    isRight (index) {
      return 'ABCDEFGHIJK'[index] === this.answer
    },
    onSelected (index) {
      this.selected = index
      this.$store.commit(SCORE_SET, { id: this.id, index: this.index - 1, score: this.isRight(index) })
    }
  },
  components: {Card}
}
</script>

<style lang="sass" scoped>
.subject
  font-weight: bold

.card
  min-height: 400px

.answer
  .right
    .content
      background-color: #67C23A

  .right.active
    .el-icon-success
      display: block

  .wrong.active
    .content
      background-color: #F56C6C

    .el-icon-error
      display: block

.option
  font-size: 16px
  margin-bottom: 18px
  position: relative
  display: flex
  align-items: center

  .index
    border-radius: 14px
    width: 28px
    height: 28px
    border: solid 1px #409EFF
    color: #409EFF
    display: inline-flex
    justify-content: center
    align-items: center
    margin-right: 10px

  .content
    width: 100%
    padding: 10px 0
    line-height: 2em

  &:hover .index, &.active .index
    color: #FFF
    background-color: #409EFF

  i
    position: absolute
    right: 10px
    top: 17px
    display: none
    color: white

</style>
