const Listing = require("../models/listing");

// Show all listings
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// Render new form
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show listing
module.exports.showListing = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};

// Create
module.exports.createListing = async (req, res) => {
  try {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    if (req.file) {
      newListing.image = {
        url: req.file.path,
        filename: req.file.filename,
      };
    } else {
      newListing.image = {
        url: "",
        filename: "",
      };
    }

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  } catch (err) {
    console.log("CREATE ERROR:", err);
    req.flash("error", "Error creating listing");
    res.redirect("/listings");
  }
};

// Edit form
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;

  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = null;

  // Image exists?
  if (listing.image && listing.image.url) {
    const url = listing.image.url;

    // Cloudinary URLs always contain "/upload/"
    if (url.includes("/upload/")) {
      originalImageUrl = url.replace("/upload/", "/upload/w_250/");
    } else {
      // fallback (no transformation)
      originalImageUrl = url;
    }
  }

  // Pass safely to EJS
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
  });

  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// Delete
module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;

  await Listing.findByIdAndDelete(id);

  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
