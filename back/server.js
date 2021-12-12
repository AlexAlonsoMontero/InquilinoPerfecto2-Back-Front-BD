const express = require('express');
const morgan = require ('morgan')


const app = express();

require('dotenv').config();

app.use(morgan('combinee')); //formato: combined... ver doc https://www.npmjs.com/package/morgan

app.use((req, res) => res.send('Hello express!'));


let port = process.env.WEB_PORT
let host = process.env.WEB_HOST
app.listen(port,host,()=>{
    console.log(`Server runing at http://${host}:${port}`)
}); 
