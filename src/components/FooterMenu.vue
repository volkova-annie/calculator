<template>
  <div class="footer-wrapper">
    <footer class="footer">
    <p class="footer-text">© {{yearOfProject}} Cryptocurrency Converter Calculator</p>
    <p class="footer-text">Made by
      <a class="footer-link" href="github.com/volkova-annie" target="_blank">Annie Volkova</a>
    </p>
    </footer>
  </div>
</template>

<script>

export default {
  name: 'footer-menu',
  methods: {

  },
  computed: {
    yearOfProject () {
      const year = new Date().getFullYear()
      this.yearInFooter = (year > 2018 ? `2018-${year}` : '2018')
      return this.yearInFooter
    }
  }
}
</script>

<style lang="scss">

.footer {
  color: white;
  max-width: 1140px;
  width: calc(100% - 40px);
  display: flex;
  align-items: center;
  justify-content: space-around;

  &-wrapper{
    width: 100vw;
    display: flex;
    justify-content: center;
    background-color: black;
    position: static;
    bottom: 0;
    left: 0;
  }

  &-link {
    color: white;
    text-decoration: none;
  }
}

</style>
