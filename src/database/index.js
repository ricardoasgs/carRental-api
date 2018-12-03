import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://admin:admin123@ds123834.mlab.com:23834/car-rental");
mongoose.connection
  .once("open", () => console.log("Connected to mongo at localhost instance."))
  .on("error", error =>
    console.log("Error connecting to mongo local host:", error)
  );

export default mongoose;
