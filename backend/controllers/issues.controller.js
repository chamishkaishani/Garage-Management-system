import Repair from "../models/issues.model.js";


export const createIssue = async (req , res , next) => {

   const { email,vehiclenumber, engine, tyre, parts,approvel,requirment,date } = req.body;
   const newRepair = new Repair({ email, vehiclenumber, engine, tyre,parts,approvel,requirment ,date});

   
   try {

    await newRepair.save();
    res.status(201).json('Vehicle issues created successfully!')

   }catch(error){
    next(error);
   }

};