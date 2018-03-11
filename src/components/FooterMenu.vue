<template>
  <div class="footer-wrapper">
    <footer class="footer"> this is footer
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
      this.yearInFooter = (year > 2017 ? `2017-${year}` : '2017')
      return this.yearInFooter
    }
  }
}
</script>

<style lang="scss">

.footer-wrapper {
  background-color: black;
}

.footer {
  width: calc(100% - 40px);
  max-width: 1170px;
  padding: 30px 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: auto;
}

</style>
