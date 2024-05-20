import mongoose from "mongoose";

const repairSchema = new mongoose.Schema({


    email: {
        type: String,
        required: true,
        unique: true,
    },

    vehiclenumber: {
        type: String,
        required: true,
        unique: true,
    },
    engine: {
        type: String,
        default: "good"
        
    },
    tyre: {
        type: String,
        default: "good"
    },

    parts: {
        type: String,
        default: "No parts required"
        
    },

    approvel: {
        type: String,
        required: true,
        default: "Yes"

        
    },
    requirment: {
        type: String,
        default: "No requirment"
        
    },
    date: {
        type: Date,
        required: true,

        default: Date.now
    }
    


}, { timestamps: true });

const Repair = mongoose.model('Repair', repairSchema);
  
export default Repair;