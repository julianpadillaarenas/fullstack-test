import { PrismaClient } from '../../generated/prisma/client';

const prisma = new PrismaClient();

const primitiveUsers = [
  { id: "b21825dc-c336-4c92-a688-0d19cbf05d2b", name: "user1", email: "user1@gmail.com" },
  { id: "39f91b61-e145-452a-bbb3-00f7e75f7595", name: "user2", email: "user2@gmail.com" },
  { id: "71ef5cdf-a179-4994-94e2-f28ba3b270da", name: "user3", email: "user3@gmail.com" },
  { id: "36d5c174-05a7-4d15-b676-3465b45b36c6", name: "user4", email: "user4@gmail.com" },
  { id: "3918c8d9-140a-4dc1-be07-a53b06c46b96", name: "user5", email: "user5@gmail.com" },
];

async function main() {
  for (const u of primitiveUsers) {
    await prisma.user.upsert({
      where: { id: u.id },
      update: { name: u.name, email: u.email },
      create: { id: u.id, name: u.name, email: u.email },
    });
  }
  console.log('Seed users inserted');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
