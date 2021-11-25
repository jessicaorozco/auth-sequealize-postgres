const { boom } = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const {config} = require('../config/config');

const UserService = require('../sequelize/user.service');
const service = new UserService;

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email)
    if(!user){
      throw boom.unauthorized();
    }
    const isMatch = bcrypt.compare(password, user.password);
    if(!isMatch){
      throwboom.unauthorized();
    }
    delete user.dataValues.password;
    return user
  };

  async signToken (user) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.TOKEN_SECRET)
    return {
      user,
      token
     }
  }

    async sendRecovery(email) {
      const user = await service.findByEmail(email)
      if(!user){
        throw boom.unauthorized();
      }
      const payload = { sub: user.id }
      const token = jwt.sign(payload, config.TOKEN_SECRET, {expiresIn: '15 min'});
      const link = `http://myfrontend.com/recovery?token=${token}`
      await service.update(user.id, {recoveryToken: token})
      const mail = {
        from: '"Correo de Prueba correo 👻" <jessicaorozco@gmail.com>', // sender address
        to: `${user.email}`, // list of receivers
        subject: "Email de recuperación de contraseña ✔", // Subject line
        html: `<b>Ingresa a este Link => ${link}</b>`, // html body
      }
      const rta = await this.sendMail(mail);
      return rta;
    }

    async sendMail(mail){
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: config.mailMail,
          pass: config.passwordMail
      }
      });
      await transporter.sendMail({
        from: '"Correo de Prueba correo 👻" <jessicaorozco@gmail.com>', // sender address
        to: `${user.email}`, // list of receivers
        subject: "Email de recuperación de contraseña ✔", // Subject line
        html: `<b>Ingresa a este Link => ${link}</b>`, // html body
      });
      return {message: `Email enviado a ${user.email}` }
    }

}

module.exports = AuthService;
