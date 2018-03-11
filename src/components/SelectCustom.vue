<template lang="html">
  <div>
    <select ref="currency" v-on:change="updateRates">
      <option selected disabled>Select currency</option>
      <option v-for="exchangeRate in exchangeAssets" v-bind:value="exchangeRate.value">
        {{exchangeRate.label}}
      </option>
    </select>
  </div>
</template>

<script>

export default {
  name: 'select-custom',
  props: ['exchangeAssets'],
  methods: {
    updateRates: function (event) {
      const value = event.target.value
      const label = event.target.options[event.target.selectedIndex].innerHTML.trim()
      const selectedOption = {
        value,
        label
      }
      this.$emit('selected', selectedOption)
    }
  }
}
</script>

<style lang="scss">

</style>
