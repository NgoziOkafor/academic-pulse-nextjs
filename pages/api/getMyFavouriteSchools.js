import { PrismaClient } from '@prisma/client';

export default async function getMyFavouriteSchools(req, res) {
  const prisma = new PrismaClient({ log: ['query'] });
  // const getSchool = async () => {
  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(req.headers.user_id),
    },
  });

  const favourites = await prisma.favourite.findMany({
    where: {
      userId: user != null ? user.id : 0,
    },
    select: {
      universityId: true,
    },
  });

  console.log(favourites);
  let favArray = [];
  for (let i = 0; i < favourites.length; i++) {
    favArray.push(favourites[i].universityId);
  }
  const universities = await prisma.university.findMany({
    where: {
      id: { in: favArray },
    },
  });
  await prisma.$disconnect();
  // return universitites
  // console.log(universitites)
  // };
  try {
    res.status(200);
    res.json(universities);
  } catch (e) {
    res.status(500);
    res.json({ error: 'Unable to save to database' });
  } finally {
    await prisma.$disconnect();
  }
  /* console.log(req.body); */
  res.json({ user: 'saved', method: req.method });
  return;
}
