import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: ['query'] });

export async function getUserByEmail(email: string) {
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  await prisma.$disconnect();
  return checkEmail;
}

export async function createSession(token: string, userId: number) {
  const session = await prisma.session.create({
    data: {
      token: token,
      userId: userId,
    },
  });
  await prisma.$disconnect();
  return session;
}
export async function deleteSession(userId: number) {
  const removeSession = await prisma.session.delete({
    where: {
      userId: userId,
    },
  });
  await prisma.$disconnect();
  return removeSession;
}
export async function deleteSessionByToken(token: string) {
  const removeSession = await prisma.session.delete({
    where: {
      token: token,
    },
  });
  await prisma.$disconnect();
  return removeSession;
}

export async function checkSession(userId: number) {
  const check = await prisma.session.findFirst({
    where: {
      userId: userId,
    },
  });
  await prisma.$disconnect();
  return check;
}

export async function getSessionByToken(token: string) {
  const session = await prisma.session.findFirst({
    where: {
      token: token,
    },
  });
  await prisma.$disconnect();
  return session;
}
export async function getUserById(id: number) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  await prisma.$disconnect();
  return user;
}
