const express = require('express');
// const { User } = require('./models');
// const { Router } = require('express');
// const authMiddleware = require('../middlewares/auth.middlewares');
const loginRouter = require('./routes/login.route');
const userRouter = require('./routes/user.route');
const categoryRouter = require('./routes/category.route');

// ...

const app = express();
app.use(express.json());
app.use(loginRouter);
app.use(userRouter);
app.use(categoryRouter);

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;
