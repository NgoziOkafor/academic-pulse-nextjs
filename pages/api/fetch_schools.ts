import { PrismaClient } from '@prisma/client';

export default function SchoolFetch() {
  const prisma = new PrismaClient({ log: ['query'] });
  const getSchool = async () => {
    const schools = await fetch(`http://universities.hipolabs.com/search?`, {
      method: 'GET',
    });
    const feedback = await schools.json();
    console.log(feedback);

    for (let i = 0; i < feedback.length; i++) {
      const school = feedback[i];
      const university = await prisma.university.create({
        data: {
          name: school.name,
          website: school.domains[0],
          slug: school.name.replaceAll(' ', '_'),
          country: school.country,
        },
      });
      console.log(university);
    }
  };

  const schoolList = getSchool();
  const close = prisma.$disconnect();
  console.log(schoolList);
  return;
}
