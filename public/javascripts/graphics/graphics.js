const drawAvgTransactionsValueByPeriod = (labels,data,ctx) => {
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






