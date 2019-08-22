require('dotenv').config({ path: 'variables.env' });

 const express = require('express');
    const bodyParser = require('body-parser');

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.listen(5000, () => console.log('Express server is listening on port 5000'));


   // 3-Endpoint to recieve Events 

    const verifyWebhook = require('./verify-webhook');

    app.get('/', verifyWebhook);

    // 4- page token 
    // EAAWQAsLZAHqgBAMg7uec6GI9jgyfAJQsZA7Tr408rmz3iS8NDbP1MWpBrpQuHkNvrDQ1DTwsaJjia86kuSD01gsWf8tOjdAWqZBKH5dskMMZCAVDV5QkPUjUhMbbzI6aWCT9Mkj2xllYock26sR0BFDP9YnUZCLh1Rmx1M9bUDybZBE9ZCCXancZCHMrZAZA8ZCQG0ZD



    //8 - recieve message 

   //  const messageWebhook = require('./message-webhook');

   //  app.post('/', messageWebhook);

   const botFramwork = require('./botFramwork-webhook');

   app.post('/', botFramwork);