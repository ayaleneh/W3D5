const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'css')));

app.get('/', (req, res) => {
  const currentTime = new Date().getHours();
  const linkTag = currentTime >= 6 && currentTime < 18
    ? '<link rel="stylesheet" href="/day.css">'
    : '<link rel="stylesheet" href="/night.css">';

  const form = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Form-q3</title>
        ${linkTag}
      </head>
      <body>
        <form action="/result" method="post">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" name="name">
          </div>
          <div>
            <label for="age">Age:</label>
            <input type="number" id="age" name="age">
          </div>
          <button type="submit">Submit</button>
        </form>
      </body>
    </html>
  `;
  res.send(form);
});

app.post('/result', (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  res.redirect(`/output?name=${name}&age=${age}`);
  
});
app.get("/output",(req,res)=>{
  const name = req.query.name;
  const age = req.query.age;
  res.send(`Hello, ${name}! You are ${age} years old.`);
})

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
