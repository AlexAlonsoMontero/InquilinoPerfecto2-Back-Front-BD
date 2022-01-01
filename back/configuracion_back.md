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

    app.use(morgan('combined'));
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

# Configuración de conexión con base de datos
*  Para realizar esta configuración instalaremos mysql2.
```
    npm i mysql2
```
* Conexión a base de datos en /infraestructure/db.js

# Paquetes npm y su funcionalidad
* bcrypt-> Paquete para encriptado de datos, se usará para el password de usuario
```
    npm i bcrypt
//Guardar contraseña encriptada
const palabraSecretaEncriptada = await bcrypt.hash(palabraSecretaTextoPlano, rondasDeSal);
//Comparar contraseña encriptada
```
* jwt -> Json web token Geenera y lee tokens para autenticación de usuarios
```
    npm install jsonwebtoken
```

# Carpeta infraestructure/repository
* En esta caerpeta gestionaremos los respositorios las conexiones con las bases de datos.

    # infrestructure/respository/generalRepository.js
    * Esta carpeta contendrá metodos de respositorio genéricos, por ejemplo un select que nos devuelva todos los elementos y que sea válido para todas las tablas de la base de datos.
        * getAllItems() => Devuelve todos los datos que existan en la tabla pasada como parametro table
        * findItems() => Método que devuelve el resutlado de un select en cualquier tabla, con un where
        * whereConstructor() => Método genérico para construir el string de un where
        * getKeyOperator()=> Método que mapea los query param, para generar la cadena de condición de un Select
        * addItem() => Método para añadir una entrada en la base de datos
        * delteItem( )=> Método para borrar un item de la base dedatos


# Carpeta controllers
* Los controladores serán agrupados por ruta. Como ejemplo userControllers.js llevará los metodos correspondientes con el endpoint /api/users.

* usercontrolers.js -> Fichero con controladores de usuario
    * getAllUsers() -> Conecta con respositorio getAllitems, y devuelve todos los usuarios de la tabla usuarios.
    * findUsers() ->  Conecta con findItems y busqueda un usuario según condiciones facilitadas en query param.
    * addUser() -> Método para añadir usuario en la base de datos
    * login() -> Método para logar usuario,usando token
    * deleteUser()-> Método que llama a delte item y borra un usuario de la base de datos.

# Carpeta customerrors
* Capeta que contiene errores peronsalizdos para poder llevar una mejor gestión de errores 

    * dbErrors.js --> Errores customizados relacionados con la base de datos

        * ErrorNotFoundDB()--> Error para cuando no se encuentran resultados en la base de datos



