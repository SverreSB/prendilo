const Nexmo = require('nexmo');
const {getAPIKey, getAPISecret} = require('../../../config/nexmoAPI');
const nexmo = new Nexmo({
  apiKey: getAPIKey(),
  apiSecret: getAPISecret()
})


module.exports = function(phoneNumber) {
    const from = 'Prendilo';
    const to = '' + phoneNumber;
    var text = 'Your validation code: ';
    const code = generateValidation();
    
    text += code;
    nexmo.message.sendSms(from, to, text)
    
    return code;
}

function generateValidation() {
    return Math.floor((Math.random() * 999999) + 100000);
}