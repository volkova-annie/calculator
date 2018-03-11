<template>
  <div class="header-wrapper">
    <header class="header">
      <h1 class="header-text">Cryptocurrency Converter Calculator</h1>
    </header>
  </div>
</template>

<script>

export default {
  name: 'header-menu'
}
</script>

<style lang="scss" scoped>

.header{
  color: white;
  max-width: 1140px;
  width: calc(100% - 40px);
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;

  &-text {
    text-transform: uppercase;
    font-size: 38px;
  }

  &-wrapper{
    width: 100vw;
    display: flex;
    justify-content: center;
    background-color: black;
  }
}

</style>
