const errorMiddleware=(err,req,res,next)=>

{
    err.statusCode= err.statusCode|| 500;
    err.message= err.message||"Something is wrong"

   return  res.status(err.statusCode).json({
        succes:false,
        message:err.message,
        stack:err.stack
    })
}
export default errorMiddleware;