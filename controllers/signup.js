import bcrypt from "bcrypt";
import User from "../models/signup.js"

export const signUp = async (req,res)=>{
 
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
  
}


export const signuppage = (req,res)=>{
    res.render('signup.pug');
 }