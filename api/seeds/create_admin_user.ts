import { Knex } from 'knex';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Hash the admin password
  const passwordHash = await bcrypt.hash('adminpassword', 10);

  // Insert admin user into the users table
  await knex('users').insert({
    username: 'admin',
    password: passwordHash,
    role: 'admin',
    created_at: new Date(),
    updated_at: new Date()
  });
}
