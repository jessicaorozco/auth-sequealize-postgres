const express = require('express');
const path = require('path');
const cors = require('cors');
const routerApi = require('./routes');
const es6Renderer = require('express-es6-template-engine');

require('./utils/auth');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.engine('html', es6Renderer);
app.use(express.static(path.join(__dirname + '/views')));
app.set('views', 'views');
app.set('view engine', 'html');

routerApi(app);

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
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server in Port ${port}`);
});

app.get('/', (req, res) => {
  res.render('index.html');
});

// console.log(process.env)

