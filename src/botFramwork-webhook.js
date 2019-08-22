const { FACEBOOK_ACCESS_TOKEN } = process.env;
const request = require('request');

module.exports = (req, res) => {
  console.log("Button Web-Hook");
  
  let body = req.body;
 
  if (body.object === 'page') {

      body.entry.forEach(function(entry) {
          let webhook_event = entry.messaging[0];
          console.log(webhook_event);
          let sender_psid = webhook_event.sender.id;
          console.log('Sender PSID: ' + sender_psid);
        if (webhook_event.message) {
              console.log("message >>>>" + webhook_event.message)
          } else if (webhook_event.postback) {
              console.log("postback >>>> " + webhook_event.postback)
              handlePostback(webhook_event.sender.id , webhook_event.postback)
            }
      });
       res.status(200).send('EVENT_RECEIVED');
  } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
  }


};



  function handlePostback  (sender_psid, received_postback)
   {
    let response;
    // Get the payload for the postback
    let payload = received_postback.payload;
  
    if(payload === 'getStarted'){
        response = askTemplate('Are you a Cat or Dog Person?');
        callSendAPI(sender_psid, response);
    }
  }
  




const askTemplate = (text) => {
  return {
      "attachment":{
          "type":"template",
          "payload":{
              "template_type":"button",
              "text": text,
              "buttons":[
                  {
                      "type":"postback",
                      "title":"Cats",
                      "payload":"CAT_PICS"
                  },
                  {
                      "type":"postback",
                      "title":"Dogs",
                      "payload":"DOG_PICS"
                  }
              ]
          }
      }
  }
}


// Sends response messages via the Send API
const callSendAPI = (sender_psid, response, cb = null) => {
  // Construct the message body
  let request_body = {
      "recipient": {
          "id": sender_psid
      },
      "message": response
  };

  // Send the HTTP request to the Messenger Platform
  request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token":FACEBOOK_ACCESS_TOKEN},
      "method": "POST",
      "json": request_body
  }, (err, res, body) => {
      if (!err) {
          if(cb){
              cb();
          }
      } else {
          console.error("Unable to send message:" + err);
      }
  });
}

