// definir mejor esta constante para uqe los parametros de la funcion sean variables(quizas una clase)


const graphList = [
  {name:'creditCard',
  }]

const creditCard = (params) => {
  var ctx = document.getElementById('creditCard').getContext('2d');
  //Habria que modificar esta funcion si se modifican estos parametros
  //De momento está hecho para un sól,o lemento del array habria que hacer recorrelos o quizás poner las fechas más absolutas
  const graphData = params.map((data) => {
    return data.zipcodes[0].cards
   })
   const graphLabel = params.map((data) => {
     return data.date
   })
   console.log(graphData)
   drawCreditCard(graphLabel,graphData,ctx)
}

// cambiar onload por window.addEventListener
window.addEventListener('load', function()  {
  const graphsTable = document.querySelector('.graphs-table')
  const graphsNodes = graphsTable.querySelectorAll('.graphs')
  
  graphsNodes.forEach(graphNode => {
    const graphId = graphNode.id
    const params = JSON.parse(graphNode.getAttribute('data-params'))
    switch (graphId) {
      case 'creditCard':
        creditCard(params,graphId);
        break;
    }
  })
})
