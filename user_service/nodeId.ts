const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function resetUserIdSequence() {
  await prisma.$executeRawUnsafe(`
    SELECT setval(
      'User_id_seq', 
      COALESCE((SELECT MAX(id) FROM "User"), 1), 
      false
    );
  `);
  console.log("User ID sequence reset successfully!");
}

resetUserIdSequence()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

