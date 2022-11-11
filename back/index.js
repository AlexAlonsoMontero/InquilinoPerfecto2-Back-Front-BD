
const userRouterV1 = require('./v1/routes/userRoutes');
const inmuebleRouterV1 = require('./v1/routes/inmuebleRoutes');
 //pp
const multer = require('multer');
let storage = multer.diskStorage({
    destination: ( request, file, cb)=>{
        cb(null,'./uploads')
    },
    filename: (request, file, cb)=>{
        cb(null, Date.now()+ file.fieldname);
    }
});

const upload = multer({ storage: storage})

//*********** */
const express = require('express');
const morgan = require ('morgan');
const { request } = require('express');

const app = express();

require('dotenv').config();

app.use(express.json());
app.use(morgan('combined')); //formato: combined... ver doc https://www.npmjs.com/package/morgan

//Routes
app.use('/api/v1/users', userRouterV1);
app.use('/api/v1/inmuebles', inmuebleRouterV1);


//PRUEBAS
app.post('/pruebas',upload.single('file'), (request,response)=>{
    console.log(request.body)
    response.send('ok')
})


const port = process.env.PORT
app.listen(port,()=>{
    console.log(`Server runing at port ${port}`)
});


module.exports = {app};

//TODO cuando se da de baja ( deleted true, un usuario poner deleted tu todos los inmuebles )