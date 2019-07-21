/**
 *  Generating a 6 digit secret
 */
function generateSecret() {
    return Math.floor((Math.random() * 999999) + 100000);
}

exports.generateSecret = generateSecret;