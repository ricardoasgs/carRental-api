import mongoose from "../database";
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  model: {
    type: String,
    require: true
  },
  year: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  color: {
    type: String,
    require: true
  },
  avaliable: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Car = mongoose.model("Car", CarSchema);

export default Car;
