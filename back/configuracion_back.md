# Iniciamos npm e instalación de Express

```
npm init
npm install express --save
node server.js
```

# Instalamos nodemon nos ayudará en nuestro desarrollo ya que reiniciará automáticamente el servidor de Node.js a cada cambio que hagamos en nuestro código.
* Configuramos package.json -->  con npm start iniciamos nodemon
```
    npm i -S nodemon
```

    
```
    //package.json
      "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon server.js"
    },
```

# Instalamos morgan, un registrador que nos muestra la info por consola. (Un logger)
* Configuramos server.js  -- server.js 
```
    npm i morgan
```
 

```
    //server.js
    const express = require('express');
    const morgan = require ('morgan')

    const app = express();

    app.use(morgan('combinee'));
```
# Configuración e instalación de variables de entorno básicas,utilizando dotenv
* Instalamos dotenv
```
    npm i dotenv 
```
* Configuración de server.js
```
    require('dotenv').config();
```
```
    let port = process.env.WEB_PORT
    let host = process.env.WEB_HOST
    app.listen(port,host,()=>{
    console.log(`Server runing at http://${host}:${port}`)
    }); 
```