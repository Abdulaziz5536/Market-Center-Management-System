import mongoose, { Schema } from "mongoose";


const unitSchema = new Schema({

  unitId:{
    type:String,
    required:true,
    unique:true
  },

  area:String,

  type:String,

  monthlyRent:Number,

  status:{
    type:String,
    enum:["Available", "Not Available"],
    default:"Available"
  }

});

const Unit = mongoose.model("Unit",unitSchema);

export default Unit;