
import * as types from '../types'
import Vue from 'vue'

export const state = {}

export const mutations = {
  [types.SCORE_SET] (state, { id, index, score }) {
    const newState = (state[id] || []).slice()
    newState[index] = score
    Vue.set(state, id, newState)
  }
}
