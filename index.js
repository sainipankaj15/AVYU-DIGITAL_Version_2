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
const PORT = process.env.PORT || 8000;


dotenv.config(); // by writing this we can access .env file 

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



// using a middleware to check user is login or not 
app.use((req, res, next) => {
    const token = req.cookies.jwt;
    // console.log(req.cookies.jwt);

    if(token)
    {
        try
        {
            const obj = jwt.verify(token, process.env.JWTprivatekey);

            // console.log(obj);

            req.user = obj;
    
            console.log(req.user);
            

        }
        catch(error)
        {
            return res.status(400).render('error.pug', { status: 400, message: "You don't have a valid token. Bsdk gaand mai ungli ku kar raha hai." } );
            // return res.status(400).json({ err: true, message: "You don't have a valid token. Bsdk gaand mai ungli ku kar raha hai." });
        }
    
        // obj mai _id decode ho gai hai as JSON
        // {
        //     _id: ......
        // }
    }
    next(); // this is middleware so next() must be called unconditionally 
            // to pass on req to other functions otherwise req will be blocked
})


app.get('/addservice',(req,res)=>{
    if(!req.user)
    {
        return res.status(404).render('error.pug', { status: 404, message: "Login karle pehle bsdk." } );
    }
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
        // res.send("This item has been sent");
        res.render('submitted.pug',{'URL' : '/addservice','message': 'Your form has been submitted successfully'})
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
            if(!req.user)
            var params= {'Project':doc, 'Variable1': 'SignIn', 'Variable2' : 'SignUp'};
            if(req.user)
            var params= {'Project':doc, 'Variable1': req.user.firstname, 'Variable2' : 'LogOut'};
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


app.get('/signin',(req,res)=>{
res.render('signin.pug');
});

app.get('/signup',(req,res)=>{
res.render('signup.pug');
});

app.get('/logout',(req,res)=>{
    res.clearCookie("jwt");
    res.status(200).redirect('/');
    
})


app.get('/:req.firstname',(req,res)=>{
    
    res.status(200).redirect('/');
})

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
        // res.send("This item has been sent");
        res.render('submitted.pug',{'URL' : '/','message': 'Your form has been submitted successfully'})
        
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




// now from here we will work on authencitation or authorizetion

// Creating a schema for user  ====== Sign-up things
const userschema = new mongoose.Schema({
    firstname :  {
    type : String,
    required :true, // it means first name is requried if user dont fill first name then it will throw error
    minlength: 4,
    maxlength: 25
}, 

    emailid : {
    type : String,
    required :true,
    minLength: 5,  // it means minmum lenght 5 honi chaaiye 
    maxlength : 300, // it means maximum length 20 tak ho skati h 
    unique : true // it means 2 user same email id se nahi aa sakte h database mai 

 },
    password : {
    type : String,
    required :true,
    minLength: 5,  // it means minmum lenght 5 honi chaaiye 
    maxlength : 1024, // it means maximum length 1024 tak ho skati h 
    // lowercase: true, // all things abe small mai save hongi 

 }
   
});



// Creating a model for user by compling userschema  schema
const User = mongoose.model('User',userschema);


// Saving data in database
app.post('/signup', async (req,res)=>{
 
    // console.log(req.body);

    // var user = new User(req.body); // bascally i created a new object by req.body 

    var user = new User({
        firstname : req.body.name,
        emailid : req.body.email,
        password : req.body.password
    });
    
   // another method to write the lines from 229 to 233 above four lines using lodash module. It can be helpful when we want to store new thing
    // user = new User(lodash.pick(req.body,['name','email','password'])); 
    // above line is professional way 

    
  

    

    // and what is req.body ............. this is the body when someone will submit our from .... means when someone request post request jo ki form submit button dabane par aayagi(contact.pug mai form ka action dekh waha likha h )

    // newData.save().then(()=>{
    //     res.send("This item has been sent");
    // }).catch((err)=>{
    //     console.log(err);
    //     res.send("This is not sent,Try again");
    // });

 

    try{ 
        // now we will add some salt in password using bcrypt module
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password,salt);
          
         const result =  await user.save();
         console.log(result);
        //  res.send("This item has been sent");
         res.render('submitted.pug',{'URL' : '/','message': 'You are successfully Registered now you can login with your credentials '})


        
       }
    catch(error){
        res.send("sahi se kaam karo error aa gayi h ");
        console.log(error);
        // below 2 lines will print all errors
        for(let field in error.errors)
        console.log(error.errors[field].message);
    
   
  }
  
});




// login things

app.post('/signin',async (req,res)=>{
   

    // firstly we check is user exist or not in our data base 
    let user = await User.findOne({emailid : req.body.email})
    if(!user)
   {
    res.send("User not exist");
    return ;
   }
   

   // if user exist then we will check is given password is wrong or right
   let vaildpassword = await bcrypt.compare(req.body.password,user.password);

   console.log(vaildpassword);
   if(!vaildpassword){
       res.send("Password is wrong Please fill it again")
       return ;
   }
    

   // abe user yadi yaha tak aa gaya h it's means he succesfully login 
   // now we will generate json web token for user taaki useh next time login na karna pade

    const token = jwt.sign({_id: user._id,firstname:user.firstname},process.env.JWTprivatekey);
    // Here JWTprivatekey is digital signature jo ki json web token ko decode karne mai kaam aata h aur yeh cheez confidencial rahni chaaiye
    console.log(token);
    res.cookie('jwt',token, { httpOnly: true, maxAge: 100000 });
    // res.send(token);
    
    console.log("hiii");
    console.log(token);
    console.log("hiii");
    res.status(200).redirect('/');
    // console.log(user);
   

});