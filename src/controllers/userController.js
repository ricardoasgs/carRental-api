import User from "../models/user";

export async function project(req, res) {
  res.status(200).send({ ok: true, id: req.userId });
}

export async function findProfile(req, res) {
  const { idProfile } = req.params;
  try {
    const user = await User.findById(idProfile);
    return res.status(200).send({ user });
  } catch (err) {
    res.status(500).send({ message: "Error on find user." });
  }
}
