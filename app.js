const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const path = require('path');

const usersRouter = require('./routes/api/users');
const categoriesRouter = require('./routes/api/categories');
const transactionsRouter = require('./routes/api/transactions');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', usersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/transactions', transactionsRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Not Found',
  });
});

app.use((error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error;
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  });
});

module.exports = app;
