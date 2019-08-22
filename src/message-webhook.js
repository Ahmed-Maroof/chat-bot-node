const processMessage = require('./process-message');

module.exports = (req, res) => {
  if (req.body.object === 'page') {
    req.body.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message && event.message.text) {
        handleMessage(event.sender.id , event.message.text);
          // processMessage(event);
        }
      });
    });

    res.status(200).end();
  }
};

//- addition 

function handleMessage(sender_psid, received_message) {

  let response;
    response = {  "text": `You sent the message: "${received_message}". welcome!`}
  callSendAPI(sender_psid, response);    
}


const { FACEBOOK_ACCESS_TOKEN } = process.env;
const request = require('request')

function callSendAPI(sender_psid, response) {
  // Construct the message body
  let request_body = {
    "recipient": {
      "id": sender_psid
    },
    "message": response
  }

  // Send the HTTP request to the Messenger Platform
  request({
    "uri": "https://graph.facebook.com/v2.6/me/messages",
    "qs": { "access_token": FACEBOOK_ACCESS_TOKEN },
    "method": "POST",
    "json": request_body
  }, (err, res, body) => {
    if (!err) {
      console.log('message sent!')
    } else {
      console.error("Unable to send message:" + err);
    }
  }); 
}