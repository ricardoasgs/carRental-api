import User from "../models/user";

export async function project(req, res) {
  res.status(200).send({ ok: true, id: req.userId });
}

export async function findProfile(req, res) {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    return res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: "Error on find user." });
  }
}
