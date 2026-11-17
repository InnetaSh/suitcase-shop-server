import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import 'dotenv/config';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');

  // Очищаем старые данные в правильном порядке (сначала дочерние элементы)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.suitcase.deleteMany();

  // Добавляем тестовые чемоданы строго по структуре schema.prisma
  await prisma.suitcase.createMany({
    data: [
      {
        sku: 'TRV-S-BLK-1234',
        title: 'TravelPro Cabin Pro',
        brand: 'TravelPro',
        price: 120.50,
        color: 'Black',
        size: 'S',
        inStock: 15,
        imageUrl: 'https://images.unsplash.com/photo-1581553680327-1ff028f04467?w=500',
      },
      {
        sku: 'SAM-M-NBL-1234',
        title: 'Samsonite Volant Medium',
        brand: 'Samsonite',
        price: 210.00,
        color: 'Navy Blue',
        size: 'M',
        inStock: 8,
        imageUrl: 'https://images.unsplash.com/photo-1565026057447-bc90a3dcae87?w=500',
      },
      {
        sku: 'AMR-L-YLW-1234',
        title: 'American Tourister Soundbox',
        brand: 'American Tourister',
        price: 180.00,
        color: 'Yellow',
        size: 'L',
        inStock: 5,
        imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      },
    ],
  });

  console.log('Seed data inserted successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });