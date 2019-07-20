const bcrypt = require('bcrypt');

async function saltAndHash(key) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(key, salt);
    return hash;
}

exports.saltAndHash = saltAndHash;