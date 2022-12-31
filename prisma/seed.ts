import { PrismaClient } from "@prisma/client";
//
import users from "./seed-data/users";
import applicants from "./seed-data/applicants";
import assets from "./seed-data/assets";
import departments from "./seed-data/departments";
//
import { assetAssignments, departmentTopReports } from "./seed-data/";

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

  const newApplicants = await Promise.all(
    applicants.map(async ({ name, email }) => {
      const data = await prisma.applicant.create({
        data: {
          name,
          email,
        },
      });
    })
  );

  /*
   * CREATE DEPARTMENTS AND DIVISIONS
   */

  newUsers &&
    departments.forEach(async (department) => {
      const topReport = departmentTopReports[department.name] ?? null;
      const topReportId: any = newUsers.find(
        (user) => user.email === topReport
      )?.id;

      await prisma.department.create({
        data: {
          ...department,
          topReportId,
        },
      });
    });

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
