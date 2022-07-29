import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function search(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const prisma = new PrismaClient({ log: ['query'] });

  const searchParams = req.body;
  const result: any = [];

  try {
    if (searchParams.q || searchParams.country) {
      //   let q = searchParams.q;

      //   q = q.toLowerCase().replace(/\b[a-z]/g, function (letter = '') {
      //     return letter.toUpperCase();
      //   });
      const country = searchParams.country;

      if (country === '') {
        res.status(200);
        res.json({ error: 'no country passed' });
      }
      const universities = await prisma.university.deleteMany({
        where: {
          country: {
            contains: country,
          },
        },
      });

      res.status(200);
      res.json({ msg: 'deleted' });
    } else {
      console.log('no query passed');
      res.status(200);
      res.json(result);
    }
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to save to database' });
  } finally {
    await prisma.$disconnect();
  }

  res.json({ user: 'saved', method: req.method });
  return;
}
