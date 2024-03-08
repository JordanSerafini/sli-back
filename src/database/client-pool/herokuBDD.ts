
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: "postgres://uctk97771r0prk:p490985d3e78c3c4866337560ae2beff8aada5ce48617b8e1f54c5f697193e406@cfua00420e2gff.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com:5432/d5dqpkj8k7ts86",
}
  );



