// seed.ts
import connectDB from '../config/db';
import { CityModel } from '../models/Cities';

export async function seedCities() {
  await connectDB();

  // Clear existing cities (optional, for fresh seed)
  await CityModel.deleteMany();

  // Sample city data
  const cities = [
    { name: 'Lagos' },
    { name: 'Abuja' },
    { name: 'Kano' },
    { name: 'Port Harcourt' },
    { name: 'Enugu' },
  ];

  // Insert all cities
  await CityModel.insertMany(cities);

  console.log('Cities seeded successfully');
  process.exit();
}

