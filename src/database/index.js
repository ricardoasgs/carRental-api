import mongoose from "mongoose";

mongoose.Promise = global.Promise;
mongoose.connect("");
mongoose.connection
  .once("open", () => console.log("Connected to mongo at localhost instance."))
  .on("error", error =>
    console.log("Error connecting to mongo local host:", error)
  );

export default mongoose;
