const express = require('express');
const morgan = require ('morgan')

const app = express();

app.use(morgan('combinee')); //formato: combined... ver doc https://www.npmjs.com/package/morgan

app.use((req, res) => res.send('Hello express!'));

app.listen(3000); 
