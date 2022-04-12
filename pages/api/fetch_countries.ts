import { PrismaClient } from '@prisma/client';

export default function countryFetch() {
  const prisma = new PrismaClient({ log: ['query'] });
  const getcountry = async () => {
    const countries = await fetch(`https://restcountries.com/v3.1/all`, {
      method: 'GET',
    });
    const feedback = await countries.json();
    console.log(feedback);

    for (let i = 0; i < feedback.length; i++) {
      const country = feedback[i];
      const nation = await prisma.country.create({
        data: {
          name: country.name.common,
          shortName: country.cca2,
        },
      });
    }
  };
  const close = prisma.$disconnect();
  const pickCountry = getcountry();
  console.log(pickCountry);
  return;
}
