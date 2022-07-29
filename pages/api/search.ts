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
      let q = searchParams.q;

      q = q.toLowerCase().replace(/\b[a-z]/g, function (letter = '') {
        return letter.toUpperCase();
      });
      const country = searchParams.country;

      if (q === '' && country === '') {
        res.status(200);
        res.json(country);
      }
      const universities = await prisma.university.findMany({
        where: {
          name: {
            contains: q,
          },
          country: {
            contains: country,
          },
        },
      });
      await prisma.$disconnect();
      for (let i = 0; i < universities.length; i++) {
        result.push(universities[i]);
      }
      res.status(200);
      res.json(result);
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
