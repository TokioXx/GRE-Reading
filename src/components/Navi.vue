<template>
    <Container class="container">
      <Aside class="aside">
        <div class="title">阅读白皮书</div>
        <div class="divider"></div>
        <Tree class="tree" :data="tree" :props="defaultProps" @node-click="onNodeClick"></Tree>
        <div class="divider"></div>
        <Empty>
        </Empty>
      </Aside>
      <Main>
        <Passage></Passage>
      </Main>
    </Container>
</template>

<script>
import { Tree, Container, Aside, Main, Header } from 'element-ui'
import Passage from '../components/Passage'
import Empty from '../components/Empty'
import titles from '../../assets/titles.json'

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
    tree: function () {
      return titles.map((unit, index) => {
        const children = unit.passages.map((title, i) => ({
          label: `Passage ${i + 1} ${title}`,
          unit: index,
          passages: i
        }))

        return {
          label: `Unit ${index + 1} ${unit.unit}`,
          unit: index,
          children
        }
      })
    }
  },
  methods: {
    onNodeClick (node) {
      if (!node.passage) return
      console.log(node.unit, node.passage)
    }
  },
  components: { Tree, Container, Aside, Main, Passage, Header, Empty }

}
</script>

<style lang="sass" scoped>

.container
  height: 100%

.aside
  width: 25% !important

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

.divider
  height: 1px;
  margin: 7px 0;
  overflow: hidden;
  background: rgba(0,0,0,.07);

</style>
