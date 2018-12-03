import Rent from "../models/rent";
import CarController from "../controllers/carController";
import UserController from "../controllers/userController";

export async function saveRent(req, res) {
  const { userId, carId } = req.body;
  try {
    const user = UserController.findProfile(req, res);

    if (!user) return res.status(400).send({ message: "User Not Found." });

    const car = CarController.findCar(req, res); //talvez usar let

    if (!car) return res.status(400).send({ message: "Car Not Found." });

    const rent = await Rent.create(userId, carId);

    car.avaliable = false;

    await car.save();

    return res.status(200).send(rent);
  } catch (err) {
    res.status(500).send({ message: "Error on create rent." });
  }
}

export async function finalizeRent(req, res) {
  const { _id } = req.body;
  try {
    const rent = await Rent.findById(_id);

    if (!rent) return res.status(400).send({ message: "Rent Not Found." });

    const car = CarController.findCar(req, res); //talvez usar let

    if (!car) return res.status(400).send({ message: "Car Not Found." });

    car.avaliable = avaliable;

    await car.save();

    rent.active = false;
    rent.updatedAt = Date.now();

    await rent.save();

    return res.status(200).send(rent);
  } catch (err) {
    res.status(500).send({ message: "Error on update rent." });
  }
}
