var { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require('../../../config/config.js');
var twilio = require('twilio');
var client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const post = (req, res) => {
  client.messages.create({
      to: `+${req.body.phoneNumber}`,  // Text this number
      from: '+14154232172', // From a valid Twilio number
      body: `You have been shared a bento! ${req.body.url}`
  }, function(err, message) {
      if (err) {
        console.log('Error:', err);
        res.send(400, 'Unable to send SMS (Bad Request)')
      } else {
        console.log('Successfully sent message:', message);
        res.send(200);
      }
  });
}

module.exports = {post};
