import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getSchools(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const prisma = new PrismaClient({ log: ['query'] });

  const universitites = await prisma.university.findMany({
    take: 12,
  });
  await prisma.$disconnect();
  try {
    const schools = universitites;

    res.status(201);
    res.json(schools);
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to save to database' });
  } finally {
    await prisma.$disconnect();
  }

  res.json({ user: 'saved', method: req.method });
  return;
}
