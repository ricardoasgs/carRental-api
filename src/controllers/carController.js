import Car from "../models/car";

export async function findCar(req, res) {
  const { carId } = req.params;
  try {
    const car = await Car.findById(carId);
    return res.status(200).send(car);
  } catch (err) {
    res.status(500).send({ message: "Error on find car." });
  }
}

export async function saveCar(req, res) {
  const { model, year, type, color } = req.body;
  try {
    const car = await Car.create(model, year, type, color);
    return res.status(200).send(car);
  } catch (err) {
    res.status(500).send({ message: "Error on create car." });
  }
}

export async function updateCar(req, res) {
  const { _id, avaliable } = req.body;
  try {
    const car = await Car.findById(_id);

    if (!car) return res.status(400).send({ message: "Car Not Found." });

    car.avaliable = avaliable;

    await car.save();

    return res.status(200).send(car);
  } catch (err) {
    res.status(500).send({ message: "Error on update car." });
  }
}
