"use strict";
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
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
        const payload = jwt.sign(token, config.apikey);
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

  async signToken (user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = await jwt.sign(payload, 'apikey')
    return {
      user,
      token
     }
  }
  async verifyToken (token) {
    const user = req.user
    const payload = {sub:user.id}
    await jwt.verify(token, 'apikey')
    return {
      message:`sesion activa para ${payload.sub}`,
      token
     }
  }
  async getUser(email, password) {
    const user = await this.findByEmail(email)
    if(!user){
      throw boom.unauthorized();
    }
    const isMatch = bcrypt.compare(password, user.password);
    if(!isMatch){
      throwboom.unauthorized();
    }
    delete user.dataValues.password;
    console.log(user)
    let find = await this.signToken(user);
    return {
      find
    }
  }
    async sendRecovery(email) {
      const user = await this.findByEmail(email)
      console.log(user)
      if(!user){
        throw boom.unauthorized();
      }
      const payload = { sub: user.id }
      const token = jwt.sign(payload, 'apikey', {expiresIn: 15000});
      const link = `https://auth-node-sequelize-express.herokuapp.com/recovery?token=${token}`
      await this.update(user.id, {recoveryToken: token})
      const mail = {
        from: '"Recuperación de contraseña  👻" <jessicaorozco@gmail.com>', // sender address
        to: `${user.email}`, // list of receivers
        subject: "Email de recuperación de contraseña ✔", // Subject line
        html: `<b>Ingresa a este Link => ${link}</b>`, // html body
      }
      const rta = await this.sendMail(mail);
      return rta;
    }

    async sendMail(infoemail){
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.GMAIL_ADDRESS,
          pass: process.env.PASSWORD_EMAIL
      }
      })
      await transporter.sendMail(infoemail);
      return {message: `Email enviado ` }
    }

}

module.exports = UserService;
