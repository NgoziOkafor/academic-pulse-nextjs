import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getCountries(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const prisma = new PrismaClient({ log: ['query'] });

  const countries = await prisma.country.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  try {
    const nations = countries;

    res.status(201);
    res.json({ response: nations });
    await prisma.$disconnect();
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to save to database' });
  } finally {
    await prisma.$disconnect();
    res.json({ user: 'saved', method: req.method });
  }
  return;
}
