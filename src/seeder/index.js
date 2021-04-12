/**
 * IMPORTS
 */
import faker from 'faker';
import Users from '../lib/Users.js';
import bcrypt from 'bcrypt';

const usersDB = new Users();

/**
 * sreate users
 * @param {*} amount 
 * @returns 
 */
const createUsers = async (amount) => {
  const users = [];
  const password = faker.internet.password();
  for (let i = 0; i < amount; i++) {
    const user = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      //hashpassword
      password: bcrypt.hashSync(password, 10),
      isAdmin: 0
    };
    console.log(`Created a new fake user: ${user.name}`);
    users.push(user);
  }

  return users;
};

//add  users to database
const seedUsers = async (users) => {
  try {
    const ids = users.map(async (users) => {
      return await usersDB.addSeeder(users);
    });

    return Promise.all(ids); // if all insert promises are resolved, return the ids's.
  } catch (message) {
    return console.error(message);
  }
};

const seed = async () => {
  const users = await createUsers(50);
  const usersIDs = await seedUsers(users);
  console.log(`Added ${usersIDs.length} users to database`);
    // if all
    Promise.all(usersIDs).then(() => {
      console.log(`Closing the seeder!`);
      process.exit();
    });
}

seed();