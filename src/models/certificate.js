import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
 
    branch : {
      type : String,
      required :  true,
    },

    eventName: {
      type: String,
      required: true,
    },

    certificateId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Certificate = mongoose.model(
  "Certificate",
  certificateSchema,
  "certificates",
);

export default Certificate;
