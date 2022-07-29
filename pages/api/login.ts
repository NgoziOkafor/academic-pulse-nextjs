import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import { createSerializedCookie } from '../../util/cookie';
import {
  checkSession,
  createSession,
  deleteSession,
  getUserByEmail,
} from '../../util/database';

export default async function login(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const error: { id: number; message: string }[] = [];
  const email = request.body.email;
  const password = request.body.password;

  // get user with requested email
  const checkEmail = await getUserByEmail(email);
  if (checkEmail === null) {
    error.push({
      id: error.length + 1,
      message: 'incorrect login details',
    });
    response.status(200);
    response.json({ error: error });
    return;
  }
  // compare passwordHash
  const passwordMatches = await bcrypt.compare(password, checkEmail.password);
  if (!passwordMatches) {
    error.push({
      id: error.length + 1,
      message: 'incorrect login details',
    });
    response.status(200);
    response.json({ error: error });
    return;
  }
  // create unique token
  const sessionToken = crypto.randomBytes(90).toString('base64');
  console.log(sessionToken);

  const check = checkSession(checkEmail.id);
  if (Object.keys(check).length > 0) {
    await deleteSession(checkEmail.id);
  }

  const session = await createSession(sessionToken, checkEmail.id);

  // create a serializedCookie using the unique token
  const serializedCookie = await createSerializedCookie(sessionToken);
  response.status(201).setHeader('Set-Cookie', serializedCookie).json({
    user: checkEmail,
    error: error,
    status: 'success',
  });

  return;
}
