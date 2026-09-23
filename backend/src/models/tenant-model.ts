import mongoose, {Schema} from "mongoose";
import type Unit from "./unit-model";


const tenantFileSchema = new mongoose.Schema(
  {
    name: String,
    type: String,
    data: String
  },
  { _id: false }
);

const tenantSchema = new Schema({
  tenantName:{
    type:String,
    required:true
  },

  phone:{
    type:String,
    required:true
  },

  email:String,

  unit:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Unit",
    required:true
  },

   moveInDate:{
    type:String,
    default:""
  },
  moveOutDate:{
    type:String,
    default:""
  },

  idLicenseFile: tenantFileSchema,

  leaseAgreementFile: tenantFileSchema
  
})

const Tenant = mongoose.model("Tenant", tenantSchema);

export default Tenant;