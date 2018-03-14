import Vue from 'vue'
import App from './App.vue'
import 'normalize.css'
import './styles/application.scss'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'

import router from './router'

Vue.use(VueResource)
Vue.use(VueRouter)

// экспортируем функцию фабрику для создания экземпляров
// нового приложения, маршрутизатора и хранилища
/* eslint-disable no-new */
export function createApp () {
  const app = new Vue({
    router,
    // корневой экземпляр просто рендерит компонент App
    render: h => h(App)
  })
  return { app, router }
}
