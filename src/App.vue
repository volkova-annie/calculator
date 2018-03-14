<template>
  <div class="content-wrapper" id="app">
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
  }
}
</script>
