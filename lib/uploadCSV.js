const fs = require('fs');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const data = [];

  // Change this to the path to your CSV file
  const csvFilePath = './public/data.csv';

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      data.push(row);
    })
    .on('end', async () => {
      for (const row of data) {
        const projectTitle = row['Project.Title'];

        // Check if the project already exists
        const existingProject = await prisma.project.findUnique({
          where: { project_Title: projectTitle },
        });

        if (existingProject) {
          console.log(`Project "${projectTitle}" already exists. Skipping.`);
        } else {
          const projectTechs = new Map();
          const frontendTechs = new Map();
          const backendTechs = new Map();
          const databaseTechs = new Map();
          const infrastructureTechs = new Map();

          // Process and upsert frontend technologies
          const frontendTechNames = extractNames(row['Technical_Skillset.Frontend']);
          for (const name of frontendTechNames) {
            if (!frontendTechs.has(name)) {
              const tech = await prisma.frontendTech.upsert({
                where: { name },
                create: { name },
                update: {},
              });
              frontendTechs.set(name, tech);
            }
          }

          // Process and upsert backend technologies
          const backendTechNames = extractNames(row['Technical_Skillset.Backend']);
          for (const name of backendTechNames) {
            if (!backendTechs.has(name)) {
              const tech = await prisma.backendTech.upsert({
                where: { name },
                create: { name },
                update: {},
              });
              backendTechs.set(name, tech);
            }
          }

          // Process and upsert project technologies
          const projectTechNames = extractNames(row['Project.Technologies']);
          for (const name of projectTechNames) {
            if (!projectTechs.has(name)) {
              const tech = await prisma.projectTech.upsert({
                where: { name },
                create: { name },
                update: {},
              });
              projectTechs.set(name, tech);
            }
          }

          // Process and upsert project databases
          const databaseTechNames = extractNames(row['Technical_Skillset.Databases']);
          for (const name of databaseTechNames) {
            if (!databaseTechs.has(name)) {
              const tech = await prisma.projectDatabase.upsert({
                where: { name },
                create: { name },
                update: {},
              });
              databaseTechs.set(name, tech);
            }
          }

          // Process and upsert project infrastructure
          const infrastructureTechNames = extractNames(row['Technical_Skillset.Infrastructre']);
          for (const name of infrastructureTechNames) {
            if (!infrastructureTechs.has(name)) {
              const tech = await prisma.projectInfrastructure.upsert({
                where: { name },
                create: { name },
                update: {},
              });
              infrastructureTechs.set(name, tech);
            }
          }

          // Create the project
          const project = await prisma.project.create({
            data: {
              project_Title: projectTitle,
              otherInfo: row['Other_Information.Availability'],
              frontend_Tech: {
                connect: [...frontendTechs.values()].map((tech) => ({ id: tech.id })),
              },
              backend_Tech: {
                connect: [...backendTechs.values()].map((tech) => ({ id: tech.id })),
              },
              project_tech: {
                connect: [...projectTechs.values()].map((tech) => ({ id: tech.id })),
              },
              project_database: {
                connect: [...databaseTechs.values()].map((tech) => ({ id: tech.id })),
              },
              project_infrastructure: {
                connect: [...infrastructureTechs.values()].map((tech) => ({ id: tech.id })),
              },
            },
          });

          console.log(`Uploaded project: ${project.project_Title}`);
        }
      }

      await prisma.$disconnect();
    });
}

function extractNames(namesString) {
  if (namesString) {
    return namesString.split(',').map((name) => name.trim());
  }
  return [];
}

main()
  .catch((error) => {
    throw error;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
