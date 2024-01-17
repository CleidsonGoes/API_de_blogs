const express = require('express');
// const { User } = require('./models');
// const { Router } = require('express');
// const authMiddleware = require('../middlewares/auth.middlewares');
const getUserController = require('./controllers/login.controller');

// const loginRouter = Router();

// ...

const app = express();
app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', getUserController);

// module.exports = loginRouter;

// requisito 04
// app.post('/user', async (req, res) => {
//   const { displayName, email, password, image } = req.body;
//   const created = await User.create({
//     displayName,
//     email,
//     password,
//     image,
//   });
//   return res.status(201).json(created);
// });
  
// requisito 05
// app.get('/user', async (_req, res) => {
//   // const user = await User.findAll();
//   return res.status(200).json(user);
// });
    
// requisito 06
// app.get('/user/:id', (req, res) => res.status(200).json({ df: 'informar a saída aqui' }));
    
// requisito 16
// app.delete('/post/:id', async (req, res) => {
//   const { id } = req.params();

//   await User.destroy({ where: { id } });

//   // deletado com sucesso
//   return res.status(204).json();
// });

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
