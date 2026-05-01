const Listing = require("../models/listing");

// Keywords used by the icon filters on the listings index page.
const categoryKeywords = {
  trending: ["trending", "popular", "luxury", "villa", "amazing", "cozy"],
  mountain: ["mountain", "hill", "hills", "manali", "snow", "cabin"],
  room: ["room", "apartment", "flat", "studio", "stay"],
  forest: ["forest", "tree", "trees", "jungle", "woods", "pine"],
  cities: ["city", "cities", "urban", "delhi", "mumbai", "bangalore", "jaipur"],
  river: ["river", "lake", "water", "beach", "sea", "maldives"],
  castles: ["castle", "fort", "palace", "heritage"],
  pool: ["pool", "swimming", "resort", "villa"],
  camping: ["camp", "camping", "tent", "outdoor"],
  farms: ["farm", "farms", "farmhouse", "tractor"],
  desert: ["desert", "sand", "rajasthan", "jaisalmer"],
  ancient: ["ancient", "temple", "heritage", "orchha", "historic"],
};

// Creates a MongoDB text-style filter across listing fields.
const buildTextSearchFilter = (terms) => {
  const regexes = terms.map((term) => {
    const escapedTerm = term.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(escapedTerm, "i");
  });

  return {
    $or: regexes.flatMap((regex) => [
      { title: regex },
      { description: regex },
      { location: regex },
      { country: regex },
    ]),
  };
};

// Show all listings
module.exports.index = async (req, res) => {
  const { search, category } = req.query;
  let filter = {};

  if (search && search.trim()) {
    // Navbar search gets first priority when both search and category exist.
    filter = buildTextSearchFilter([search]);
  } else if (category && categoryKeywords[category]) {
    // Icon filter uses predefined keywords because listings do not have a category field.
    filter = buildTextSearchFilter(categoryKeywords[category]);
  }

  const allListings = await Listing.find(filter);
  res.render("listings/index.ejs", {
    allListings,
    search: search || "",
    category: category || "",
  });
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
    .populate({
      path: "bookings",
      populate: { path: "user" },
      options: { sort: { createdAt: -1 } },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested does not exist!");
    return res.redirect("/listings");
  }

  // res.render("listings/show.ejs", { listing });
  res.render("listings/show.ejs", {
    listing,
    razorpayKey: process.env.RAZORPAY_KEY_ID,
    userBooking: req.user
      ? listing.bookings.find((booking) => booking.user && booking.user._id.equals(req.user._id))
      : null,
  });
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
