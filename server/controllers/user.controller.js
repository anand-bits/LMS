import AppError from "../Utils/error.util.js";
import cloudinary from 'cloudinary';
//cloudinary();

const cookieOptions={
    maxAge:7*24*60*60*1000,
    httpOnly:true,
    secure:true
}

const register= async(req, res)=>
{
    const {fullName,Email,password}= req.body;

    if(!fullName || !Email|| !password)
    {
        return next(new AppError('All Fields are required',400));


    }
    const userExit= await User.findOne({Email});

    if(userExit)
    {
        return next(new AppError('Email already Exits',400));

    }
    const user= await User.create({
        fullName,
        Email,
        password,
        avatar:{
            public_id:Email,
            secure_url:"http:// res.chaudhry",

        }
    });
    if(!user)
    {
        return next(new AppError("User Registration Failed try again",400));

    }
//TODO :File Upload

if(req.file){
    try{
        const result= await cloudinary.v2.uploader.upload(req.file.path,{
            folder:'lms',
            width:250,
            height:250,
            gravity:'faces',
            crop:'fill'
        })
        if(result)
        {
            user.avatar.public_id=  result.public_id;
            user.avatar.secure_url=result.secure_url;
            fs.rm(`Uploads/${req.file.filename}`);

        }
    }
    catch(e)
    {
        return next(new AppError("You have done some errorfile not uploaded ",400));
        
    }
}








await user.save();
    user.password=undefined;

    const token= await user.generateJWTToken();
    res.cookie('token ',token,cookieOptions);


    res.status(201).json({
        success: true,
        message:'user is already successfully',
        user,
    })



};

const login= async(req,res)=>
{
    try{ const{ Email,password}=req.body;

    if(!Email || !password)
    {
        return next(new AppError("All fields required",400));
    }

    const user= await User.findOne({
        Email
    }).select('+password');

    if(!user || !user.comparePassword(password))
    {
        return next(new AppError('password dont match',400));

    }

    const token=await user.generateJWTToken();
    user.password= undefined;

    res.cookie('token',token,cookieOptions);

    res.status(200).json({
        success:true,
        message:"User is logged successfully",
        user,


    });}
    catch(e)
    {
        return next(new AppError(e.message,400));

    }
   



};

const logout=(req,res)=>
{
res.cookie('token',null,{
    secure:true,
    maxAge:0,
    httpOnly:true
});
res.status(200).json({
    success:true,
    message:'User logout'
})
};

const getProfile= async (req,res)=>
{


try
{
    const UserId= req.user.id;
    const user= await User.findById(UserId);

    res.status(200).json({
        status:true,
        message:'User detail',
        user
    });

}
catch(e)
{
return next(new AppError('Failed to fetch the user',400));

}
};



export{
    register,
    login,
    logout, getProfile
}
