import Service from "../models/service.js";

export const home = async (req,res)=>{
    
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
    
}