<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  name: 'chart-custom',
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  mounted () {
    console.log(this.data)
    // const date = new Date()
    // const dd = date.getDate() > 10 ? date.getDate() : '0' + date.getDate()
    // const mm = (date.getMonth() + 1) > 10 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
    // const yy = date.getFullYear()
    // const dateResult = dd + '.' + mm + '.' + yy
    // console.log(dateResult)
    // this.renderChart({
    //   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    //   datasets: [
    //     {
    //       label: 'Cryptocurrency',
    //       backgroundColor: '#f87979',
    //       data: [40, 39, 10, 40, 39, 80, 40]
    //     }
    //   ]
    // }, {responsive: true, maintainAspectRatio: false})
    this.renderChart(this.chartData, this.options)
  },
  methods: {
    updateChart (data) {
      this.chartData = {
        labels: data.map((el) => {
          console.log(this.chartData)
          const date = new Date(el.date * 1000)
          const dd = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
          const mm = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
          const yy = date.getFullYear()
          const dateResult = dd + '.' + mm + '.' + yy

          return dateResult
        }
        ),
        datasets: [
          {
            label: 'Cryptocurrency',
            backgroundColor: '#f87979',
            data: data.map((el) => el.rate)
          }
        ]
      }
      //, {responsive: false, maintainAspectRatio: false, fill: false})
      // this.update()
    }
  }
}
</script>
