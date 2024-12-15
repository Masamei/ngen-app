import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { ChartsProps, Entry } from '../interfaces'

export default function Charts({ categories, entries }: ChartsProps) 
{

  const barChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Number of Entries by Category',
      style:{
        color: 'text-green',
        fontSize: '15px',
      }
    },
    legend: {
        enabled: false
    },
    xAxis: {
      categories: categories,
      labels: {
        autoRotation: [-40, -90],
        style: {
            fontSize: '10px',
            fontFamily: 'Roboto, sans-serif'
        }
      }
    },
    yAxis: {
      title: {
        text: '',
      }
    },
    tooltip: {
      formatter: function (this: any): string {
        return `${this.key}: ${this.y}`
      },
      style: {
        display: 'flex',
        fontSize: '8px',
        fontFamily: 'Roboto, sans-serif'
      },
    },
    colors: [
      '#5eba47'
    ],
    series: [{
      name: 'Entries',
      data: categories.map(category => 
        entries.filter(entry => entry.Category === category).length
      )
    }]
  }
  
  function getColors() {
    if (Highcharts.getOptions() && Highcharts.getOptions().colors) {
      return Highcharts.getOptions().colors?.map((_c, i) =>
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        Highcharts.color(Highcharts.getOptions().colors![2])
            .brighten((i - 3) / 7)
            .get())
    }
  }

  const getNumberOfEntriesForCategory = (category: string, entries: Entry[]): number  => {
    return entries.filter(entry => entry.Category === category).length
  }

  const pieChartOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
      height: 250
    },
    title: {
        text: 'Category shares'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        style: {
          display: 'flex',
          fontSize: '8px',
          fontFamily: 'Roboto, sans-serif'
        },
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: getColors(),
            borderRadius: 5,
            dataLabels: {
                enabled: false,
                format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                distance: -50,
                style: {
                  display: 'flex',
                  fontSize: '5px',
                  fontFamily: 'Roboto, sans-serif'
                },
                filter: {
                    property: 'percentage',
                    operator: '>',
                    value: 4
                }
            }
        }
    },
    series: [
      {
        name: 'Entries',
        colorByPoint: true,
        data: categories.map((category) => ({
          name: category,
          y: getNumberOfEntriesForCategory(category, entries) / entries.length * 100,
        })),
      },
    ],
  }

  return (
    <div>
      <div className='container mx-auto mb-8'>
        <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
      </div>
      <div>
        <HighchartsReact highcharts={Highcharts} options={pieChartOptions} />
      </div>
    </div>
  )
}
