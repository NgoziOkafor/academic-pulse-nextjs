import { PrismaClient } from '@prisma/client';

export default async function getFavourite(req, res) {
  const prisma = new PrismaClient({ log: ['query'] });

  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(req.headers.user_id),
    },
  });

  // const getSchool = async () => {

  const favourites = await prisma.favourite.findMany({
    where: {
      userId: user != null ? user.id : 0,
    },
    select: {
      universityId: true,
    },
  });
  let list = [];
  for (let i = 0; i < favourites.length; i++) {
    list.push(favourites[i].universityId);
  }
  await prisma.$disconnect();
  try {
    res.status(201);
    res.json(list);
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to fetch favourites' });
  } finally {
    await prisma.$disconnect();
  }
  console.log(req.body);
  res.json({ user: 'saved', method: req.method });
  return;
}
