import Employeehistory from "../models/employeehistory.model.js"
import bcryptjs from 'bcryptjs';


export const employeehis =async (req, res ,next) => {

    const { empname, phone_number, username, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new Employeehistory({ empname, phone_number, username, password:hashedPassword });
    
    try{
    await newUser.save();
    res.status(201).json('User created successfully!');
    
    }catch (error){
    
       next(error) ;
    }  
    
    };
    export const getAllemphistory = async (req ,res) => {

      try{
  
         const historyData = await Employeehistory.find();
         if(!historyData){
          return res.status(404).json({msg:"employee data not found"});
         }
  
        res.status(200).json(historyData);
  
      }catch(error){
  
          res.status(500).json({error:error});
      }
  
  }
    