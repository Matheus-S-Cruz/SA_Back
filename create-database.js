import postgres from 'postgres';

const sql = postgres({
  host: 'localhost',   
  port: 5432,
  database: 'postgres',
  user: 'postgres',    
  password: '12345',
  // password: 'senai' 
});

async function createDatabase() {
  try {
    await sql`CREATE DATABASE logins;`; 

    console.log('Database created successfully');
  } catch (error) {
    console.error('Error creating database:', error.message);
  } finally {
    await sql.end();
  }
}

async function createLogins() {
  try {
    await sql`CREATE USER local WITH PASSWORD '12345';`;

    await sql`GRANT ALL PRIVILEGES ON DATABASE logins TO local;`;

    await sql`GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO local;`;

    await sql`GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO local;`;

    await sql`GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO local;`;

    console.log('User created and granted privileges successfully');
  } catch (error) {
    console.error('Error creating user or granting privileges:', error.message);
  } finally {
    await sql.end();
  }
}

createLogins();
createDatabase();