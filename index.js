import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from 'path';
const __dirname = path.resolve();
import field from "field";
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
    // Pic : {type : String, required: true}
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


   // this is another way of writing lines 66 to 71
    // try{
    //     const result = await newData.save();
    // }
    // catch(err){
    // console.log(err.message);
    // }

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
        for (field in err.errors)
       console.log(err.errors[field].message);
    }
    
});



// Contact us form code start from here

// Creating a schema
const contactschema = new mongoose.Schema({
    firstname :  {
    type : String,
    required :true}, // it means first name is requried if user dont fill first name then it will throw error

    lastname : String,

    areacode : String,

    telenum : {
   type : Number,
   required:true,
   min : 0,
   max : 99999999999
    },

    emailid : {
        type : String,
    required :true,
    minLength: 5,  // it means minmum lenght 5 honi chaaiye 
    maxlength : 20  // it means maximum length 20 tak ho skati h 
 },

    feedback : String   
});

// creating a model
const Contact = mongoose.model('Contact-Us',contactschema);


// Saving data in database
app.post('/contact-us',(req,res)=>{
 
    // console.log(req.body);

    var newData = new Contact(req.body); // bascally i created a new object by req.body 

    // and what is req.body ............. this is the body when someone will submit our from .... means when someone request post request jo ki form submit button dabane par aayagi(contact.pug mai form ka action dekh waha likha h )

    // newData.save().then(()=>{
    //     res.send("This item has been sent");
    // }).catch((err)=>{
    //     console.log(err);
    //     res.send("This is not sent,Try again");
    // });

  async function datasaving(){

    try{
        const result =  await newData.save();
        console.log(result);
        res.send("This item has been sent");
       }
    catch(error){
        res.send("Sahi se kaam karo error aa gayi h ");
        console.log(error.errors);
        // below 2 lines will print all errors
        for(let field in error.errors)
             console.log(error.errors[field].message);
    
    }


  }
  datasaving();


});




