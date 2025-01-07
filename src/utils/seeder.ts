import { prismaClient } from "./prismaClient";
import bcrypt from "bcrypt";

async function main() {
  console.log("Seeding...");
  await Promise.all([
    prismaClient.user.create({
      data: {
        name: "user",
        email: "user@gmail.com",
        password: await bcrypt.hash("rahasia", 10),
      },
    }),
  ]);
  console.log("Seeding completed!");
}

main()
  .then(async () => {
    await prismaClient.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClient.$disconnect();
    process.exit(1);
  });
