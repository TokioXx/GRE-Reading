import * as types from '../types'
import Vue from 'vue'

export const state = {
  catalog: {
    showTitle: false
  },
  passage: {
    fontSize: 20
  }
}

export const mutations = {
  [types.CONFIG_TITLE_VISIBLE] (state, visible) {
    Vue.set(state.catalog, 'showTitle', !!visible)
  },
  [types.CONFIG_FONTSIZE] (state, size) {
    Vue.set(state.passage, 'fontSize', size)
  }
}
