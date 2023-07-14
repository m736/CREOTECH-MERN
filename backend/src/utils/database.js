const dotenv = require("dotenv");
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error: ", err));

mongoose.Promise = global.Promise;
