import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function getUsers() {
    const users = await prisma.user.findMany(); // user yerine doğru model adını kullandığınızdan emin olun
    return users;
}
