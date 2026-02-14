import express from "express";
import multer from "multer";
import { createBusinessProfile, getMyBusinessProfile, updateBusinessProfile } from "../controllers/businessProfileController.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import path from "path";

const businessProfileRouter = express.Router();

businessProfileRouter.use(clerkMiddleware());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads/")); // Ensure this directory exists
  },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
     const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ storage: storage });

businessProfileRouter.post("/", 
    upload.fields([
        { name: "logoName", maxCount: 1 },
        { name: "signatureNameMeta", maxCount: 1 },
        { name: "stampName", maxCount: 1 }
     ]), 
    createBusinessProfile
);

businessProfileRouter.put("/:id", 
    upload.fields([
        { name: "logoName", maxCount: 1 },
        { name: "signatureNameMeta", maxCount: 1 },
        { name: "stampName", maxCount: 1 }
     ]), 
    updateBusinessProfile
);

businessProfileRouter.get("/me",getMyBusinessProfile);

export default businessProfileRouter;