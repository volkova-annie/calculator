<template lang="html">
  <div class="wrapper">
    <main class="main">
      <div class="row">
        <input type="number" placeholder="Enter Amount to Convert" v-model="currencyAmount" min="0">
      </div>
      <div class="row">
        <select-custom
          ref="base"
          v-bind:exchangeAssets="exchangeRates"
          v-on:selected="saveIdBase">
        </select-custom>
        <button type="button" class="button-swap-currency" v-on:click="swapCurrency">
          ⇄
        </button>
        <select-custom
          ref="quote"
          v-bind:exchangeAssets="exchangeRates"
          v-on:selected="saveIdQuote">
        </select-custom>
      </div>
      <div v-if="error" class="row">
        <span class="error-text">{{error}}</span>
      </div>
      <div v-else-if="rate && currencyAmount" class="row">
        <div class="currency">
          <span class="currency-ammount">{{currencyAmount}}</span>
          <span class="currency-label"> {{assetBaseLabel}}</span>
        </div>
        <span class="currency-equal"> = </span>
        <div class="currency">
          <span class="currency-ammount"> {{rateMultiplication}}</span>
          <span class="currency-label"> {{assetQuoteLabel}}</span>
        </div>
      </div>
      <div class="chart-wrapper">
        <h3 class="chart-header">Currency Exchange Rate Chart</h3>
        <chart-custom
          class="chart"
          :options="{responsive: false, maintainAspectRatio: false}"
          :chart-data="ratesChartData"
          :width="800"
          :height="200">
        </chart-custom>
      </div>
    </main>
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
      assetBaseId: '',
      assetQuoteId: '',
      assetBaseLabel: '',
      assetQuoteLabel: '',
      exchangeRates: [],
      rate: '',
      currencyAmount: '1',
      error: '',
      ratesChartData: []
    }
  },
  computed: {
    rateMultiplication () {
      return (this.currencyAmount * this.rate).toFixed(10)
    }
  },
  methods: {
    onCurrencySelected: function () {
      const selectBase = this.$refs.base.$refs.currency
      const selectQuote = this.$refs.quote.$refs.currency

      this.assetBaseId = selectBase.value
      this.assetQuoteId = selectQuote.value

      this.assetBaseLabel = selectBase.label
      this.assetQuoteLabel = selectQuote.label
    },
    saveIdBase: function (event) {
      this.assetBaseId = event.value
      this.assetBaseLabel = event.label

      this.updateRates()
    },
    saveIdQuote: function (event) {
      this.assetQuoteId = event.value
      this.assetQuoteLabel = event.label

      this.updateRates()
    },
    updateRates: function () {
      if (this.assetQuoteId && this.assetBaseId && this.assetQuoteId !== this.assetBaseId) {
        this.fetchCurrentRate()
        this.fetchRateHistory()
      }

      this.checkErrors()
    },
    fetchCurrentRate: function () {
      exchange.getExchangeRate(this.assetQuoteId, this.assetBaseId)
        .then((response) => {
          this.rate = Object.values(response)[0]

          if (response.Response === 'Error') {
            this.checkErrors(response.Message)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    fetchRateHistory: function () {
      exchange.getWeekExchangeRate(this.assetQuoteId, this.assetBaseId)
        .then((response) => {
          const rateHistoryList = response.Data.map((el) => {
            return {
              date: el.time,
              rate: el.close
            }
          })

          this.ratesChartData = {
            labels: rateHistoryList.map((el) => {
              const date = new Date(el.date * 1000)
              const dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
              const mm = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
              const yy = date.getFullYear()
              const dateResult = dd + '.' + mm + '.' + yy

              return dateResult
            }),
            datasets: [
              {
                label: this.assetQuoteId + ' for ' + this.assetBaseId,
                backgroundColor: '#0088CC',
                fill: false,
                data: rateHistoryList.map((el) => el.rate)
              }
            ]
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    checkErrors: function (message = '') {
      this.error = message

      if (this.assetQuoteId === this.assetBaseId) {
        this.error = 'You chose the same currencies.'
      } else if (!this.assetBaseId) {
        this.error = 'Please, select the currency convert from.'
      } else if (!this.assetQuoteId) {
        this.error = 'Please, select the currency convert to.'
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

.wrapper {
  min-height: calc(100vh - 200px);
}

.main {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 60px 0;
}

.row {
  display: flex;
  align-items: baseline;
  margin: auto;
  max-width: 1140px;
  width: 830px;
  margin-bottom: 20px;

  &:nth-child(2) {
    position: relative;
  }
}

.error-text {
  color: red;
}

.button-swap-currency {
  background-color: #0088CC;
  color: white;
  width: 60px;
  height: 35px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
}

.chart {
  display: flex;
  justify-content: center;
  align-items: center;

  &-wrapper {
    // position: absolute;
    // top: 120px;
    // margin: 40px 0;
  }

  &-header {
    margin-top: 50px;
  }
}

.currency {
  width: 375px;
  font-size: 1.5rem;
  display: flex;
  align-items: baseline;

  &:first-child {
    display: flex;
    justify-content: flex-end;
  }

  &-equal {
    width: 60px;
    margin: 0 10px;
    text-align: center;
  }

  &-label {
    color: green;
    font-size: 1rem;
  }

  &-ammount {
    font-weight: bold;
    margin-right: 10px;
  }
}
</style>
