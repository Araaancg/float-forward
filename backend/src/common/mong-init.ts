/* eslint-disable max-len */
import mongoose from 'mongoose';
import Container from 'typedi';
import { MONGODB_URI } from './config';
import { UserSchema } from '../models/user.schema';

export class DatabaseConnection {
  private static connection: mongoose.Connection | null = null;

  public static async connectDB(): Promise<mongoose.Connection> {
    if (!DatabaseConnection.connection) {
      try {
        DatabaseConnection.connection = await mongoose.createConnection(MONGODB_URI!, {}).asPromise();
        console.log(`DB Connected by Process ID:`, process.pid);
      } catch (error) {
        console.error(`Error connecting to the DB`, error);
        throw error;
      }
    }
    return DatabaseConnection.connection;
  }

  public static async loadModels(): Promise<void> {
    if (!DatabaseConnection.connection) {
      throw new Error('Database not connected');
    }
    const connection = DatabaseConnection.connection;
    
    Container.set('User', connection.model('User', UserSchema));
  }
}

export const initializeDatabase = async () => {
  await DatabaseConnection.connectDB();
  await DatabaseConnection.loadModels();
};

initializeDatabase().catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});