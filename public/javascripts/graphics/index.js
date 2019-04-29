// definir mejor esta constante para uqe los parametros de la funcion sean variables(quizas una clase)
const graphList = [
  {name:'creditCard',
  }]

const creditCard = (params) => {
  //Habria que modificar esta funcion si se modifican estos parametros
  //De momento está hecho para un sólo lemento del array habria que hacer recorrelos o quizás poner las fechas más absolutas
  const bbvaParams = (({min_date,max_date}) => ({min_date,max_date}))(params)
  axios.post('/dashboard/getData',{params :bbvaParams})
    .then(response => {
      console.log(response.data)
      

    })
    .catch(console.log)
  
}

  

window.onload = function () {

  const paramsTxt = document.getElementById('params').getAttribute('data-params')
  const paramsObj = JSON.parse(paramsTxt)
  const graphsTable = document.querySelector('.graphs-table')
  let graphInfo ='';

  //recorro el array para ver cuantas graficas vienen
  paramsObj.graphs.forEach(graph => {
  //buscamos que graficas hay que pintar, quizás deberiamos adaptar esto, porque tenemos que definir bien la estructura de set.
  // modificar esto tambien
    const graphType = graphList.filter(graphType => graphType.name === graph.data.x)
    graphInfo = document.createElement('div');
    graphInfo.id = graphType[0].name;
  });

  // graphsTable.innerHTML = graphInfo

  const graphsNodes = graphsTable.childNodes
  
  graphsNodes.forEach(graphNode => {
    const graphId = graphNode.getAttribute('id')
    switch (graphId) {
      case 'creditCard':
        creditCard(paramsObj.graphs[0].data.y);
        break;
    }


     
  })

}

