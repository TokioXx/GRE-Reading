<template>
    <Container class="container">
      <Aside class="aside">
        <div class="title">
          阅读白皮书
          <i class='el-icon-view' @click='onEyeClick'></i>
        </div>
        <div class="divider"></div>
        <Tree class="tree" ref="tree" :data="tree" node-key="id" :props="defaultProps" @node-click="onNodeClick"></Tree>
        <div class="divider"></div>
        <Empty>
        </Empty>
      </Aside>
      <Main>
        <Config></Config>
        <Passage :id='active'></Passage>
        <Button @click="onTestClick" type="success" class="test">Let's Do It</Button>
      </Main>
    </Container>
</template>

<script>
import { Tree, Container, Aside, Main, Header, Button } from 'element-ui'
import Passage from '../components/Passage'
import Empty from '../components/Empty'
import catalog from '../../assets/catalog.json'
import Config from '../components/Config'
import { PASSAGE_ACTIVE, CONFIG_TITLE_VISIBLE } from '../store/types.js'

export default {
  data () {
    return {
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  computed: {
    showTitle: function () {
      return this.$store.state.config.catalog.showTitle
    },
    tree: function () {
      const st = this.showTitle
      return catalog.map((unit, index) => {
        const children = unit.passages.map(({ title, id }, i) => ({
          label: `Passage ${i + 1}` + (st ? title : ''),
          id
        }))

        return {
          label: `Unit ${index + 1} ${unit.unit}`,
          children
        }
      })
    },
    active: function () {
      return this.$store.state.passage.active
    }
  },
  methods: {
    onNodeClick (node) {
      if (!node.id) return // passage
      this.$store.commit(PASSAGE_ACTIVE, node.id)
    },
    onEyeClick () {
      this.$store.commit(CONFIG_TITLE_VISIBLE, !this.showTitle)
      if (this.active) this.$refs.tree.setCurrentKey(this.active)
    },
    onTestClick () {
      this.$router.push({ path: `/tests/${this.active}` })
    }
  },
  components: { Config, Tree, Container, Aside, Main, Passage, Button, Header, Empty }

}
</script>

<style lang="sass" scoped>

.aside
  width: 25% !important
  border-right: solid 1px #DCDFE6

.aside, .tree
  background-color: rgb(250, 250, 250)

.title
  display: block;
  text-align: left
  padding: 10px 15px;
  margin-top: 6px
  border-bottom: none;
  color: #364149;
  background: 0 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  position: relative;

  .el-icon-view
    position: absolute
    right: 16px

.divider
  height: 1px;
  margin: 7px 0;
  overflow: hidden;
  background: rgba(0,0,0,.07);

.test
  position: absolute
  bottom: 60px
  right: 60px

</style>
