const express = require('express');
// const { User } = require('./models/User');

// ...

const app = express();
app.use(express.json());

// não remova ou mova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

// requisito 03
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   if (email && password) {
//     return res.status(200).json({
//       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
//     });
//   }
// });

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
// app.

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
