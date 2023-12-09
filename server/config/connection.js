const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb+srv://elena:Texas0905%2A@sasquest.9bxy1tc.mongodb.net/sasquest"
);
// mongoose.connect(
//   process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/sasquest"
// );

// ("mongodb+srv://elena:Texas0905%2A@sasquest.9bxy1tc.mongodb.net");

module.exports = mongoose.connection;
