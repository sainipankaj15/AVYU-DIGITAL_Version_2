import bcrypt from "bcrypt";
import User from "../models/signup.js"
import jwt from "jsonwebtoken";


// when he/she will click of signIn button
export const signIn = (req,res)=>{
    res.render('signin.pug');
}



// when he/she will click on singIn after entering the details
export const logIn = async (req,res)=>{
   

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


    // console.log(token);

    res.cookie('jwt',token, { httpOnly: true, maxAge: 10000000 });

    // res.send(token);

    
    // console.log(token);
   
    res.status(200).redirect('/');
    // console.log(user);
   
}