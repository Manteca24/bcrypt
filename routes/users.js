const express = require('express');
const router = express.Router();
const { generateToken, verifyToken } = require('../middlewares/authMiddleware');
const users = require('../data/users');

router.get('/', (req, res) => {
  if (req.session.token) {
    return res.send(`
      <h2>Ya estás autenticado</h2>
      <a href="/dashboard">Ir al dashboard</a>
      <form action="/logout" method="POST"><button type="submit">Cerrar sesión</button></form>
    `);
  }

  res.send(`
    <form action="/login" method="POST">
      <label for="username">Usuario:</label>
      <input type="text" id="username" name="username" required><br>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required><br>
      <button type="submit">Iniciar sesión</button>
    </form>
  `);
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    const token = generateToken(user);
    req.session.token = token;
    res.redirect('/dashboard');
  } else {
    res.status(401).json({ message: 'Credenciales incorrectas' });
  }
});

router.get('/dashboard', verifyToken, (req, res) => {
  const user = users.find((u) => u.id === req.user);

  if (user) {
    res.send(`<h1>Bienvenido, ${user.name}</h1><p>ID: ${user.id}</p><a href="/">Inicio</a>`);
  } else {
    res.status(401).json({ message: 'Usuario no encontrado' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
