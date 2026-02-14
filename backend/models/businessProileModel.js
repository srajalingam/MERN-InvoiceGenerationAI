import mongoose from "mongoose";

const BusinessProfileSchema = new mongoose.Schema({
    owner:{
        type: String,
        required: true,
        index: true,
    },

    businessName: { type: String, required: true },
    email:{
        type: String,
        required: false,
        trim: true,
        lowercase: true,
        default: "",
    },
    address: { type: String, default: "",required: false },
    phone: { type: String, default: "", required: false },
    gst: { type: String, default: "", required: false },

    logoURL: { type: String, default: "", required: false },
    stampURL: { type: String, default: "", required: false },
    signatureURL: { type: String, default: "", required: false },

    signatureOwnerName: { type: String, default: "", required: false },
    signatureOwnerTitle: { type: String, default: "", required: false },

    defaultTaxPercentage: { type: Number, default: 18, required: false },
},{
    timestamps: true,
});

const BusinessProfile =  mongoose.model("BusinessProfile", BusinessProfileSchema);

export default BusinessProfile;