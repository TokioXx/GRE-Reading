import Vue from 'vue'
import Router from 'vue-router'
import Panel from '@/components/Panel'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Panel',
      component: Panel
    }
  ]
})
