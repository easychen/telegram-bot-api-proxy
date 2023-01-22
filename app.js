// telegram bot token
const bot_token = '1234567890:ABCDEFabcdef1234567890abcdef1234567890'; 

const express = require('express')
const path = require('path')
const fetch = require('cross-fetch')
const app = express()
var multer = require('multer');
var forms = multer({limits: { fieldSize: 10*1024*1024 }});
app.use(forms.array()); 

const bodyParser = require('body-parser')
app.use(bodyParser.json({limit : '50mb' }));  
app.use(bodyParser.urlencoded({ extended: true }));

console.log(`/bot${bot_token}/*`)

app.all(`/bot${bot_token}/*`, async (req, res) => {
  const url = `https://api.telegram.org${req.url}`;
  const options = {
      method: req.method,
      headers: {'content-type': 'application/json; charset=utf-8'},
  };
  if( req.method.toLocaleLowerCase() === 'post' && req.body ) options.body = JSON.stringify(req.body);

  const response = await fetch(url, options);
  const data = await response.json();
  res.json(data);

})


// Error handler
app.use(function(err, req, res, next) {
  console.error(err)
  res.status(500).send('Internal Serverless Error')
})

app.listen(9000, () => {
  console.log(`Server start on http://localhost:9000`);
})