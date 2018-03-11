import VueRouter from 'vue-router'
import Index from '../components/Index.vue'

export default new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      name: 'index',
      path: '/',
      component: Index
    },
    {
      path: '*',
      redirect: { name: 'index' }
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.matched.some(m => m.meta.scrollToTop)) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  }
})
