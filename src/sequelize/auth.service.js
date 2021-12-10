const { boom } = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { use } = require('passport');

const UserService = require('../sequelize/user.service');
const service = new UserService;

const {config} = require('../config/config');

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
      role: use.role
    }
    console.log(payload)
    const token = jwt.sign(payload, process.env.TOKEN_SECRET)
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
      const token = jwt.sign(payload, 'apikey', {expiresIn: '15 min'});
      const link = `https://auth-node-sequelize-express.herokuapp.com/recovery?token=${token}`
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

    async sendMail(email){
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.GMAIL_ADDRESS,
          pass: process.env.PASSWORD_EMAIL
      }
      });
      await transporter.sendMail({
        from: '"Correo de Prueba correo 👻" <jessicaorozco@gmail.com>', // sender address
        to: `${user.email}`, // list of receivers
        subject: "Email ✔", // Subject line
        html: `<b>Bienvenido </b>`, // html body
      });
      console.log(email)
      return {message: `Email enviado a ${email}` }
    }

}

module.exports = AuthService;
