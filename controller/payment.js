const Razorpay = require("razorpay");
const Booking = require("../models/booking");
const Listing = require("../models/listing");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports.createOrder = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  const order = await razorpay.orders.create({
    amount: listing.price * 100,
    currency: "INR",
  });

  res.json({ order });
};

module.exports.verifyPayment = async (req, res) => {
  res.json({ success: true });
};
