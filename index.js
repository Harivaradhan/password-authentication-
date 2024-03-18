//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import express  from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
//creatig the app
const app= express();
//assigning the port whwre we want to host the website in our laptop
const port=3000;
var userIsAuthorised = false;
app.use(bodyParser.urlencoded({extended:true}));
//now we are going to create our own middlewere to check out the secret based on the passwrd
function passwordCheck(req,res,next)
{
    const password= req.body["password"];
    if(password==="ILoveProgramming")
    {
        userIsAuthorised=true;
    }
    next();
}
app.use(passwordCheck);// thiss allwos the express app to check this middleware ll time when the site is loaded or reloaded
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});
app.post("/check", (req, res) => {
    if (userIsAuthorised) {
      res.sendFile(__dirname + "/public/secret.html");
    } else {
      res.sendFile(__dirname + "/public/index.html");
      //Alternatively res.redirect("/");
    }
  });
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  