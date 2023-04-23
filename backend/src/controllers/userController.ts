import { RequestHandler } from 'express';
import { hashSync, genSaltSync, compareSync } from 'bcrypt';
import validator from 'validator';
import env from '../utils/envalid';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User';

const createToken = (_id: mongoose.Types.ObjectId) => {
  return jwt.sign({ _id }, env.SECRET, { expiresIn: '3d' });
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ err: 'Please Fill in All Fields' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ err: 'Email not Found' });
  }

  const match = compareSync(password, user.password);
  if (!match) {
    return res.json({ err: 'Incorrect Password' });
  }

  const token = createToken(user._id);

  return res.json({ email, token });
};

export const signUp: RequestHandler = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !username || !password) {
    return res.status(400).json({ err: 'Please Fill in All Fields' });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ err: 'Invalid Email' });
  }
  if (!validator.isStrongPassword(password)) {
    return res.status(400).json({ err: 'Password not Strong Enough' });
  }

  const duplicate = await User.findOne({ email });
  if (duplicate) {
    return res.status(409).json({ err: 'Email Already Taken' });
  }

  const salt = genSaltSync(10);
  const hash = hashSync(password, salt);

  try {
    const user = await User.create({ email, username, password: hash });

    // create jwt token
    const token = createToken(user._id);

    return res.json({ email, token });
  } catch (err) {
    return res.json({ err });
  }
};
