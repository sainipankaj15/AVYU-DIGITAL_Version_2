import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';
const __dirname = path.resolve();
import field from "field";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieparser from "cookie-parser";
import lodash from "lodash";
import pug from "pug";
import { response } from "express";
import contact from "./routes/contact.js";
import service from "./routes/service.js";
import signup from "./routes/signup.js";
import home from "./routes/home.js";
import logout from "./routes/logout.js";
import signin from "./routes/signin.js";
import auth from "./middlewares/auth.js";
import { logerr, logErr } from "./helpers/debugger.js";


dotenv.config(); // by writing this we can access .env file 
const PORT = process.env.PORT || 8000;

// Express stuff
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(cors());
app.use(cookieparser()); // request.cookies mai saari cookies  aa jaati  h 


// Pug stuff
app.set('view engine', 'pug'); //set template engine as a pug
app.set('views', path.join(__dirname, 'views')); // set the views folder


console.log(process.env.CONNECTION_URL);
// Mongoose stuff
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database is connected");
        app.listen(PORT, () => console.log(`The server is running on port: ${PORT}`))
    })
    .catch((error) => {
        console.log("Database is not connected");
        console.log(error.message);
    });


app.use(auth);
app.use(contact);
app.use(service);
app.use(signup);
app.use(home);
app.use(logout);
app.use(signin);

app.get('/:req.firstname',(req,res)=>{
    
    res.status(200).redirect('/');
})


// for debugging module : to make easy debugging
// both below lines are useless but very useful in debugging
logErr("Ye nahi chalega");
logerr("ye chal jayega");