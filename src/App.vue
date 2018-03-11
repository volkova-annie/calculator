<template>
  <div class="content-wrapper">
    <header-menu></header-menu>
    <router-view></router-view>
    <footer-menu></footer-menu>
  </div>
</template>

<script>
import HeaderMenu from './components/HeaderMenu.vue'
import FooterMenu from './components/FooterMenu.vue'

export default {
  name: 'app',
  components: {
    HeaderMenu,
    FooterMenu
  },
  watch: {
    '$route' (to, from) {
      if (!to.hash) {
        return true
      }
      setTimeout(() => {
        let selector = document.querySelector(to.hash)
        if (selector) {
          selector.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        }
      }, 100)

      return true
    }
  }
}
</script>
