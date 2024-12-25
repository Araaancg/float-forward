/* eslint-disable max-len */
import mongoose from 'mongoose';
import { MONGODB_URI } from '../../common/config'; // Suponiendo que solo se usa una URI
import Container from 'typedi';
import { TokenSchema } from '../../models/token.schema';
import { PostSchema } from '../../models/post.schema';
import { UserSchema } from '../../models/user.schema';
import { CategorySchema } from '../../models/category.schema';

export class DatabaseConnection {
  private static connection: mongoose.Connection | null = null;

  public static async connectDB(): Promise<mongoose.Connection> {
    if (!DatabaseConnection.connection) {
      try {
        DatabaseConnection.connection = await mongoose.createConnection(MONGODB_URI, {}).asPromise();
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
    
    Container.set('Token', connection.model('Token', TokenSchema));
    Container.set('Post', connection.model('Post', PostSchema));
    Container.set('User', connection.model('User', UserSchema));
    Container.set('Category', connection.model('Category', CategorySchema))
  }
}

export const initializeDatabase = async () => {
  await DatabaseConnection.connectDB();
  await DatabaseConnection.loadModels();
};

// Llama a initializeDatabase en el punto de entrada de tu aplicación
initializeDatabase().catch(error => {
  console.error('Failed to initialize database:', error);
  process.exit(1);
});
