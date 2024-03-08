import { Client } from 'pg';

const client = new Client({
    user: 'uctk97771r0prk',
    host: 'cfua00420e2gff.cluster-czz5s0kz4scl.eu-west-1.rds.amazonaws.com',
    database: 'd5dqpkj8k7ts86',
    password: 'p490985d3e78c3c4866337560ae2beff8aada5ce48617b8e1f54c5f697193e406',
    port: 5432, 
    ssl: {
        rejectUnauthorized: false 
    }
});

client.connect();

client.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error(err);
  } else {
    console.log(res.rows);
   
  }
});

export default client;
