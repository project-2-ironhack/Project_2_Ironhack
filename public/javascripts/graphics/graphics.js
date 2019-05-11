function number_format(number, decimals, dec_point, thousands_sep) {
  // *     example: number_format(1234.56, 2, ',', ' ');
  // *     return: '1 234,56'
  number = (number + '').replace(',', '').replace(' ', '');
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = (typeof thousands_sep === 'undefined') ? '.' : thousands_sep,
    dec = (typeof dec_point === 'undefined') ? ',' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec);
      return '' + Math.round(n * k) / k;
    };
  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split(',');
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}
const monthLabel = [{name: 'Jan', data:'201501'},{name: 'Feb', data:'201502'},{name: 'Mar', data:'201503'},{name: 'Apr', data:'201504'},{name: 'May', data:'201505'},{name: 'Jun', data:'201506'},{name: 'Jul', data:'201507'},{name: 'Aug', data:'201508'},{name: 'Sep', data:'201509'},{name: 'Oct', data:'201510'},{name: 'Nov', data:'201511'},{name: 'Dec', data:'201512'}]

 const placesLabel = [
	{
		data: 'es_auto',
		name: 'Cars',
  },
  {
		data: 'es_bank',
		name: 'Bank',
	},
	{
		data: 'es_barsandrestaurants',
		name: 'Bar y Restaurants',
	},
	{
		data: 'es_contents',
		name: 'Contents',
	},
	{
		data: 'es_fashion',
		name: 'Fashion',
	},
	{
		data: 'es_food',
		name: 'Food',
	},
	{
		data: 'es_health',
		name: 'Health',
	},
	{
		data: 'es_home',
		name: 'Home',
	},
	{
		data: 'es_hotelservices',
		name: 'Hotels',
	},
	{
		data: 'es_hyper',
		name: 'Supermarket',
	},
	{
		data: 'es_leisure',
		name: 'Leisure',
	},
	{
		data: 'es_otherservices',
		name: 'Other services',
	},
	{
		data: 'es_sportsandtoys',
		name: 'Sport',
	},
	{
		data: 'es_tech',
		name: 'Tech',
	},
	{
		data: 'es_transportation',
		name: 'Transportation',
	},
	{
		data: 'es_travel',
				name: 'Travel',
	},
	{
		data: 'es_wellnessandbeauty',
		name: 'Wellness & Beauty',
	},
	{
		data: 'es_filtered',
		name: 'Filtros',
	},
]

const generateRandomBlue = (data) => {
  return data.map(_ => "rgb(0, 0, " + (Math.floor(Math.random() * 255)) + ","+Math.random()+")")
}

const transformData = (arr,keyConverter) => {
  return keyConverter.filter(key => arr.includes(key.data)).map(dateObject => dateObject.name) 
}

const drawAvgTransactionsValueByPeriod = (labels,data,ctx) => {
    var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: transformData(labels,monthLabel),
        datasets: [{
          label: "Avg. Trans. Value",
          backgroundColor: "#4e73df",
          hoverBackgroundColor: "#2e59d9",
          borderColor: "#4e73df",
          data: data,
        }],
      },
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Avg. Transactions Value By Period',
          padding: 20
        },
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        scales: {
          xAxes: [{
            time: {
              unit: 'month'
            },
            gridLines: {
              display: false,
              drawBorder: true
            },
            ticks: {
              maxTicksLimit: 6
            },
            maxBarThickness: 25,
          }],
          yAxes: [{
            display: false,
            ticks: {
              min: 0,
              max: Math.max(...data),
              maxTicksLimit: 5,
              padding: 10,
              // Include a dollar sign in the ticks
              callback: function(value, index, values) {
                return '€' + number_format(value);
              }
            },
            gridLines: {
              color: "rgb(234, 236, 244)",
              zeroLineColor: "rgb(234, 236, 244)",
              drawBorder: false,
              borderDash: [2],
              zeroLineBorderDash: [2]
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          titleMarginBottom: 10,
          titleFontColor: '#6e707e',
          titleFontSize: 14,
          backgroundColor: "rgb(255,255,255)",
          bodyFontColor: "#858796",
          borderColor: '#dddfeb',
          borderWidth: 1,
          xPadding: 15,
          yPadding: 15,
          displayColors: false,
          caretPadding: 10,
          callbacks: {
            label: function(tooltipItem, chart) {
              var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
              return datasetLabel + ': €' + number_format(tooltipItem.yLabel);
            }
          }
        },
      }
    });
}

const drawAvgTransactionsByAgeRange = (labels,data,ctx) =>{
  var horizontalBarChartData = new Chart(ctx,{
    type: 'horizontalBar',
    data:{
    labels:labels,
    datasets: [{
      label: 'Male',
      backgroundColor: "#4e73df",
      hoverBackgroundColor: "#2e59d9",
      borderColor: "#4e73df",
      data: data.dataSetMale
    }, {
      label: 'Female',
      backgroundColor: "#info",
      hoverBackgroundColor: "black",
      borderColor: "gray-dark",
      data: data.dataSetFemale
    }]},
    options: {
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        rectangle: {
          borderWidth: 2,
        }
      },
      responsive: true,
      title: {
        display: true,
        text: 'Avg Transactions by Age Range',
        padding: 20
      },
      scales: {
        yAxes: [{
          time: {
            unit: 'Age Range'
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            maxTicksLimit: 6
          },
          maxBarThickness: 25,
        }],
        xAxes: [{
          display: false,
          drawBorder: true,
          ticks: {
            maxTicksLimit: 5,
            padding: 10,
            // Include a dollar sign in the ticks
          },
          gridLines: {
            color: "rgb(234, 236, 244)",
            zeroLineColor: "rgb(234, 236, 244)",
            drawBorder: false,
            borderDash: [2],
            zeroLineBorderDash: [2]
          }
        }],
      },
      maintainAspectRatio: false,
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },
      legend: {
        display: false
      },
      tooltips: {
        titleMarginBottom: 10,
        titleFontColor: '#6e707e',
        titleFontSize: 14,
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
        caretPadding: 10,
        callbacks: {
          label: function(tooltipItem, chart) {
            var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
            return datasetLabel + ': €' + number_format(tooltipItem.xLabel);
          }
        }
      }
    }
  });
}

const drawMerchantsByCategories = (labels,data,ctx) => {


  var myPieChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: transformData(labels,placesLabel),
      datasets: [{
        data: data,
        backgroundColor: generateRandomBlue(data),
        hoverBackgroundColor:'lightgray',
        hoverBorderColor: "rgba(234, 236, 244, 1)",
      }],
    },
    options: {
      title: {
        display: true,
        text: 'Merchants by Category',
        padding: 20
      },
      maintainAspectRatio: false,
      tooltips: {
        backgroundColor: "rgb(255,255,255)",
        bodyFontColor: "#858796",
        borderColor: '#dddfeb',
        borderWidth: 1,
        xPadding: 15,
        yPadding: 15,
        displayColors: false,
      },
      legend: {
        display: false
      },
      cutoutPercentage: 60,

    },
  })
}

const drawEstSalesByCategory = (labels,data,ctx) => {
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
        datasets: [{
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 132)',
          data: data
      }]},
    options: {
      scales: {
          xAxes: [{
              barPercentage: 0.5,
              barThickness: 10,
              maxBarThickness: 10,
              minBarLength: 0,
          }],
          yAxes: [{
              ticks: {
                beginAtZero: true
              }
          }]
      },
      responsive: true,
      legend: {
        position: 'right',
        display: false
      },
      title: {
        display: true,
        text: 'Average Transactions by Age Range'
      }
  }
  });
}

const drawAvgTransactionsValueByCategory = (labels,data,ctx) => {
  var myRadar = new Chart(ctx,{
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        borderColor: 'lightcoral',
        backgroundColor: 'red',
        pointBackgroundColor: 'lightcoral',
        data: data
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Average Transaction Velue By Category'
      },
      elements: {
        line: {
          tension: 0.0,
        }
      },
      scale: {
        beginAtZero: true,
      }
    }
  })
}






