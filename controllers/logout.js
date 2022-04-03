export const logout = (req,res)=>{
    res.clearCookie("jwt");
    res.status(200).redirect('/');
}