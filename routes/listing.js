const express = require("express");
const router = express.Router(); //creates new router object
// require file from app.js
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js"); //for server side validation
const Listing = require("../models/listing.js"); // ✅ renamed testlisting → Listing

// error ko validate krna  jo ki  joi se ho agr neche use kr rhe  hm post route me
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
  })
);

// new route
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

// show route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  })
);

// Create Route👽

// error handling using wrapAsync👌
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res, next) => {
    // if (!req.body.listing) {
    //   // req  me koi body nhi huye to ye send ho jayega
    //   throw new ExpressError(400, "send valid data for listing");
    // }

    // validate using joi

    // if we use this as a middleware then we create middleware for this above {under the root route}

    const newListing = new Listing(req.body.listing); //instance of listing(req ki body se listing object ko niklana)
    await newListing.save(); //insert this document into MongoDB.”
    res.redirect("/");
  })
);

// Edit Route

router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id); //particular listing ko find kr liya
    res.render("/edit.ejs", { listing });
  })
);

// update Route
router.put(
  "/:id/",
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "send valid data for listing");
    }

    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //req.body.listing javascipt ki object he jiske andar sare ke sare parameter he
    res.redirect(`/listings/${id}`); //redirect to show route
  })
);

// delete route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id); //this is also call the post mongoose middle ware
    console.log("delete listing" + deleteListing);
    res.redirect("/listings");
  })
);

module.exports = router;
