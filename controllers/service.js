import Service from "../models/service.js";

export const addService = (req,res)=>{
 
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

}


export const getService = (req,res)=>{
    if(!req.user)
    {
        return res.status(404).render('error.pug', { status: 404, message: "Login karle pehle bhai." } );
    }
    res.status(200).render('addservice.pug');
}