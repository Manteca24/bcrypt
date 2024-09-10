const jwt = require('jsonwebtoken');
const { secret } = require('../crypto/config');

// Generar un token JWT
const generateToken = (user) => {
  return jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
};

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  const token = req.session.token;

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido', error: err.message });
    }
    req.user = decoded.userId;
    next();
  });
};

module.exports = { generateToken, verifyToken };
