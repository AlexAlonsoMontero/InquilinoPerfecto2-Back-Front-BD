# Inquilino Perfecto 2.0

Versión 2.0 del portal web inquilino perfecto.
Web de alquileres de inmuebles con la posibilidad de presentar reseñas tanto de inquilino como de casero.
La primera versión fue el proyecto del bootcamp Hack  a Boss, esta versión es una mejora realizada de forma personal

## Proceso de desarrollo

1. Análisis de requisitos
2. Diagrama Entidad Relación
3. Base de datos
    - Implementación de base de datos
    - Introduccción de datos de prueba
    - Desarrollo de consultas necesarias
4. Back End
5. Front end


## Back-end
* Iniciamos npm e instalación de Express

```
npm init
npm install express --save
node server.js
```

* Inatalamos nodemon nos ayudará en nuestro desarrollo ya que reiniciará automáticamente el servidor de Node.js a cada cambio que hagamos en nuestro código.
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

* Instalamos morgan, un registrador que nos muestra la info por consola. (Un logger)
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
