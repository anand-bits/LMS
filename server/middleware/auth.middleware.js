import AppError from "../Utils/error.util.js";

const isLoggedIn=async (req,res,next)=>
{
    const { token }= req.cookies;

    if(!token)
    {
        return next(new AppError('unauthenticated',400));

    }
    const userDetails= await JsonWebTokenError.verify(token,process.env.JWT_SECRET);

    req.user= userDetails;
    next();




}
export{
    isLoggedIn
}