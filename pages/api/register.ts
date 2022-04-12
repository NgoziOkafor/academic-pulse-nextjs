import crypto from 'node:crypto';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedCookie } from '../../util/cookie';
import { createSession, getUserByEmail } from '../../util/database';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // console.log(req.body);

  const prisma = new PrismaClient({ log: ['query'] });

  try {
    const userInfo = req.body;

    const error = [];

    const checkEmail = await getUserByEmail(userInfo.email);

    if (checkEmail != null) {
      error.push({
        id: error.length + 1,
        message: 'Email already exists',
      });
    }

    if (userInfo.password !== userInfo.cpassword) {
      error.push({
        id: error.length + 1,
        message: 'Password mismatch!',
      });
    }

    if (error.length > 0) {
      res.status(200);
      res.json({ error: error });
    } else {
      const hashedPassword = await bcrypt.hash(userInfo.password, 12);
      const user = await prisma.user.create({
        data: {
          email: userInfo.email,
          password: hashedPassword,
          firstname: userInfo.firstname,
          lastname: userInfo.lastname,
          password_reset_code: Date.now().toString(),
        },
      });
      await prisma.$disconnect();
      // create unique token
      const sessionToken = crypto.randomBytes(90).toString('base64');
      console.log(sessionToken);

      const session = await createSession(sessionToken, user.id);

      // create a serializedCookie using the unique token
      const serializedCookie = await createSerializedCookie(sessionToken);
      res.status(201).setHeader('Set-Cookie', serializedCookie).json({
        user: user,
        error: error,
        status: 'success',
      });
      res.status(200);
      res.json({
        message: 'successful',
        error: error,
      });
    }
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to save to database' });
  } finally {
    await prisma.$disconnect();
  }
  console.log(req.body);
  res.json({ user: 'saved', method: req.method });
  return;
}
