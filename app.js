const express = require('express');
const session = require('express-session');
const usersRouter = require('./routes/users');
const { secret } = require('./crypto/config');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: secret,  
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }  // Recordatorio: cambiar a true cuando trabajemos en HTTPS
}));

app.use('/', usersRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
