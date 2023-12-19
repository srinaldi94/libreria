const express = require('express');
const bodyParser = require('body-parser'); //body parser para recibir json a traves de los request
const swaggerUi = require('swagger-ui-express');

const routes = require('./bin/routes/book');
const swaggerDocument = require('./swagger.json');

const app = express();

app.use(bodyParser.json());
app.use('/api/v1',routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;