import Vue from 'vue'
import App from './App.vue'

/* eslint-disable no-new */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
// Receives the context of the render call, returning a Promise resolution to the root Vue instance.
export default context => {
  return Promise.resolve(
    new Vue({
      render: h => h(App)
    })
  )
}
