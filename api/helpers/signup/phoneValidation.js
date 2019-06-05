const Nexmo = require('nexmo');
const {getAPIKey, getAPISecret} = require('../../../config/nexmoAPI');
const nexmo = new Nexmo({
  apiKey: getAPIKey(),
  apiSecret: getAPISecret()
})

/**
 *  Function for generating and sending out a validtion code to phone number
        Takes in phoneNumber as parameter
        Turning phone number to string, generating code to concatinate with text
        Sending out sms to given phonenumber from prendilo with text
        Returning code so it can be stored in the database for validation
 */
module.exports = function(phoneNumber) {
    const from = 'Prendilo';
    const to = '' + phoneNumber;
    var text = 'Your validation code: ';
    const code = generateValidation();
    text += code;

    nexmo.message.sendSms(from, to, text)
    
    return code;
}

//Function for generating a random 6 figure code
function generateValidation() {
    return Math.floor((Math.random() * 999999) + 100000);
}