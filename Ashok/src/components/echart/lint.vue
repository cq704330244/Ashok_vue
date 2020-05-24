<template>
  <div :id="id" :class="className" />
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const xAxisData = []
      const data = []
      const data2 = []
      for (let i = 0; i < 50; i++) {
        xAxisData.push(i)
        data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5)
        data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3)
      }
      this.chart.setOption({
        backgroundColor: '#08263a',
        title: {
          top: 20,
          left: '3%',
          text: '柱状图',
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#f1f1f3'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function(params) {
            console.log(params)
            var allLabel = ''
            params.map(item => {
              allLabel =
                item.marker +
                item.seriesName +
                '：' +
                '<br/>' +
                'y轴：' +
                item.value +
                '<br/>' +
                'x轴：' +
                item.axisValue
            })
            return allLabel
          }
        },
        legend: {
          top: 20,
          data: ['销量'],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#f1f1f3'
          }
        },
        grid: {
          top: 100,
          left: '4%',
          right: '4%',
          bottom: '3%'
        },
        xAxis: {
          type: 'category',
          name: '物品',
          nameLocation: 'end',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617b'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          data: xAxisData
        },
        yAxis: {
          type: 'value',
          name: '数量',
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617b'
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#57617b']
            }
          }
        },
        visualMap: {
          show: true,
          min: 0,
          max: 50,
          dimension: 0,
          inRange: {
            color: [
              '#4a657a',
              '#308e92',
              '#b1cfa5',
              '#f5d69f',
              '#f5898b',
              '#ef5055'
            ]
          }
        },
        series: [
          {
            name: '销量',
            type: 'bar',
            z: 1,
            itemStyle: {
              normal: {
                opacity: 1,
                barBorderRadius: 5,
                shadowBlur: 3,
                shadowColor: '#111'
              }
            },
            data
          }
        ],
        animationEasing: 'elasticOut',
        animationEasingUpdate: 'elasticOut',
        animationDelay(idx) {
          return idx * 20
        },
        animationDelayUpdate(idx) {
          return idx * 20
        }
      })
    }
  }
}
</script>
