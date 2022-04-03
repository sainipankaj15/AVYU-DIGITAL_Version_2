import jwt from 'jsonwebtoken';
// using a middleware to check user is login or not 
const auth = async (req, res, next) => {
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
            console.log(error);
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
}

export default auth;