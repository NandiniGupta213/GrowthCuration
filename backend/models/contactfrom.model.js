import mongoose, { Schema } from "mongoose";
import validator from "validator"

const formSchema=new Schema({
    name: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
      },
      surname: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
      },
      companyName: {
        require:true,
        type: String,
        trim: true
      },
      location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
      },
      email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
        validate: {
          validator: function (value) {
            return validator.isEmail(value);
          },
          message: 'Please enter a valid email address'
        }
      },
      phonenumber: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
          validator: function (value) {
            return /^[0-9]{10,15}$/.test(value);
          },
          message: 'Please enter a valid phone number (10-15 digits)'
        }
      },
      packages: {
        type: String,
        enum: ['Basic', 'Standard', 'Premium'],
        required: [true, 'Please select a package']
      }
})

export const FormSchema=mongoose.model("FormSchema",formSchema);