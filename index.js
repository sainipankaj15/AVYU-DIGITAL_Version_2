import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';
const __dirname = path.resolve();
import pug from "pug";

import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 8000;


// Express stuff
const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.use(cors());


// Pug stuff
app.set('view engine', 'pug'); //set template engine as a pug
app.set('views', path.join(__dirname, 'views')); // set the views folder


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



app.get('/addservice',(req,res)=>{
    res.status(200).render('addservice.pug');
});


// Created a schema
const serviceschema = new mongoose.Schema({
    Name : String,
    Price : Number,
    Des : String,
    Pic : String
   
});
 
// creating a model by compling schema
const Service = mongoose.model('Service',serviceschema);


app.post('/addservice',(req,res)=>{
 

    // console.log(req.body);

    var newData = new Service(req.body); // bascally i created a new object by req.body 

    // and what is req.body ............. this is the body when someone will submit our from .... means when someone request post request jo ki form submit button dabane par aayagi(contact.pug mai form ka action dekh waha likha h )

    newData.save().then(()=>{
        res.send("This item has been sent");
    }).catch((err)=>{
        console.log(err);
        res.send("This is not sent,Try again");
    });

});



app.get('/',(req,res)=>{
    
    try{
        Service.find({},(err,doc)=>{
            // console.log(doc)
            // let params= {'Link': doc.Pic,'Name' : doc.Name, 'Price' : doc.price, 'Description': doc.Des}
            let params= {'Project':doc};
            res.status(200).render('index.pug', params)
        })
    }

    catch(err){
        console.log(err);
        res.status(404).send("Sahi se kaam karo error aa gayi h ");
    }
    
});


// Contact us wale form ka nipitra yaha se kargee

// Creating a schema
const contactschema = new mongoose.Schema({
    firstname : String,
    lastname : String,
    areacode : String,
    telenum : Number,
    emailid : String,
    feedback : String   
});

// creating a model
const Contact = mongoose.model('Contact-Us',contactschema);


app.post('/contact-us',(req,res)=>{
 

    // console.log(req.body);

    var newData = new Contact(req.body); // bascally i created a new object by req.body 

    // and what is req.body ............. this is the body when someone will submit our from .... means when someone request post request jo ki form submit button dabane par aayagi(contact.pug mai form ka action dekh waha likha h )

    newData.save().then(()=>{
        res.send("This item has been sent");
    }).catch((err)=>{
        console.log(err);
        res.send("This is not sent,Try again");
    });

});