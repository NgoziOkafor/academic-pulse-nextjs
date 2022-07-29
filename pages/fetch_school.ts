import { PrismaClient } from '@prisma/client';

export default function fetchSchools() {
  const prisma = new PrismaClient({ log: ['query'] });
  const getSchools = async () => {
    const response = await fetch(`http://universities.hipolabs.com/search?`);
    const data = await response.json();

    for (let i = 0; i < data.length; i++) {
      const school = data[i];
      const country = school.country;
      const name = school.name;
      const domains = school.domains[0];
      const slug = name.replaceAll(' ', '_');
      console.log(name);
      const university = prisma.university.create({
        data: {
          name: name,
          website: domains,
          slug: slug,
          country: country,
        },
      });
    }
    return 'completed';
  };

  const pickSchool = getSchools();
  const close = prisma.$disconnect();
  console.log(pickSchool);
  return 'done';
}
