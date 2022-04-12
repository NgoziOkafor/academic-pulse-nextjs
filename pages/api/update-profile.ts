import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSessionByToken } from '../../util/database';

export default async function updateProfile(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const prisma = new PrismaClient({ log: ['query'] });
  const firstname = request.body.firstname;
  const lastname = request.body.lastname;
  const userId = request.body.id;
  const token = request.headers.authorization;
  if (token) {
    const session = await getSessionByToken(token);
    if (session) {
      if (session.userId !== userId) {
        relocate();
      }
      const expiryTime = session.expiry_timestamp.getTime();
      const now = new Date().getTime();
      if (expiryTime < now) {
        relocate();
      } else {
        const update = await prisma.user.update({
          where: {
            id: session.userId,
          },
          data: {
            firstname: firstname,
            lastname: lastname,
          },
        });
        await prisma.$disconnect();
        console.log(update);
        response.status(200);
        response.json({
          status: 'success',
          message: 'profile updated',
          user: update,
        });
      }
    } else {
      relocate();
    }
  } else {
    relocate();
  }
  console.log(request);
  response.status(200);
  response.json({ feedback: token });
  return;
}

export function relocate() {
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  };
}
