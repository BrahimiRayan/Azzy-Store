import 'dotenv/config';
import { defineConfig} from 'drizzle-kit';

export default defineConfig({
  out: './lib/db/migrations',
  schema: './lib/db/schema/index.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
