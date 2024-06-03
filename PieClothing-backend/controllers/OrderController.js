const Razorpay = require("razorpay");

const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET_KEY);
require("dotenv").config();

const Order = require("../models/Order");

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

const razorpay = new Razorpay({
  key_id: "rzp_test_MqoMJgNy2RIv4g",
  key_secret: "O2hsaJEDx5bE8xugDLMdGEtz",
});

exports.allOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

exports.ordersByEmail = async (req, res) => {
  try {
   const {email}  = req.body;// Assuming email is passed as a URL parameter
    const orders = await Order.find({ email: email }); // Query to find orders by email

    res.status(200).json({
      success: true,
      orders: orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};
exports.createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: Number(amount), // amount in paise (e.g., 50000 paise = INR 500)
      currency: currency,
      receipt: "order_receipt_1",
      payment_capture: 1, // Auto capture the payment
    };

    const response = await razorpay.orders.create(options);
    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//order kelela data takat aho..
exports.orderData = async (req, res) => {
  try {
    const {
      order_id,
      payment_id,
      amountPaid,
      amountRemaining,
      name,
      email,
      phone,
      deliveryAdd,
      cartList,
      cartId,
      uid,
      status,
    } = req.body;

    // Validate required fields
    if (!order_id || !amountPaid || !name || !email || !phone || !deliveryAdd || !cartList || !cartId || !uid) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    console.log('Received order data request at:', new Date());
    console.log('Order Data:', {
      order_id,
      payment_id,
      amountPaid,
      amountRemaining,
      name,
      email,
      phone,
      deliveryAdd,
      cartList,
      cartId,
      uid,
      status,
    });

    const startTime = Date.now();

    const products = cartList.map(item => ({
      productId: item._id,
      name: item.name,
      quantity: item.quantity,
      size: item.size,
      gallery: item.gallery
    }));

    const order = await Order.create({
      orderId: order_id,
      amountPaid,
      amountRemaining,
      name,
      email,
      phone,
      deliveryAdd,
      status,
      cartId,
      products,
      uid,
    });

    const endTime = Date.now();
    console.log('Order created at:', new Date());
    console.log(`Order creation time: ${endTime - startTime}ms`);

    res.status(200).json({
      success: true,
      order,
      message: "Order created successfully",
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
      error: err.message,
    });
  }
};


exports.orderDataById = async (req, res) => {
  try {
    const { _id } = req.body;
    const orders = await Order.find({ _id: _id });
    res.status(200).json({
      success: true,
      order: orders,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    console.log(req.body);
    const { _id, status } = req.body;

    // Check if _id is provided
    if (!_id) {
      return res.status(400).json({
        success: false,
        message: "Order Id is a required field",
      });
    }

    // Check if status is provided and is a valid value
    const validStatuses = ["In Progress", "Completed"];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // Update the order
    const response = await Order.findByIdAndUpdate(
      _id,
      { status: status },
      { new: true, runValidators: true } // runValidators ensures the schema validation is applied
    );

    // Check if the order was found and updated
    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    console.log("Order updated successfully:", response);

    res.status(200).json({
      success: true,
      message: "Order updated successfully!",
      order: response,
    });
  } catch (err) {
    console.error("Error updating order:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};




exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.body;
    const order = await Order.find({ _id: id });

    if (order?.length == 0) {
      return res.status(200).json({
        success: false,
        message: "Order Not Found",
      });
    }

    const response = await Order.findByIdAndDelete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
