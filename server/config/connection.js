const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://elena:Texas0905%2A@sasquest.9bxy1tc.mongodb.net/sasquest"
);
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sasquest"
// );

// ("mongodb+srv://elena:Texas0905%2A@sasquest.9bxy1tc.mongodb.net");

// mongoose
//   .connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log("Connected to MongoDB");
//   })
//   .catch((err) => {
//     console.error("Error connecting to MongoDB:", err.message);
//   });

module.exports = mongoose.connection;
