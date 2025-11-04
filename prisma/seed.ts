import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.adminUser.upsert({
    where: { email: 'admin@petronax.corp' },
    update: {},
    create: {
      email: 'admin@petronax.corp',
      name: 'Petronax Admin',
      password: hashedPassword,
      role: 'admin',
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create categories
  const motorCategory = await prisma.category.upsert({
    where: { slug: 'motoradditive' },
    update: {},
    create: {
      name: 'Motoradditive',
      slug: 'motoradditive',
      description: 'Hochleistungsmotoradditive für maximale Effizienz und Langlebigkeit',
      image: '/images/categories/motor.jpg',
    },
  });

  const dieselCategory = await prisma.category.upsert({
    where: { slug: 'dieseladditive' },
    update: {},
    create: {
      name: 'Dieseladditive',
      slug: 'dieseladditive',
      description: 'Spezialadditive für Dieselmotoren aller Art',
      image: '/images/categories/diesel.jpg',
    },
  });

  const benzinCategory = await prisma.category.upsert({
    where: { slug: 'benzinadditive' },
    update: {},
    create: {
      name: 'Benzinadditive',
      slug: 'benzinadditive',
      description: 'Optimierung für Benzinmotoren von Sportwagen bis Alltag',
      image: '/images/categories/benzin.jpg',
    },
  });

  const getriebeCategory = await prisma.category.upsert({
    where: { slug: 'getriebe-oeladditive' },
    update: {},
    create: {
      name: 'Getriebe- & Öladditive',
      slug: 'getriebe-oeladditive',
      description: 'Schutz und Optimierung für Getriebe und Ölsysteme',
      image: '/images/categories/getriebe.jpg',
    },
  });

  const industrieCategory = await prisma.category.upsert({
    where: { slug: 'industrieadditive' },
    update: {},
    create: {
      name: 'Industrieadditive',
      slug: 'industrieadditive',
      description: 'Heavy-Duty Additive für industrielle Anwendung',
      image: '/images/categories/industrie.jpg',
    },
  });

  console.log('✅ Categories created');

  // Create sample products
  const products = [
    {
      name: 'Petronax Motor Pro Plus',
      slug: 'petronax-motor-pro-plus',
      description: 'Hochleistungs-Motoradditive für maximale Leistungsfähigkeit und Langlebigkeit Ihres Motors. Speziell entwickelt für moderne Verbrennungsmotoren mit Turboaufladung und Direkteinspritzung.',
      shortDesc: 'Premium Motoradditive für maximale Leistung',
      price: 29.99,
      comparePrice: 39.99,
      sku: 'PNX-MOTOR-001',
      stock: 50,
      images: [
        '/images/products/motor-pro-plus-1.jpg',
        '/images/products/motor-pro-plus-2.jpg',
      ],
      categoryId: motorCategory.id,
      features: {
        dosierung: '50ml pro 50L Kraftstoff',
        anwendung: 'Alle Benzinmotoren',
        wirkstoff: 'Polyetheramine, Zinkdialkyldithiophosphate',
        wirksamkeit: 'Bis zu 10.000km',
      },
      dosage: '50ml pro 50L Kraftstoff bei jeder Tankfüllung zugeben',
      benefits: [
        'Reduziert Kraftstoffverbrauch bis zu 8%',
        'Verbessert Motorleistung und Beschleunigung',
        'Schützt vor Ablagerungen und Verschleiß',
        'Reduziert Emissionen',
        'Stabilisiert Kraftstoffqualität',
      ],
    },
    {
      name: 'Petronax Diesel Clean',
      slug: 'petronax-diesel-clean',
      description: 'Effektives Dieseladditive für Sauberkeit und Effizienz. Entfernt Ablagerungen im Einspritzsystem und optimiert den Verbrennungsprozess.',
      shortDesc: 'Reinigungs-Additive für Dieselmotoren',
      price: 24.99,
      sku: 'PNX-DIESEL-002',
      stock: 75,
      images: [
        '/images/products/diesel-clean-1.jpg',
        '/images/products/diesel-clean-2.jpg',
      ],
      categoryId: dieselCategory.id,
      features: {
        dosierung: '100ml pro 50L Diesel',
        anwendung: 'Alle Dieselmotoren',
        wirkstoff: 'Polyetheramine, Detergenzien',
        wirksamkeit: 'Sofortige Wirkung',
      },
      dosage: '100ml pro 50L Diesel bei jeder Tankfüllung',
      benefits: [
        'Reinigt Einspritzdüsen und Pumpen',
        'Verbessert Kaltstartverhalten',
        'Reduziert Rußbildung',
        'Stabilisiert Dieselkraftstoff',
      ],
    },
    {
      name: 'Petronax Benzine Sport',
      slug: 'petronax-benzine-sport',
      description: 'Sportliches Benzinadditive für maximale Leistung. Entwickelt für High-Performance-Motoren und sportliche Fahrweise.',
      shortDesc: 'Sport-Additive für Benzinmotoren',
      price: 34.99,
      comparePrice: 44.99,
      sku: 'PNX-BENZIN-003',
      stock: 30,
      images: [
        '/images/products/benzine-sport-1.jpg',
        '/images/products/benzine-sport-2.jpg',
      ],
      categoryId: benzinCategory.id,
      features: {
        dosierung: '25ml pro 50L Benzin',
        anwendung: 'Sport- und Rennmotoren',
        wirkstoff: 'High-Performance-Wirkstoffe',
        wirksamkeit: 'Sofortige Leistungssteigerung',
      },
      dosage: '25ml pro 50L Benzin vor dem Tanken zugeben',
      benefits: [
        'Erhöht Motorleistung bis zu 15%',
        'Verbessert Drehmoment',
        'Schützt bei hohen Drehzahlen',
        'Optimiert Verbrennung',
      ],
    },
    {
      name: 'Petronax Getriebe Shield',
      slug: 'petronax-getriebe-shield',
      description: 'Schutz-Additive für Getriebe und Ölsysteme. Reduziert Verschleiß und verlängert Lebensdauer.',
      shortDesc: 'Schutz-Additive für Getriebe',
      price: 27.99,
      sku: 'PNX-GETRIEBE-004',
      stock: 40,
      images: [
        '/images/products/getriebe-shield-1.jpg',
        '/images/products/getriebe-shield-2.jpg',
      ],
      categoryId: getriebeCategory.id,
      features: {
        dosierung: '5% des Öl- oder Getriebeöls',
        anwendung: 'Alle Getriebetypen',
        wirkstoff: 'Molybdän-Verbindungen',
        wirksamkeit: 'Langzeitwirkung',
      },
      dosage: '5% zum Öl- oder Getriebeöl hinzufügen',
      benefits: [
        'Reduziert Reibung und Verschleiß',
        'Senkt Betriebstemperatur',
        'Verlängert Ölwechselintervalle',
        'Schützt bei extremen Bedingungen',
      ],
    },
    {
      name: 'Petronax Industrial Pro',
      slug: 'petronax-industrial-pro',
      description: 'Heavy-Duty-Additive für industrielle Anwendung. Entwickelt für extrem hohe Belastungen und anspruchsvolle Bedingungen.',
      shortDesc: 'Industrie-Additive für schwere Lasten',
      price: 49.99,
      sku: 'PNX-INDUSTRIE-005',
      stock: 20,
      images: [
        '/images/products/industrial-pro-1.jpg',
        '/images/products/industrial-pro-2.jpg',
      ],
      categoryId: industrieCategory.id,
      features: {
        dosierung: 'Individuelle Dosierung',
        anwendung: 'Industriemaschinen',
        wirkstoff: 'Industrie-Spezialformel',
        wirksamkeit: 'Langzeitschutz',
      },
      dosage: 'Je nach Anwendung individuell dosieren',
      benefits: [
        'Extreme Verschleißreduzierung',
        'Hitzeschutz bis 300°C',
        'Korrosionsschutz',
        'Verlängert Wartungsintervalle',
      ],
    },
  ];

  // Create products
  for (const productData of products) {
    await prisma.product.upsert({
      where: { sku: productData.sku },
      update: {},
      create: productData,
    });
  }

  console.log('✅ Products created');

  // Create sample reviews
  const reviews = [
    {
      productId: 'pnx-motor-pro-plus-slug-placeholder', // Will be updated after product creation
      name: 'Markus Schmidt',
      email: 'markus.s@example.com',
      rating: 5,
      comment: 'Hervorragendes Produkt! Der Motor läuft deutlich leiser und der Verbrauch ist gesunken.',
      approved: true,
    },
    {
      productId: 'pnx-diesel-clean-slug-placeholder',
      name: 'Sabine Wagner',
      email: 'sabine.w@example.com',
      rating: 4,
      comment: 'Gute Wirkung, besonders beim Kaltstart merkt man den Unterschied.',
      approved: true,
    },
  ];

  // Get actual product IDs and update reviews
  const motorProduct = await prisma.product.findUnique({ where: { sku: 'PNX-MOTOR-001' } });
  const dieselProduct = await prisma.product.findUnique({ where: { sku: 'PNX-DIESEL-002' } });

  if (motorProduct) {
    await prisma.review.create({
      data: {
        ...reviews[0],
        productId: motorProduct.id,
      },
    });
  }

  if (dieselProduct) {
    await prisma.review.create({
      data: {
        ...reviews[1],
        productId: dieselProduct.id,
      },
    });
  }

  console.log('✅ Reviews created');
  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });