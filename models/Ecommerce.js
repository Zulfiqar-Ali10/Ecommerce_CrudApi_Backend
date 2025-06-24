import mongoose from "mongoose";
const { Schema } = mongoose;

const ecommerceApiSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: (v) => typeof v === "number" && !isNaN(v),
        message: (props) => `${props.value} is not a valid number`,
      },
    },
  },

  { timestamps: true }
);

const Ecommerce = mongoose.model("EcommerceData", ecommerceApiSchema);

export default Ecommerce;
