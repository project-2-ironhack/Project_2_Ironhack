const mongoose = require('mongoose');
const dbName = 'project2'
const MONGODB_URI = process.env.MONGODB_URI || `mongodb://localhost:27017/${dbName}`

mongoose.connect(MONGODB_URI, { useCreateIndex: true, useNewUrlParser: true })
  .then(() => console.info(`Successfully connected to the database ${MONGODB_URI}`))
  .catch(error => console.error(`An error ocurred trying to connect to de database ${MONGODB_URI}`, error))
