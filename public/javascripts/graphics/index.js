// definir mejor esta constante para uqe los parametros de la funcion sean variables(quizas una clase)



const avgTransactionsValueByPeriod = (params,graphId) => {
  var ctx = document.getElementById(graphId).getContext('2d');
  //Habria que modificar esta funcion si se modifican estos parametros
  //De momento está hecho para un sól,o lemento del array habria que hacer recorrelos o quizás poner las fechas más absolutas
  const graphData = params.map((data) => {
    return data.zipcodes[0].avg
   })
   const graphLabel = params.map((data) => {
     return data.date
   })
   drawAvgTransactionsValueByPeriod(graphLabel,graphData,ctx)
}

const avgTransactionsByAgeRange = (params,graphId) => {
  var ctx = document.getElementById(graphId).getContext('2d');
  const graphData = params.map((data)=>{
  })

}

const merchantsByCategories = (params,graphId) => {
  var ctx = document.getElementById(graphId).getContext('2d');
  const graphData = params.map((data)=>{
  })
}



// cambiar onload por window.addEventListener
window.addEventListener('load', function()  {
  const graphsTable = document.querySelector('.graphs-table')
  const graphsNodes = graphsTable.querySelectorAll('.graphs')
  
  graphsNodes.forEach(graphNode => {
    const graphId = graphNode.id
    const params = JSON.parse(graphNode.getAttribute('data-params'))
    switch (graphId) {
      case 'AvgTransactionsValueByPeriod':
        avgTransactionsValueByPeriod(params,graphId);
        break;
      case 'AvgTransactionsByAgeRange':
        avgTransactionsByAgeRange(params,graphId);
        break;
      case 'MerchantsByCategories':
        merchantsByCategories(params,graphId);
        break;
    }
  })
})
