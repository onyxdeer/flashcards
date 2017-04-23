const twilio = require('twilio');
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = require('../../../config/config.js');

const client = new twilio.RestClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const post = (req, res) => {
  client.messages.create({
    to: `+${req.body.phoneNumber}`, // Text this number
    from: '+14154232172', // From valid Twilio number
    body: `You have been shared a bento! ${req.body.url}`,
  }, (err) => {
    if (err) {
      res.send(400, 'Unable to send SMS (Bad Request)');
    } else {
      res.send(200);
    }
  });
};

module.exports = { post };
