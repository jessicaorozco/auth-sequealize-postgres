const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
require('./utils/auth');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}
app.use(cors(options));
app.use('development', () => {
  //...
})
app.use('production', () => {
  //...
})

app.get('/', (req, res) => {
  res.status(200).json("APP AUTH POSGRES SEQUELIZE NODEJS");
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(express.static(__dirname + '/'));

app.listen(port, () => {
  console.log(`Server in Port ${port}`);
});

// console.log(process.env)

