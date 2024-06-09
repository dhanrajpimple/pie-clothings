const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },

  amountPaid: {
    type: Number,
    required: true,
    default: 0,
  },
  amountRemaining: {
    type: Number,
    required: true,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  deliveryAdd: {
    type: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
    },
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["In Progress", "Completed"],
    default: "In Progress"
  },
  cartId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: String,
      name: String,
      quantity: Number,
      size: String,
      gallery: [String],
    },
  ],
  uid: {
    type: String,
    required: true,
  },
  tempUid: {
    type: String,
    required: false,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  updated_date: {
    type: Date,
    default: Date.now,
  },
});

orderSchema.pre("save", function (next) {
  this.updated_date = Date.now();
  next();
});

orderSchema.pre("findOneAndUpdate", function (next) {
  this._update.updated_date = Date.now();
  next();
});

module.exports = mongoose.model("Order", orderSchema);
