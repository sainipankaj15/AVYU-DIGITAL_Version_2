import mongoose from "mongoose";

const serviceschema = new mongoose.Schema({
    Name : String,
    Price : Number,
    Des : String,
    Pic : String
    // Pic : {type : String, required: true}
});
 
// creating a model by compling schema
const Service = mongoose.model('Service',serviceschema);

export default Service;