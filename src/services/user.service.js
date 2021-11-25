const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const faker = require('faker');
// const sequelize = require('../libs/sequelize');
// const models = require('../db/models/user.model')

class UserService {
  constructor() {}

  async create(data) {
    // const newUser = await service.create(data)
    // return newUser;
    const newUsers = {
      id: faker.datatype.uuid(),
      ...data
    }
    // this.users.push(newUsers);
    return newUsers;
  }

  async find() {
    const query = 'SELECT * FROM users';
    const rta = await pool.query(query);
    return rta.rows;
  }

  //   async find() {
  //   const query = await models.User';
  //   const rta = await sequelize.query(query);
  //   return rta.rows;
  // }


  async findOne(id) {
  const user = 'SELECT * FROM users WHERE users.users_id = ?';
    if(!user){
      boom.notFound('user not found')
    }
    await pool.query(id);
    return user
  }

  async update(id, changes) {
    const user = await models.User.findByPk(id);
    user.update(changes)
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
