const express = require('express');
// const authMiddleware = require('../middlewares/auth.middlewares');
const loginRouter = require('./routes/login.route');
const userRouter = require('./routes/user.route');
const categoryRouter = require('./routes/category.route');
const postRouter = require('./routes/post.route');

const app = express();

app.use(express.json());
app.use(loginRouter);
app.use(userRouter);
app.use(categoryRouter);
app.use(postRouter);

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;
