const bcrypt = require('bcryptjs');
const password = process.argv[2];

if (!password) {
  console.log('Usage: node scripts/hashPassword.js "YourStrongPassword"');
  process.exit(1);
}

bcrypt.hash(password, 10).then(hash => {
  console.log('\nYour password hash (copy this into .env as ADMIN_PASSWORD_HASH):\n');
  console.log(hash);
});