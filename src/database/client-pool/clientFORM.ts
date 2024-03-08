
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export const formPool = new Pool({
  connectionString: process.env.FORM_URL,
}
  );



