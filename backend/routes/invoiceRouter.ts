import express from "express";
import { createInvoice, getInvoices, getInvoiceById, updateInvoiceById, deleteInvoiceById } from "../controllers/invoiceConroller.js";
import { clerkMiddleware, requireAuth } from "@clerk/express";

const invoiceRouter = express.Router();

invoiceRouter.use(clerkMiddleware());

invoiceRouter.get("/",getInvoices);
invoiceRouter.get("/:id",getInvoiceById);
invoiceRouter.post("/",createInvoice);
invoiceRouter.put("/:id",updateInvoiceById);
invoiceRouter.delete("/:id",deleteInvoiceById);

export default invoiceRouter;