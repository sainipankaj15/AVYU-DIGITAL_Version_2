import mongoose from "mongoose";

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

export default Contact;