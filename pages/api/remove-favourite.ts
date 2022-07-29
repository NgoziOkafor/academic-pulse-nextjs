import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getSchools(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const prisma = new PrismaClient({ log: ['query'] });
  const user = await prisma.user.findFirst({
    where: {
      id: req.body.user_id,
    },
  });
  const searchParams = req.body;
  const schoolId = searchParams.school_id;

  const remove = await prisma.favourite.deleteMany({
    where: {
      userId: user != null ? user.id : 0,
      universityId: schoolId,
    },
  });
  const favourite = await prisma.favourite.findMany({
    where: {
      userId: user != null ? user.id : 0,
    },
    select: {
      universityId: true,
    },
  });
  const list = [];
  for (let i = 0; i < favourite.length; i++) {
    list.push(favourite[i].universityId);
  }
  await prisma.$disconnect();
  res.status(200);
  res.json({
    status: 'school added to favourite',
    favourite: list,
  });
  return;
}
