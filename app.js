const xhr = require('xhr');
const express = require('express');
const axios = require('axios');
var app = express();
const bodyParser=require('body-parser');
var ejs=require('ejs');
var handle
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.set('view engine','ejs');


app.use(express.static(__dirname));
app.get('/',(req,res)=>{
  res.sendFile('./index.html');
})
exports.display = function(req, res) {
    // send moment to your ejs
    res.render('display', {axios:axios});
}
app.post('/submit',(req,res)=>{
//  res.send(JSON.stringify(res));
  handle = req.body.handle;
  axios.get(`http://codeforces.com/api/user.status?handle=${handle}&from=1&count=10`)
    .then(function (response) {
      console.log(handle);
      console.log(response.data.result[0].problem);

      res.render('display',{result:response.data.result, handle:handle})
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post('/newpage',(req,res)=>{
  console.log(req.body.pagenumber);
  console.log(req.body.handle);
  handle=req.body.handle;
  pagenumber=req.body.pagenumber;
  fromnumber=10*(pagenumber-1)+1;
  // axios.get(`http://codeforces.com/api/user.status?handle=${handle}&from=${fromnumber}&count=10`)
  //   .then(function (response) {
  //     console.log(handle);
  //     console.log(response.data.result[0].problem);
  //     res.json({result:response.data.result, handle:handle})
  //     console.log('asdf');
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
    res.render('function');
})

app.get('/newpage',(req,res)=>{
  console.log(req.query.page);
  console.log(req.query.handle);
  handle=req.query.handle;
  page=req.query.page;
  fromnumber=10*(page-1)+1;
  axios.get(`http://codeforces.com/api/user.status?handle=${handle}&from=${fromnumber}&count=10`)
    .then(function (response) {
      console.log(handle);
      console.log(response.data.result[0].problem);
      res.render('display',{result:response.data.result, handle:handle})
      console.log('asdf');
    })
    .catch(function (error) {
      console.log(error);
    });
    // res.render('function');
})

app.listen(4000,()=>{
  console.log("listening on port 4000");
}) ;
