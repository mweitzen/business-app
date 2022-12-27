import { PrismaClient } from "@prisma/client";
import { assets, users, assetAssignments } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  /*
   * CREATE USERS
   */
  const newUsers = await Promise.all(
    users.map(async (user) => {
      const data = await prisma.user.create({
        data: user,
      });
      return data;
    })
  );

  /*
   * CREATE ASSETS AND ASSIGN USERS
   */
  newUsers &&
    assets.forEach(async (asset) => {
      const assignedTo = assetAssignments[asset.name] ?? null;

      if (assignedTo) {
        await prisma.asset.create({
          data: {
            ...asset,
            status: "assigned",
            assignedTo: {
              connect: {
                email: assignedTo,
              },
            },
            ownerHistory: {
              create: {
                owner: {
                  connect: {
                    email: assignedTo,
                  },
                },
              },
            },
            // creating dummy purchase at the moment
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
      } else {
        await prisma.asset.create({
          data: {
            ...asset,
            // creating dummy purchase at the moment
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
      }
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
