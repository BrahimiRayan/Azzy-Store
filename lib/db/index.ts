import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';
import * as relations from './TablesRelations/relations';
import * as beterauth from './schema/auth-schema'
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}
// Initialize the database connection using drizzle with the provided schema
  
export const db = drizzle(
                            process.env.DATABASE_URL! ,
                            {schema : {... schema ,...beterauth , ... relations} 
                            , logger: true}
        );
