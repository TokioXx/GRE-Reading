
import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import * as passage from './modules/passage'
import * as config from './modules/config'
import * as score from './modules/score'
import { STORAGE_KEY } from './types'
import localforage from 'localforage'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const recorder = store => {
  store.subscribe((mutation, store) => {
    localforage
      .setItem(STORAGE_KEY, store)
      .catch(err => console.error('[Storage Error]: ', err))
  })
}

export default new Vuex.Store({
  modules: {
    passage,
    config,
    score
  },
  strict: debug,
  plugins: debug ? [createLogger(), recorder] : [recorder]
})
