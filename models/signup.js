import mongoose from "mongoose";

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

export default User