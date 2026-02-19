import { getAuth } from "@clerk/express";
import BusinessProfile from "../models/businessProileModel.js";

const APIBASE_URL = process.env.API_BASE_URL || "http://localhost:5000";

//file to url
function uploadedFilesToUrls(req) {
  const urls = {};
  if (!req.files) return urls;

  const logoArr = req.files.logoName || req.files.logo || [];
  const stampArr = req.files.stampName || req.files.stamp || [];
  const sigArr = req.files.signatureNameMeta || req.files.signature || [];

  if (logoArr[0]) urls.logoUrl = `${API_BASE}/uploads/${logoArr[0].filename}`;
  if (stampArr[0])
    urls.stampUrl = `${API_BASE}/uploads/${stampArr[0].filename}`;
  if (sigArr[0])
    urls.signatureUrl = `${API_BASE}/uploads/${sigArr[0].filename}`;

  return urls;
}

// Create a business profile for the authenticated user

export async function createBusinessProfile(req, res) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const body = req.body;
    const fileUrls = uploadedFilesToUrls(req);
    //  CREATE BUSINESS PROFILE
    const profile = new BusinessProfile({
      owner: userId,
      businessName: body.businessName || "ABC Solutions",
      email: body.email || "",
      address: body.address || "",
      phone: body.phone || "",
      gst: body.gst || "",
      logoUrl: fileUrls.logoUrl || body.logoUrl || null,
      stampUrl: fileUrls.stampUrl || body.stampUrl || null,
      signatureUrl: fileUrls.signatureUrl || body.signatureUrl || null,
      signatureOwnerName: body.signatureOwnerName || "",
      signatureOwnerTitle: body.signatureOwnerTitle || "",
      defaultTaxPercent:
        body.defaultTaxPercent !== undefined
          ? Number(body.defaultTaxPercent)
          : 18,
    });
    const savedProfile = await profile.save();
    return res.status(201).json({
      message: "Business profile created successfully",
      profile: savedProfile,
      success: true,
    });
  } catch (error) {
    console.error("Error creating business profile:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
}

//update business profile for the authenticated user

export async function updateBusinessProfile(req, res) {
  try {
    const { userId } = getAuth(req);
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const { id } = req.params;
    const body = req.body;
    const fileUrls = uploadedFilesToUrls(req);
    const existingProfile = await BusinessProfile.findOne({ owner: id });
    if (!existingProfile) {
      return res
        .status(404)
        .json({ message: "Business profile not found", success: false });
    }
    if (existingProfile.owner !== userId) {
      return res
        .status(403)
        .json({
          message: "Forbidden: You can only update your own profile",
          success: false,
        });
    }
    const update = {};
    //UPDATE BUSINESS PROFILE
    if (body.businessName !== undefined)
      update.businessName = body.businessName;
    if (body.email !== undefined) update.email = body.email;
    if (body.address !== undefined) update.address = body.address;
    if (body.phone !== undefined) update.phone = body.phone;
    if (body.gst !== undefined) update.gst = body.gst;

    if (fileUrls.logoUrl) update.logoUrl = fileUrls.logoUrl;
    else if (body.logoUrl !== undefined) update.logoUrl = body.logoUrl;

    if (fileUrls.stampUrl) update.stampUrl = fileUrls.stampUrl;
    else if (body.stampUrl !== undefined) update.stampUrl = body.stampUrl;

    if (fileUrls.signatureUrl) update.signatureUrl = fileUrls.signatureUrl;
    else if (body.signatureUrl !== undefined)
      update.signatureUrl = body.signatureUrl;

    if (body.signatureOwnerName !== undefined)
      update.signatureOwnerName = body.signatureOwnerName;
    if (body.signatureOwnerTitle !== undefined)
      update.signatureOwnerTitle = body.signatureOwnerTitle;
    if (body.defaultTaxPercent !== undefined)
      update.defaultTaxPercent = Number(body.defaultTaxPercent);

    const updatedProfile = await BusinessProfile.findOneAndUpdate(
      { owner: id },
      { $set: update },
      { new: true },
      {runValidators: true}
    );
    return res.json({
      message: "Business profile updated successfully",
      data: updatedProfile,
      success: true,
    });
  } catch (error) {
    console.error("Error updating business profile:", error);
    return res.status(500).json({ message: "Server error", success: false });
  }
}

//get business profile for the authenticated user

export async function getMyBusinessProfile(req, res) {
  console.log("Fetching business profile for user....");

    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized", success: false });
        }
        const profile = await BusinessProfile.findOne({ owner: userId });
        console.log("Business profile fetched:", profile);
        if (!profile) {
            return res.status(404).json({ message: "Business profile not found", success: false });
        }
       return res.json({ message: "Business profile fetched successfully", data: profile, success: true });
    } catch (error) {       
        console.error("Error fetching business profile:", error);
        return res.status(500).json({ message: "Server error", success: false });
    }
}
