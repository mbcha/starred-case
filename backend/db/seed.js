const { faker } = require('@faker-js/faker');
const fs = require('fs');
const db = require('./db.js');
const crypto = require('crypto');

function generateJobs(num) {
  const jobs = [];
  for (let i = 0; i <= num; i++) {
    jobs.push({
      title: faker.person.jobTitle(),
      description: faker.person.jobDescriptor(),
      type: faker.person.jobType(),
      area: faker.person.jobArea(),
      state: faker.location.state(),
      streetAddress: faker.location.streetAddress(),
    })
  }
  return jobs
}

function generateUsers(num) {
  const users = [];
  for (let i = 0; i <= num; i++) {
    users.push({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      salt: faker.lorem.word(),
    })
  }

  const salt = faker.lorem.word();
  const password = crypto.pbkdf2Sync('adminPassword', salt, 1000, 64, 'sha512').toString('hex');
  users.push({
    firstName: 'admin',
    lastName: 'admin',
    email: 'admin@test.com',
    password,
    salt
  })

  return users
}

function reset() {
  const sql = fs.readFileSync(__dirname + '/schema.sql').toString();  
  db.exec(fs.readFileSync(__dirname + '/schema.sql').toString())

  seed()
  console.log('Database has been reset and seeded');
}

function seed() {
  let stmt = db.prepare("INSERT INTO job (title, description, type, area, state, streetAddress) VALUES (?, ?, ?, ?, ?, ?)");

  const jobs = generateJobs(10);

  jobs.forEach(job => {
    stmt.run(job.title, job.description, job.type, job.area, job.state, job.streetAddress);
  });
  stmt.finalize();

  const users = generateUsers(10);
  stmt = db.prepare("INSERT INTO user (firstName, lastName, email, password, salt) VALUES (?, ?, ?, ?, ?)");
  users.forEach(user => {
    stmt.run(user.firstName, user.lastName, user.email, user.password, user.salt);
  });
  stmt.finalize();

  db.close();
}

reset();
