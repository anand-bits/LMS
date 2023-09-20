import { Schema } from "mongoose";
import bycrypt from 'bcryptjs';


const userSchema = new Schema({

    fullName:{
        type:'String',
        required:[true, 'Name is required'],
        minLength:[5, ' Name must be at least 5 Character'],
        lowercase:true,
        trim:true,
    },
    email:{
        type:'String',
        required:[true,'Email is Required'],
        lowercase:true,
        trim:true,
        unique:true,


    },
    Password:{
        type:'String',
        required:[true,'Password is must'],
        minLength:[8, 'Password is must'],
        select:false,

    },
    avatar:
    {
        public_id:{
            type:'String',
        },
        secure_url:
        {
            type:'String'
        }
    },
    role:{
        type:'String',
        enum:['USER','Admin'],
        default:'USER'

    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date
},
{
    timestamps:true
}
);
userSchema.pre('save',async function(next){

    if(!this.isModified('password'))
    {
        return next;

    }
    this.Password=bycrypt.hash(this.Password,10);

});

userSchema.methods= {
    generateJWTToken:async function()
    {
          return  await jwt.sign(
            {
                id:this._id,email:this.email,subscription:this.subscription
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_EXPIRY,
            }
        )
    },
    comparePassword:async function(plainTextPassword){
        return  await bycrypt.compare(plainTextPassword,this.Password);

    }
}

const User= model('User',userSchema);

export default User;
