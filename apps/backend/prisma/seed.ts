import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

async function main() {
  const users = Array.from({ length: 10 }).map(() => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    bio: faker.lorem.sentence(),
    avatar: faker.image.avatar(),
  }));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  await prisma.user.createMany({
    data: users,
  });

  const posts = Array.from({ length: 10 }).map(() => ({
    title: faker.lorem.sentence(),
    slug: generateSlug(faker.lorem.sentence()),
    content: faker.lorem.paragraph(3),
    thumbnail: faker.image.urlLoremFlickr(),
    authorId: faker.number.int({ min: 1, max: 10 }),
    published: true,
  }));

  await Promise.all(
    posts.map(async (p) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      await prisma.post.create({
        data: {
          ...p,
          comments: {
            createMany: {
              data: Array.from({ length: 20 }).map(() => ({
                content: faker.lorem.sentence(),
                authorId: faker.number.int({ min: 1, max: 10 }),
              })),
            },
          },
        },
      });
    }),
  );

  console.log('seeding completed successfully!');
}

main()
  .then(async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await prisma.$disconnect();
    process.exit(0);
  })
  .catch(async (e) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    await prisma.$disconnect();
    console.error(e);
    process.exit(1);
  });
