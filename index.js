require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database connected');
})
const app = express();
app.use(cors())
app.use(express.json());

const routes = require('./src/routes/api/api-routes');
const swaggerRoute=require('./src/routes/swagger')

app.use('/api', routes)
app.use('/', swaggerRoute)

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

module.exports = app;