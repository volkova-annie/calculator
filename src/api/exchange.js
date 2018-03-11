import Vue from 'vue'
import config from './config.js'

export default {
  getExchangeRate (assetIdBase, assetIdQuote) {
    const url = `${config.minApiUrl}/price?fsym=${assetIdBase}&tsyms=${assetIdQuote}`

    return Vue.http.get(url).then(response => response.json())
  },

  getAllAssets () {
    const url = `${config.url}/coinlist`

    return Vue.http.get(url).then(response => response.json())
  },

  getWeekExchangeRate (assetIdBase, assetIdQuote) {
    const url = `${config.minApiUrl}/histoday?fsym=${assetIdBase}&tsym=${assetIdQuote}&limit=7&e=CCCAGG`

    return Vue.http.get(url).then(response => response.json())
  }
}
