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

input, select {
  font-family: sans-serif;
  border-radius: 4px;
  border: solid 2px grey;
  box-sizing: border-box;
  outline-color: none;
  height: 35px;
  width: 375px;
  padding: 0 15px;

  &:focus {
    border: solid 2px #0088CC;
    outline: none;
  }

  &::placeholder {
    color: grey;
  }

  &::-ms-clear {
    display: none;
  }
}
</style>
