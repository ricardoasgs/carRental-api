import mongoose from "../database";
const Schema = mongoose.Schema;

const RentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    require: true
  },
  active: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

const Rent = mongoose.model("Rent", RentSchema);

export default Rent;
