const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const bookingController = require("../controller/booking.js");
const { isLoggedIn, validateBooking } = require("../middleware.js");

router.post(
  "/",
  isLoggedIn,
  validateBooking,
  wrapAsync(bookingController.createBooking)
);

module.exports = router;
