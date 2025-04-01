/* eslint-disable max-len */
import mongoose from 'mongoose';
import Container from 'typedi';
import { MONGODB_URI } from './config';
import { UserSchema } from '../models/user.schema';
import { SessionSchema } from '../models/session.schema';
import { DisasterSchema } from '../models/disaster.schema';
import { ImagesSchema } from '../models/images.schema';
import { PinSchema } from '../models/pin.schema';
import { PinTypesSchema } from '../models/pinType.schema';
import { ChatSchema } from '../models/chat.schema';
import { MessageSchema } from '../models/message.schema';
import { ApplicationSchema } from '../models/application.schema';

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
    Container.set('Session', connection.model('Session', SessionSchema));
    Container.set('Disaster', connection.model('Disaster', DisasterSchema));
    Container.set('Images', connection.model('Images', ImagesSchema));
    Container.set('Pin', connection.model('Pin', PinSchema));
    Container.set('PinTypes', connection.model('PinTypes', PinTypesSchema));
    Container.set('Chat', connection.model('Chat', ChatSchema));
    Container.set('Message', connection.model('Message', MessageSchema));
    Container.set('Application', connection.model('Application', ApplicationSchema));
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