import Contact from "../models/contact.js";
export const postContact = async (req,res)=>{
 
    // console.log(req.body);

    var newData = new Contact(req.body); // bascally i created a new object by req.body 

    // and what is req.body ............. this is the body when someone will submit our from .... means when someone request post request jo ki form submit button dabane par aayagi(contact.pug mai form ka action dekh waha likha h )

    // newData.save().then(()=>{
    //     res.send("This item has been sent");
    // }).catch((err)=>{
    //     console.log(err);
    //     res.send("This is not sent,Try again");
    // });

 
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