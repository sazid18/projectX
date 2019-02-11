const xhr = require('xhr');
const express = require('express');
const axios = require('axios');
var app = express();
const bodyParser=require('body-parser');
var ejs=require('ejs');

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set('view engine','ejs');


app.use(express.static(__dirname));
app.get('/',(req,res)=>{
  res.sendFile('./index.html');
})


app.post('/submit',(req,res)=>{
//  res.send(JSON.stringify(res));
  const handle = req.body.handle;
  axios.get(`http://codeforces.com/api/user.status?handle=${handle}&from=1&count=10`)
    .then(function (response) {
      console.log(handle);
      console.log(response.data);
      res.render('display',{result:response.data.result})
    })
    .catch(function (error) {
      console.log(error);
    });
});
app.listen(4000,()=>{
  console.log("listening on port 4000");
}) ;
