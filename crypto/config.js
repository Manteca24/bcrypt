const crypto = require('crypto');
const bcrypt = require('bcrypt');

//---------README
// Generar un secreto seguro
const secret = crypto.randomBytes(64).toString('hex');
// Encriptamos el secreto con bcrypt
const hashedSecret = bcrypt.hashSync(secret, 10);
//----------//


module.exports = {
  secret: hashedSecret
};
