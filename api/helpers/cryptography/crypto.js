/******************************
 

    Helper file containing functions using crypto library
    Functions: encrypt, decrypt, generate24ByteKey
 

 ******************************/


const crypto = require('crypto');
const algorithm = 'aes-192-cbc';

//Function for encrypting a text using a key with string length of 24
function encrypt(text, key) {
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

//Function for decrypting a text using a key with string length of 24
function decrypt(text, key) {
    const iv = Buffer.from(text.iv, 'hex');
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

//Function that generates a hashed key with string length of 24 from secret using createHash
function generate24ByteKey(secret) {
    const key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 24)
    return key; 
}

exports.encrypt = encrypt;
exports.decrypt = decrypt;
exports.generate24ByteKey = generate24ByteKey;