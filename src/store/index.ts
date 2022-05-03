import { defineStore } from 'pinia'

export default defineStore('main', {
  state: () => {
    return {
      global: 'Hello @',
      count: 0
    }
  },
  getters: {

  },
  actions: {
    changeCount() {
      this.count ++
      this.global = `Change in actions ${this.count}`
    }
  }
})