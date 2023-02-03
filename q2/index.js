const express= require("express");
const app=express();
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const qs = require('querystring');// used to parse the request body to object. and the object then attached to req.body property
app.get("/",(req,res)=>{
  const form=`
  <form action="/response" method="post">
   <label for="name">Name:</label>
   <input type="text" id="name" name="name"/>
   <label for="age">Age:</label>
   <input type="number" id="age" name="age">
   <button  type="submit">Submit Query</button>
  </form>
  `
  res.send(form);
})

/*
app.post('/submit', (req, res) => {// handling the post request using post.
  const name = req.body.name;
  const age = req.body.age;
  res.send(`Hello, ${name}! You are ${age} years old.`);
});
*/

app.use("/response",(req, res, next) => {// handling post request using middleware
  if (req.method === 'post' && req.headers['content-type'] === 'application/x-www-form-urlencoded') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
     next();
    });
    req.on('end', () => {
      req.body = qs.parse(body);
      next();
    });
  } else {
    next();
  }
 
  if (req.body) {
    const name = req.body.name;
    const age = req.body.age;
    res.send(`Hello, ${name}! You are ${age} years old.`);
    //console.log(req.body);
    //res.send(`Hello ${req.body.name} ...look like you are ${req.body.age}`);
  } else {
    res.send('No data received');
  }

});

app.listen(3000,()=>{
  console.log("our server is working..")
})