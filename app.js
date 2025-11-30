if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const Path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const wrapAsync = require("./utils/wrapAsync.js");
const { listingSchema, reviewSchema } = require("./schema.js"); //for server side validation
// const Reviews = require("./models/review.js"); // require review
const listingRouter = require("./routes/listing.js"); // require listing
const reviewRouter = require("./routes/review.js"); // require reviews
const userRouter = require("./routes/user.js");

const session = require("express-session");
const MongoStore = require("connect-mongo");

const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

// const MONGO_URL = "mongodb://127.0.0.1/wander";
const dbURL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(dbURL);
}

app.set("view engine", "ejs");
app.set("views", Path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method")); // (_method) method ko use krne wale he
app.engine("ejs", ejsMate);
app.use(express.static(Path.join(__dirname, "/public")));

//
const store = MongoStore.create({
  mongoUrl: dbURL,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.log("ERROR in mongo session store", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // after this time session will end
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true, // // prevent fron cross scripting attack
  },
};

// Root route
// app.get("/", (req, res) => {
//   res.send("hi, i am root");
// });

app.use(session(sessionOptions));
app.use(flash()); // use flash before route

//Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

// Use local strategy for authentication
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  // middleware
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//demo user

// app.get("/demouser", async (req, res) => {
//   let fakeUser = new User({
//     email: "student@gmail.com",
//     username: "delta-student",
//   });

//   let registeredUser = await User.register(fakeUser, "helloworld");
//   res.send(registeredUser);
// });
// validate listing
// validate listing as a middleware jo ki uper likha he ...leave this topic right now check after view time

app.use("/listings", listingRouter); //this single line handle all listing related request

app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// if request not match with any of the route
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "page Not Found!"));
});

// middleware to handle error
// app.use((err, req, res, next) => {
//   const { statusCode = 500, message = "something went wrong!" } = err;
//   res.status(statusCode).send(message);
// });

// middleware to handle error form express template
app.use((err, req, res, next) => {
  // Always log the real error details in console for developers
  console.error("🔥 ERROR:", err);
  // Extract safe info for user
  const { statusCode = 500, message = "Something went wrong!" } = err;
  // Render user-friendly error page
  res.status(statusCode).render("error", { statusCode, message, err });
});

// ✅ Fixed test route
// app.get("/testlisting", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach", // ✅ changed "Description" → "description"
//     price: 1200,
//     location: "Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("successful testing of Listing model");
// });

// start the server

//

//
app.listen(8080, () => {
  console.log("server is listening to port 8080");
});
