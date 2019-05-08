const drawAvgTransactionsValueByPeriod = (labels,data,ctx) => {
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: {labels: labels,
        datasets: [{
          label: 'Avg Transactions Value By Period',
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
      }
  }
  });
}

