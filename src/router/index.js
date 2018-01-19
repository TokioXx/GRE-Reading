import Vue from 'vue'
import Router from 'vue-router'
import Catalog from './Catalog'
import Test from './Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Catalog',
      component: Catalog
    },
    {
      path: '/tests/:id',
      name: 'Test',
      component: Test
    }
  ]
})
