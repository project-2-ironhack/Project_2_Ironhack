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


const transformData = (arr,keyConverter) => {
  return keyConverter.filter(key => arr.includes(key.data)).map(dateObject => dateObject.name) 
}





const drawAvgTransactionsValueByPeriod = (labels,data,ctx) => {
  console.log(transformMonth(labels))
    var myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: transformMonth(labels),
        datasets: [{
          label: "Avg. Trans. Value",
          backgroundColor: "#4e73df",
          hoverBackgroundColor: "#2e59d9",
          borderColor: "#4e73df",
          data: data,
        }],
      },
      options: {
        title: {
          display: true,
          text: 'Avg. Transactions Value By Period'
        },
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 10,
            right: 25,
            top: 25,
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
              drawBorder: false
            },
            ticks: {
              maxTicksLimit: 6
            },
            maxBarThickness: 25,
          }],
          yAxes: [{
            ticks: {
              min: 0,
              max: 50,
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
      backgroundColor: 'red',
      borderColor: 'red',
      borderWidth: 1,
      data: data.dataSetMale
    }, {
      label: 'Female',
      backgroundColor: 'blue',
      borderColor: 'blue',
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
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Average Transactions by Age Range'
      }
    }
  });
}

const drawMerchantsByCategories = (labels,data,ctx) => {
  var myDoughnut = new Chart(ctx,{
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        // cambiar esto por un random de colores
        backgroundColor: ['red','blue','yellow','lightblue','pink','grey','darkGrey','darkcyan','green','limegreen','orange','orangered','lightcoral','lightpink','lightsalmon'],
      }],
    },
    options: {
      responsive: true,
      legend: {
        position: 'top',
        display: false
      },
      title: {
        display: true,
        text: 'Merchants By Categories'
      },
      animation: {
        animateScale: true,
        animateRotate: true
      },
      scaleLabels: {
        labelString:'Percentage'
      }
    }
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






