const crypto = require('crypto');
const algorithm = 'aes-192-cbc';

function encrypt(text, key) {
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

function decrypt(text, key) {
    const iv = Buffer.from(text.iv, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;