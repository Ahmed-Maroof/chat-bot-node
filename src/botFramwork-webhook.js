const { FACEBOOK_ACCESS_TOKEN } = process.env;
const request = require('request');

module.exports = (req, res) => {
  
  let body = req.body;
 
  if (body.object === 'page') {

      body.entry.forEach(function(entry) {
          let webhook_event = entry.messaging[0];
          let sender_psid = webhook_event.sender.id;
        if (webhook_event.message) {
          } else if (webhook_event.postback) {
              handlePostback(webhook_event.sender.id , webhook_event.postback)
            }
      });
       res.status(200).send('EVENT_RECEIVED');
  } else {
      // Returns a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
  }


};



  function handlePostback (sender_psid, received_postback)
   {
    let response;
    // Get the payload for the postback
    let payload = received_postback.payload;
    console.log(payload);
    if(payload === 'getStarted'){
        response = getStatredTemplate('اهلا بك في أمان');
        callSendAPI(sender_psid, response);
    }

    //three  main menus {inquery - help - complain} 
    
    if(payload === 'inquery'){
      response = inqueryTemplate( ' استفسارك بخصوص');
      callSendAPI(sender_psid, response);
    }
    if(payload === 'help'){
      response = helpTemplete('كيف يمكن ان نساعدك ');
      callSendAPI(sender_psid, response);
    }
    if(payload === 'complain'){
      response = complainTemplate('شكوتك بخصوص');
      callSendAPI(sender_psid, response);
    }

    // ----------------------------------------------------------
    // inquery submenues 
    if(payload === 'inquery_aman_services'){
      response = inqueryAmanServicesTemplate(' خدمات امان ');
      callSendAPI(sender_psid, response);
    }
    if(payload === 'inquery_branches'){
      response = inqueryBranchesTemplete(' فروع امان ');
      callSendAPI(sender_psid, response);
    }
    if(payload === 'inquery_machine'){
      response = inqueryMachineTemplete(' عن الجهاز ');
      callSendAPI(sender_psid, response);
    }

    //----------------------------------------------------------
    // help submenues 

    if(payload === 'help_machine_status'){
      response = helpMachineStatusTemplete('حاله الجهاز ');
      callSendAPI(sender_psid, response);
    }

    if(payload === 'help_machine_operations'){
      response = helpMachineOperationTemplete('عمليات الجهاز');
      callSendAPI(sender_psid, response);
    }
  }

const getStatredTemplate = (text) => {
  return {
      "attachment":{
          "type":"template",
          "payload":{
              "template_type":"button",
              "text": text,
              "buttons":[
                  {
                      "type":"postback",
                      "title":" استفسار ",
                      "payload":"inquery"
                  },
                  {
                      "type":"postback",
                      "title":"مساعدة",
                      "payload":"help"
                  },
                  {
                    "type":"postback",
                    "title":"تقديم شكوي ",
                    "payload":"complain"
                  }
              ]
          }
      }
  }
}

// inquery layer ONE   

const inqueryTemplate = (text) => {
  return {
      "attachment":{
          "type":"template",
          "payload":{
              "template_type":"button",
              "text": text,
              "buttons":[
                {
                    "type":"postback",
                    "title":" خدمات امان ",
                    "payload":"inquery_aman_services"
                },
                {
                    "type":"postback",
                    "title":"اماكن الفروع",
                    "payload":"inquery_branches"
                },
                {
                  "type":"postback",
                  "title":"عن الجهاز ",
                  "payload":"inquery_machine"
                }
            ]
          }
      }
  }
}

const helpTemplate = (text) => {
  return {
      "attachment":{
          "type":"template",
          "payload":{
              "template_type":"button",
              "text": text,
              "buttons":[
                {
                    "type":"postback",
                    "title":" حاله الجهاز ",
                    "payload":"help_machine_status"
                },
                {
                    "type":"postback",
                    "title":"عمليات الجهاز",
                    "payload":"help_machine_operations"
                }
            ]
          }
      }
  }
}

const complainTemplate = (text) => {
  return {
      "attachment":{
          "type":"template",
          "payload":{
              "template_type":"button",
              "text": text,
              "buttons":[
                {
                    "type":"postback",
                    "title":"شكوي عن خدمه",
                    "payload":"complain_service"
                },
                {
                    "type":"postback",
                    "title":"شكوي عن عمليه",
                    "payload":"complain_transaction"
                }
            ]
          }
      }
  }
}

//inquery layer TWO 
// ------------------------------------------------------
const inqueryAmanServicesTemplate = (text) => {
  return {
      "attachment":{
          "type":"template",
          "payload":{
              "template_type":"button",
              "text": text,
              "buttons":[
                {
                    "type":"postback",
                    "title":"تبرعات",
                    "payload":"inquery_aman_services_donation"
                },
                {
                    "type":"postback",
                    "title":"شحن رصيد",
                    "payload":"inquery_aman_services_recharge"
                },
                {
                  "type":"postback",
                  "title":"فواتير ",
                  "payload":"inquery_aman_services_bills"
                }
            ]
          }
      }
  }
}

const inqueryBranchesTemplete = (text) => {
  return {
      "attachment":{
          "type":"template",
          "payload":{
              "template_type":"button",
              "text": text,
              "buttons":[
                {
                    "type":"postback",
                    "title":"القاهره",
                    "payload":"inquery_branch-cairo"
                },
                {
                    "type":"postback",
                    "title":" الاسكندريه",
                    "payload":"inquery_branch-alex"
                },
                {
                  "type":"postback",
                  "title":"اخري",
                  "payload":"inquery_branch-others"
                }
            ]
          }
      }
  }
}


const inqueryMachineTemplete = (text) => {
  return {
      "attachment":{
          "type":"template",
          "payload":{
              "template_type":"button",
              "text": text,
              "buttons":[
                {
                    "type":"postback",
                    "title":"سعر الجهاز",
                    "payload":"inquery_machine_price"
                },
                {
                    "type":"postback",
                    "title":" طريقه التعاقد للحصول علي جهاز",
                    "payload":"inquery_machine_buy"
                }
            ]
          }
      }
  }
}

// ----------------------------------------------------------------------

// help layer ONE 

const helpTemplete = (text) => {
  return {
      "attachment":{
          "type":"template",
          "payload":{
              "template_type":"button",
              "text": text,
              "buttons":[
                {
                    "type":"postback",
                    "title":"حاله الجهاز",
                    "payload":"help_machine_status"
                },
                {
                    "type":"postback",
                    "title":"عمليات الجهاز",
                    "payload":"help_machine_operation"
                }
            ]
          }
      }
  }
}

const helpMachineStatusTemplete = (text) => {
  return {
      "attachment":{
          "type":"template",
          "payload":{
              "template_type":"button",
              "text": text,
              "buttons":[
                {
                    "type":"postback",
                    "title":"تنشيط الجهاز",
                    "payload":"help_machine_status_activate"
                },
                {
                    "type":"postback",
                    "title":"طريقه تغير الشريحه",
                    "payload":"help_machine_status_change_sim"
                }
            ]
          }
      }
  }
}

const helpMachineOperationTemplete = (text) => {
  return {
      "attachment":{
          "type":"template",
          "payload":{
              "template_type":"button",
              "text": text,
              "buttons":[
                {
                    "type":"postback",
                    "title":"حاله عمليه ",
                    "payload":"help_machine_operation_trans_status"
                },
                {
                    "type":"postback",
                    "title":"عمولات اليوم",
                    "payload":"help_machine_operation_today_commision"
                },
                {
                  "type":"postback",
                  "title":"تحويلات الجهاز",
                  "payload":"help_machine_operation_machine_transfer"
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

