const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');
const {config} = require('../config/config');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);
    const newUser = await models.User.create({
      ...data,
      password: hash
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async find() {
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('user not found');
    }
    return user;
  }
  async findByEmail(email) {
    const rta = await models.User.findOne({
      where: {email}
    });
    return rta;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return { id };
  }

  async changePassword (token, newPassword) {
      try {
        const payload = jwt.sign(token, config.TOKEN_SECRET);
        const user = await this.findOne(payload.sub);
        if(user.recoveryToken !== token) {
          throw boom.unauthorized()
        }
        const hash = await bcrypt.hash(newPassword, 10);
        await this.update(user.id, {recoveryToken: null, password: hash})
        return {message: 'Password changed'}
      } catch (error) {
        throw boom.unauthorized()
      }
  }
}

module.exports = UserService;
