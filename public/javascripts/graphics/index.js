
// cambiar onload por window.addEventListener
window.addEventListener('load', function()  {
  const graphsTable = document.querySelector('.graphs-table')
  const graphsNodes = graphsTable.querySelectorAll('.graphs')
  
  graphsNodes.forEach(graphNode => {
    const graphId = graphNode.id
    const params = JSON.parse(graphNode.getAttribute('data-params'))
    const ctx = document.getElementById(graphId).getContext('2d');
    switch (graphId) {
      case 'AvgTransactionsValueByPeriod':
        avgTransactionsValueByPeriod(params,ctx);
        break;
      case 'AvgTransactionsByAgeRange':
        avgTransactionsByAgeRange(params,ctx);
        break;
      case 'MerchantsByCategories':
        merchantsByCategories(params,ctx);
        break;
      case 'EstSalesByCategory':
        estSalesByCategory(params,ctx);
        break;
      case 'AvgTransactionsValueByCategory':
        avgTransactionsValueByCategory(params,ctx);
        break;
    }
  })
})
