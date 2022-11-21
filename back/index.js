
const userRouterV1 = require('./v1/routes/userRoutes');
const inmuebleRouterV1 = require('./v1/routes/inmuebleRoutes');

const express = require('express');
const morgan = require('morgan');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(morgan('combined')); //formato: combined... ver doc https://www.npmjs.com/package/morgan

//Routes
app.use('/api/v1/users', userRouterV1);
app.use('/api/v1/inmuebles', inmuebleRouterV1);

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Server runing at port ${port}`)
});


module.exports = { app };

//TODO cuando se da de baja ( deleted true, un usuario poner deleted tu todos los inmuebles )