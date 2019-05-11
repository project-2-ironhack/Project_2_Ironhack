// definir mejor esta constante para uqe los parametros de la funcion sean variables(quizas una clase)



const avgTransactionsValueByPeriod = (params,ctx) => {

  const graphData = params.map((data) => {
    return data.zipcodes[0].avg
   })
   const graphLabel = params.map((data) => {
     return data.date
   })
   drawAvgTransactionsValueByPeriod(graphLabel,graphData,ctx)
}

const avgTransactionsByAgeRange = (params,ctx) => {
  const graphLabel = params[0].zipcodes[0].ages.map(ageRange=> ageRange.id)
  graphLabel.shift()
  const graphData = {
    dataSetMale: [],
    dataSetFemale:[]
  }

  graphLabel.forEach((_,i) => {
    const maleDataValue = params.reduce((acc,date) =>{
      return acc + date.zipcodes[0].ages[i+1].genders[1].avg*date.zipcodes[0].ages[i+1].genders[1].txs
    },0)
    const maleDataTotal = params.reduce((acc,date) =>{
      return acc + date.zipcodes[0].ages[i+1].genders[1].txs
    },0)
    graphData.dataSetMale.push((maleDataValue/maleDataTotal).toFixed(2))
    
    const femaleDataValue = params.reduce((acc,date) =>{
      return acc + date.zipcodes[0].ages[i+1].genders[1].avg*date.zipcodes[0].ages[i+1].genders[0].txs
    },0)
    const femaleDataTotal = params.reduce((acc,date) =>{
      return acc + date.zipcodes[0].ages[i+1].genders[0].txs
    },0)
    graphData.dataSetFemale.push((-femaleDataValue/femaleDataTotal).toFixed(2))
  }) 
  drawAvgTransactionsByAgeRange(graphLabel,graphData,ctx)
}
  


const merchantsByCategories = (params,ctx) => {
  const graphLabel = params[0].zipcodes[0].categories.map(category=> category.id)
  graphLabel.pop()
  
  const totalMerchantsAllCategories = []
  graphLabel.forEach((_,i) => {
    const totalMerchantsCategory = params.reduce((acc,date) => {
      return typeof date.zipcodes[0].categories[i].merchants === 'number' ? acc + date.zipcodes[0].categories[i].merchants : acc+0
    },0)
    totalMerchantsAllCategories.push(totalMerchantsCategory)
  })

  const totalMerchants = totalMerchantsAllCategories.reduce((acc,merchants) => {
    return acc + merchants
  },0)

  //tocar esto para mostrar porcentajes

  const graphData = totalMerchantsAllCategories.map(merchants => {
    return ((merchants/totalMerchants)*100).toFixed(2)
  })
  console.log(graphData)

  drawMerchantsByCategories(graphLabel,graphData,ctx)
}

const estSalesByCategory = (params,ctx) => {
  const graphLabel = params[0].zipcodes[0].categories.map(category=> category.id)
  graphLabel.pop()  
  const graphData = []

  graphLabel.forEach((_,i) => {
    const totalTransValue = params.reduce((acc,date) =>{
      return acc + date.zipcodes[0].categories[i].avg*date.zipcodes[0].categories[i].txs
    },0)
    graphData.push((totalTransValue/(0.172)).toFixed(2))
  }) 
  drawEstSalesByCategory(graphLabel,graphData,ctx)
}

const avgTransactionsValueByCategory = (params,ctx) => {
  const graphLabel = params[0].zipcodes[0].categories.map(category=> category.id)
  graphLabel.pop()

  const graphData =[]

  graphLabel.forEach((_,i) => {
    const totalTransValue = params.reduce((acc,date) =>{
      return acc + date.zipcodes[0].categories[i].avg*date.zipcodes[0].categories[i].txs
    },0)
    const totalTrans = params.reduce((acc,date) =>{
      return acc + date.zipcodes[0].categories[i].txs
    },0)
    graphData.push((totalTransValue/totalTrans).toFixed(2))
  }) 
  drawAvgTransactionsValueByCategory(graphLabel,graphData,ctx)
}