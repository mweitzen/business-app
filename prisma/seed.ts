import { assets, users } from "./seed-data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newUsers = users.map(async (user) => {
    const data = await prisma.user.create({
      data: user,
    });
    return data;
  });

  assets.forEach(async (asset) => {
    await prisma.asset.create({
      data: {
        ...asset,
        purchase: {
          create: {
            orderNumber: "",
            purchaseDate: new Date(),
            purchasePrice: 300,
            purchasedFrom: "amazon.com",
          },
        },
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
