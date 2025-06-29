// seed.ts
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Flight from './models/flight';

dotenv.config({ path: './config/config.env' });

const seedFlights = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');

    const flights = [
      {
        airline: 'Air India',
        route: 'DEL-BLR',
        scheduleDate: new Date(),
        departureTime: new Date(),
        arrivalTime: new Date(Date.now() + 2 * 3600 * 1000),
      },
      {
        airline: 'IndiGo',
        route: 'BLR-BOM',
        scheduleDate: new Date(),
        departureTime: new Date(),
        arrivalTime: new Date(Date.now() + 2.5 * 3600 * 1000),
      }
    ];

    await Flight.deleteMany();
    await Flight.insertMany(flights);

    console.log('🚀 Dummy flight data inserted!');
    process.exit();
  } catch (error) {
    console.error('❌ Error inserting flights:', error);
    process.exit(1);
  }
};

seedFlights();

