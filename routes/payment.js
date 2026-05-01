const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order/:id", isLoggedIn, async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }

  const order = await razorpay.orders.create({
    amount: listing.price * 100,
    currency: "INR",
  });

  res.json({ order });
});

router.post("/verify", (req, res) => {
  res.json({ success: true });
});

module.exports = router;
