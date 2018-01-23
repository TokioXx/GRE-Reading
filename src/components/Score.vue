<template>
  <div>
    <Card>
      <div slot="header">
        <span>得分</span>
      </div>
    <div class="scores">
      <div v-for="(s, i) in scores" :key="i" class="score" v-if="visible">
        <i class="el-icon-error" v-if="s === false"></i>
        <i class="el-icon-success" v-if="s === true"></i>
        <i class="el-icon-warning" v-if="s === undefined"></i>
      </div>
    </div>
    </Card>
  </div>
</template>

<script>
import { Card, Button } from 'element-ui'
export default {
  props: {
    id: String,
    visible: Boolean
  },
  computed: {
    scores () {
      return this.$store.state.score[this.id] || []
    }
  },
  components: { Card, Button }
}
</script>

<style lang="sass" scoped>

.scores
  display: flex
  height: 30px

.score
  margin-right: 6px

  .el-icon-success
    color: #67C23A
  .el-icon-error
    color: #F56C6C
  .el-icon-warning
    color: #E6A23C

  i
    font-size: 24px
    display: inline-block

</style>
