import express from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../models/user";
import authJson from "../config/auth.json";

function _generateToken(params = {}) {
  return jwt.sign(params, authJson.secret, { expiresIn: 86400 });
}

export async function signup(req, res) {
  const { email } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ message: "User already exists." });
    }

    const user = await User.create(req.body);
    user.password = undefined;

    return res
      .status(201)
      .send({ user, token: _generateToken({ id: user.id }) });
  } catch (err) {
    return res.status(500).send({ message: "Registration failed." });
  }
}

export async function signin(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).send({ message: "User not found." });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(400).send({ message: "Invalid password." });
  }

  user.password = undefined;

  res.send({ user, token: _generateToken({ id: user.id }) });
}
