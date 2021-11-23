const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const usersRouter = require('./routes/api/users');
const categoriesRouter = require('./routes/api/categories');
const transactionsRouter = require('./routes/api/transactions');
const { NOT_FOUND, SERVER_ERROR } = require('./helpers/index');

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
  res.status(NOT_FOUND).json({
    status: 'error',
    code: NOT_FOUND,
    message: 'Not Found',
  });
});

app.use((error, req, res, next) => {
  const { status = SERVER_ERROR, message = 'Server error' } = error;
  res.status(status).json({
    status: 'error',
    code: status,
    message,
  });
});

module.exports = app;
