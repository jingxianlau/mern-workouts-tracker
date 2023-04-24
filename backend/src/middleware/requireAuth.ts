import { RequestHandler } from 'express';
import jwt, { Jwt } from 'jsonwebtoken';
import env from '../utils/envalid';
import User from '../models/User';

interface JwtPayload {
  _id: string;
}

const requireAuth: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Authorization Token Required' });
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, env.SECRET);

    const { _id } = decoded as JwtPayload;
    const user = User.findOne({ _id });
    if (!user) {
      return res.status(401).json({ err: 'Request is not Authorized' });
    }

    next();
    return;
  } catch (err) {
    console.log(err);
    return res.status(401).json({ err: 'Request is not Authorized' });
  }
};

export default requireAuth;
