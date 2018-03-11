<template lang="html">
  <div>
    <main class="main">
      <input type="number" placeholder="Enter Amount to Convert" v-model="currencyAmount"  min="0">
      <select-custom ref="base" v-bind:exchangeAssets="exchangeRates" v-on:selected="saveIdBase"></select-custom>
      <button type="button" class="button-swap-currency" v-on:click="swapCurrency">
        <=>
      </button>
      <select-custom
        ref="quote"
        v-bind:exchangeAssets="exchangeRates"
        v-on:selected="saveIdQuote">
      </select-custom>
      <span v-if="error">{{error}}</span>
      <div v-else-if="rate" class="row">
        <div id="conversion-result-left">{{currencyAmount}} {{assetIdBaseLabel}}</div>
        <div id="conversion-result-middle"> = </div>

        <span id="conversion-result-value">{{rateMultiplication}}</span>
        <span id="conversion-result-value-currency">{{assetIdQuoteLabel}}</span>
      </div>
    </main>
    <chart-custom ref="chart" :options="{responsive: false}" :width="400" :height="200"></chart-custom>
  </div>
</template>

<script>
import exchange from '../api/exchange'
import SelectCustom from './SelectCustom.vue'
import ChartCustom from './ChartCustom.vue'

export default {
  name: 'main-section',
  components: {
    SelectCustom,
    ChartCustom
  },
  data () {
    return {
      assetIdBase: '',
      assetIdQuote: '',
      assetIdBaseLabel: '',
      assetIdQuoteLabel: '',
      exchangeRates: [],
      rate: '',
      currencyAmount: '1',
      error: ''
    }
  },
  computed: {
    rateMultiplication () {
      return this.currencyAmount * this.rate
    }
  },
  methods: {
    onCurrencySelected: function () {
      const selectBase = this.$refs.base.$refs.currency
      const selectQuote = this.$refs.quote.$refs.currency

      this.assetIdBase = selectBase.value
      this.assetIdQuote = selectQuote.value

      this.assetIdBaseLabel = selectBase.label
      this.assetIdQuoteLabel = selectQuote.label
    },
    saveIdBase: function (event) {
      this.assetIdBase = event.value
      this.assetIdBaseLabel = event.label

      this.updateRates()
    },
    saveIdQuote: function (event) {
      this.assetIdQuote = event.value
      this.assetIdQuoteLabel = event.label

      this.updateRates()
    },
    updateRates: function () {
      if (this.assetIdQuote !== this.assetIdBase) {
        this.fetchCurrentRate()
        this.fetchRateHistory()
      }

      this.checkErrors()
    },
    fetchCurrentRate: function () {
      exchange.getExchangeRate(this.assetIdQuote, this.assetIdBase)
        .then((response) => {
          this.rate = Object.values(response)[0]
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchRateHistory: function () {
      exchange.getWeekExchangeRate(this.assetIdQuote, this.assetIdBase)
        .then((response) => {
          const rateHistoryList = response.Data.map((el) => {
            return {
              date: el.time,
              rate: el.close
            }
          })
          this.$refs.chart.updateChart(rateHistoryList)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    checkErrors: function () {
      this.error = ''

      if (this.assetIdQuote === this.assetIdBase) {
        this.error = 'Вы ввели одинаковые валюты'
      } else if (!this.assetIdBase) {
        this.error = 'Выберите валюту, из которой необходимо конвертировать'
      } else if (!this.assetIdQuote) {
        this.error = 'Выберите валюту, в которую необходимо конвертировать'
      }
    },
    swapCurrency: function () {
      const selectBase = this.$refs.base.$refs.currency
      const selectQuote = this.$refs.quote.$refs.currency
      const tempIndex = selectBase.selectedIndex

      selectBase.selectedIndex = selectQuote.selectedIndex
      selectQuote.selectedIndex = tempIndex
      selectBase.dispatchEvent(new Event('change'))
      selectQuote.dispatchEvent(new Event('change'))
    }
  },
  beforeCreate: function () {
    exchange.getAllAssets()
      .then((response) => {
        const exchangeRatesList = Object.entries(response.Data).map((el) => {
          return {
            label: el[1].FullName,
            value: el[0]
          }
        })
        this.exchangeRates = exchangeRatesList
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss">

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-height: 680px;
  padding: 13% 0;
}
</style>
