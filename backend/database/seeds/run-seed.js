import db from '../db.js';
import tasksSeed from './001_tasks.js';

async function runSeeds() {
  console.log('🌱 Starting database seed...');
  
  try {
    // Run tasks seed
    await tasksSeed.seed(db);
    console.log('✅ Tasks seeded successfully');
    
    console.log('🎉 All seeds completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

runSeeds();
