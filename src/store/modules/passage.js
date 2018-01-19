import axios from 'axios'
import * as types from '../types'
import Vue from 'vue'

let state = { passages: {}, active: 'ilvyr001001' }

const getters = {}

const mutations = {
  [types.PASSAGE_SET] (state, passage) {
    Vue.set(state.passages, passage.id, passage)
  },
  [types.PASSAGE_ACTIVE] (state, id) {
    Vue.set(state, 'active', id)
  }
}

// const namespace = true
const actions = {
  [types.ACTION_PASSAGE_FETCH] ({ commit }, { id }) {
    const debug = process.env.NODE_ENV !== 'production'
    if (debug) {
      const data = require(`../../../assets/passages/${id}.json`)
      commit(types.PASSAGE_SET, data)
      return
    }
    axios(`/gre/assets/passages/${id}.json`)
      .then((data) => {
        commit(types.PASSAGE_SET, data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

export {
  getters,
  state,
  actions,
  mutations
}
