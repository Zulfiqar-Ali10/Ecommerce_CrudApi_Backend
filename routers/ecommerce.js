import express from "express";
const router = express.Router();
import Ecommerce from "../models/Ecommerce.js";
import sendResponse from "../helpers/sendResponse.js"


router.post("/", async (req, res) => {
    const {productName, productDescription, price} = req.body;
    try{
       let newEcommerce = new Ecommerce({productName, productDescription, price});
       newEcommerce = await newEcommerce.save();
       sendResponse(res, 201, newEcommerce, false, "Ecommerce Data Added Sucessfully")
    }catch (error) {
        sendResponse(res, 500, null, true, "Failed To Add Ecommerce Data")
    }
});

router.get("/", async (req, res) => {
    try {
        let Ecommerces = await Ecommerce.find();
        sendResponse(res, 200, Ecommerces, false, "Ecommerce Data fetched successfully");
    } catch (error) {
        sendResponse(res, 500, null, true, "Failed to fetch Ecommerce");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const Ecommerces = await Ecommerce.findById(req.params.id);

        if (!Ecommerces) {
            return sendResponse(res, 404, null, true, "Ecommerces Data not found");
        }

        sendResponse(res, 200, Ecommerces, false, "Ecommerces Data Fetched successfully");
    } catch (error) {
        sendResponse(res, 500, null, true, "Failed to Fetch Ecommerce Data");
    }
});

router.put("/:id", async (req, res) => {    

    const { productName, productDescription, price } = req.body;
    try {
        const Ecommerces = await Ecommerce.findById(req.params.id);

        if (!Ecommerces) {
            return sendResponse(res, 404, null, true, "Ecommerce Data not found");
        }

        if(productName) Ecommerces.productName = productName;
        if(productDescription) Ecommerces.productDescription = productDescription;
        if(price) Ecommerces.price = price;

        await Ecommerces.save();
        sendResponse(res, 200, Ecommerces, false, "Ecommerce Data Updated successfully");
    } catch (error) {
        sendResponse(res, 500, null, true, "Failed to fetch Ecommerce Data");
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const Ecommerces = await Ecommerce.findById(req.params.id);

        if (!Ecommerces) {
            return sendResponse(res, 404, null, true, "Ecommerce Data not found");
        }

        await Ecommerces.deleteOne({_id: req.params.id});
        sendResponse(res, 200, null, false, "Ecommerce Data Delete successfully");
    } catch (error) {
        sendResponse(res, 500, null, true, "Failed to fetch Ecommerce Data");
    }
});

export default router;