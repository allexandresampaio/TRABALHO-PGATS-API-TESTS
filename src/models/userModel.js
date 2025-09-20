const bcrypt = require('bcryptjs');

// In-memory user database
const users = [
    {
        username: 'alle',
        password: bcrypt.hashSync('123456', 8)
    },
    {
        username: 'desa',
        password: bcrypt.hashSync('123456')
    }
];
// Cada usuário terá uma propriedade 'curso' para guardar o curso inscrito
module.exports = { users };