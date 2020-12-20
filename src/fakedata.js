const Faker = require('Faker')

const genMessages = amount => {
  const data = [];

  let firstName = Faker.Name.firstName();
  let secondName = Faker.Name.firstName();

  for (let i = 0; i < amount; i++) {
    data.push({
      username: i % 2 === 0 ? firstName : secondName,
      message: Faker.Lorem.sentence()
    })
  }

  return data
}


export default genMessages;