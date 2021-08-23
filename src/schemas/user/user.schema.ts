
import * as mongoose from 'mongoose'
import {HookNextFunction} from 'mongoose'
import * as bcrypt from 'bcryptjs'
import { User as UserInterface } from 'src/user/interfaces/user.interface'


const UserSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
})

UserSchema.pre('save',async function(next:HookNextFunction){
    let user=this as UserInterface
    if(!user.isModified('password')){
        next()
    }
 
    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(user.password,salt)
   
 })
 
 UserSchema.methods.comparePassword=async function(enteredPassowrd:string):Promise<Boolean>{
     let user =this as UserInterface
     return await bcrypt.compare(enteredPassowrd,user.password)
     
 }

 const User=mongoose.model<UserInterface>('User',UserSchema)

 export default User