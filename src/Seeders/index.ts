// src/seeders/index.ts
import { seedCities } from './cityseeders';

async function runAllSeeders() {
  await seedCities();
  console.log('🌱 All seeders completed');
  process.exit(0);
}

runAllSeeders().catch(err => {
  console.error('❌ Error running seeders:', err);
  process.exit(1);
});
