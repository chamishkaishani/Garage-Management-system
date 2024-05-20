import mongoose from 'mongoose'

const employeehistorySchema = new mongoose.Schema(
    {
        empname:{
            type:String,
            required:true,
        },
        phone_number:{
            type:String,
            required:true,
            unique:true,
        },
        username:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        avatar:{
            type: String,
            default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        },
    },{timestamps:true});
const Employeehistory= mongoose.model('Employeehistory',employeehistorySchema);
   
export  default Employeehistory;