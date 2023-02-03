const express= require("express");
const app=express();
app.get("/",(req,res)=>{
let name= req.query.name;// this can be used to get value that has passed by redirect endpoint
let age= req.query.age;
if(!(name&&age)){
  name="Ayal";
  age=26;
}
res.send(`Welcome ${name}, look like you are ${age} Years old`);
});
app.listen(3000);