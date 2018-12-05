import Rent from "../models/rent";
import Car from "../models/car";
import User from "../models/user";

export async function findRents(req, res) {
  try {
    const rents = await Rent.find();
    return res.status(200).send(rents);
  } catch (err) {
    res.status(500).send({ message: "Error on find rents." });
  }
}

export async function findRent(req, res) {
  const { rentId } = req.params;
  try {
    const rent = await Rent.findById(rentId).populate(["user", "car"]);
    return res.status(200).send(rent);
  } catch (err) {
    res.status(500).send({ message: "Error on find Rent." });
  }
}

export async function findRentByUser(req, res) {
  const { userId } = req.params;
  try {
    const rents = await Rent.find({ user: userId }).populate(["user", "car"]);
    return res.status(200).send(rents);
  } catch (err) {
    res.status(500).send({ message: "Error on find Rent." });
  }
}

export async function saveRent(req, res) {
  const { user, car } = req.body;
  try {
    const users = await User.findById(user);

    if (!users) return res.status(400).send({ message: "User Not Found." });

    let cars = await Car.findById(car);

    if (!cars.avaliable)
      return res.status(400).send({ message: "Car Not Avaliable." });

    const rent = await Rent.create({ user, car });

    cars.avaliable = false;

    await cars.save();

    return res.status(200).send(rent);
  } catch (err) {
    res.status(500).send({ message: err });
  }
}

export async function finalizeRent(req, res) {
  const { _id } = req.body;
  try {
    let rent = await Rent.findById(_id);

    if (!rent) return res.status(400).send({ message: "Rent Not Found." });

    let car = await Car.findById(rent.car);

    if (!car) return res.status(400).send({ message: "Car Not Found." });

    car.avaliable = true;

    await car.save();

    rent.active = false;
    rent.updatedAt = Date.now();

    await rent.save();

    return res.status(200).send(rent);
  } catch (err) {
    res.status(500).send({ message: err });
  }
}
