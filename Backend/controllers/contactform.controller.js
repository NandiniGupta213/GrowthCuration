import { asynchandler } from "../utils/asynchHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { FormSchema } from "../models/contactfrom.model.js";

const contactform=asynchandler(async(req,res,next)=>{
    const {
        name,
        surname,
        companyName, 
        location,
        email,
        phonenumber,
        packages,
      } = req.body;
      console.log(req.body)

      const requiredFields = {
        name,
        surname,
        companyName,
        location,
        email,
        phonenumber,
        packages: packages && packages.trim() !== "" ? packages : null,
      };
    
      const missingFields = Object.entries(requiredFields)
        .filter(([_, value]) => !value)
        .map(([key]) => key);
    
        if (missingFields.length > 0) {
            return res.status(400).json(
              new ApiResponse(400, null, `Missing required fields: ${missingFields.join(", ")}`)
            );
          }
    
    
      try {
        const contact = await FormSchema.create({
          ...requiredFields,
          package: packages,
        });
    
        res.status(201).json(new ApiResponse(201,contact,"Form submitted successfully. We’ll get in touch shortly!"))
      } catch (error) {
        res.status(400).json(new ApiResponse(400,null,error.message || "Form could not be submitted."))
      }
    
})
export {contactform}


