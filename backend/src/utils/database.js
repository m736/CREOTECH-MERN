const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://0.0.0.0:27017/monprojectWee", {
    useNewUrlParser: "true",
    useUnifiedTopology: "true",
  })
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("Database connection error: ", err));

mongoose.Promise = global.Promise;
