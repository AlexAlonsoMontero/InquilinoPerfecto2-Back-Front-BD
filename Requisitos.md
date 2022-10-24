# REQUISITOS INMOWEB 2.O
## SÍNTESIS DEL PROYECTO:

El proyecto consiste en realizar un portal inmobiliario web.
El portal debe ser responsive y en el se podrán buscar anuncios de inmuebles y solicitar la reserva de los mismos.

El portal debe de disponer de sistema de login, sistema de reseñas y sistema de reservas.
Los usuarios podrán ser de 4 tipos:

- Inquilino
- Casero
- Inquilino y Casero
- Administrador

IMPORTANTE: Aunque los distitnos tipos de usuarios puedan dar de baja inmuebles, o reservas o así mismos, en ningun caso serán borrados de la 

 
OPERACIONES POR USUARIO:

• REGISTRADO:
    
- Modificar datos de usuario
- Solicitar baja de usuario.

• INVITADO:
- Registrarse como usuario casero, inquino, o inquilino/casero (teniendo dos funcionalidades)
- Realizar búsquedas de anuncios de inmuebles
          
• INQUILINO:

- Iniciar sesión
- Realizar búsquedas de anuncios de inmuebles
- Solicitar reservas de inmuebles anunciados
- Cancelar una reservas solicitada
- Consultar histórico de reservas
- Realizar reseña de inmueble cuyo alquiler haya finalizado
- Modificar reseña de inmueble cuyo alquiler haya finalizado
- Eliminar reseña de inmueble alquilado cuyo alquiler haya finalizado
          
• CASERO:

- Realizar búsquedas de anuncios de inmuebles
- Consultar solicitudes reservas recibidas y estado de las mismas
- Aceptar o rechazar solicitudes de reservas  recibidas
- Consultar histórico de alquileres
- Consultar alquileres por inmuebles
- Consultar alquileres por inquilino
- Realizar reseñas sobre inquilinos de reservas ya realizadas
- Modificar reseñas realizadas
- Eliminar reseñas realizadas
- Publicar anuncios de inmuebles
- Borrar anuncios de inmuebles
- Modificar anuncios de inmuebles
          
• ADMINISTRADOR:
- CRUD Cualquier usario →Es el único usuario que puede dar de alta un usuario administrador o modificar los datos de cualquier usuario
- CRUD Cualquier inmueble
- CRUD Caulquier anuncios
- CRUD Cualquier reseña
- CONSULTAS ALQUILERES
    - Por fecha (plazo de tiempo)
    - Provincia
    - Ciudad
    - Coste
    - Comunidad autónoma
    - Por inquiliino
    - Por casero
- CONSULTAS ANUNCIOS
    - Por fecha (plazo de tiempo)
    - Provincia
    - Coste
    - Comunidad autónoma
    - Por casero
- CONSULTAS RESEÑAS:
   - Total
   - Por inquilino
   - Por casero
   - Por inmueble

SOLAMENTE EL USUARIO ADMINISTRADOR PODRÁ ELIMINAR INMUEBLES DE LA BASE DE DATOS
              


## FUNCIONALIDADES:

### CUALQUIER USUARIO

• REGISTRO USUARIO:
- El usuario se registrará con un nombre de usuario , un password, sus datos personales, y un avatar con una imagen que podrá escoger, del disco duro, o pondremos una por defecto. En el momento del registro se le enviará un mail para activar al usuario.
- Si el usuario ha sido dado de baja, se enviará un error, deberá hacer login, y en ese momento se le enviará un mail de confirmación para reactivar el usuario.

. LOGIN:
-  El usuario se podrá loguear con mail o con username.
-  En caso de detectar que elusuario está de baja, se enviará un mail para reactivación de cuenta.

### CUALQUIER USUARIO LOGADO:
- Acceder y modificar su pefil de usuario, incluida la contraseña
- Solicitar la baja del sistema. En ese momentolos datos  no serán visibles, pero no se borrarán de la base de datos.
-


• PROCESO DE ALQUILER INMUEBLE:
- Unicamente el usuario registrado como inquilino, inquilino/casero o el administrador, podrán enviar una solicitud de alquiler.
- En el momento de la solicitud debemos de verificar que el inmueble no está ocupado en esas fechas
- Una vez realizada la oferta el usuario casero podrá aceptar o rechazar la solicitud, recibiendo una alerta el inquilino con la respuesta. Así pues una reserva podra estar solicitada, reschazada aceptada y confirmada

• REGISTRO USUARIO:

- Para realizar una reseña el alquiler debe estar finalizado, el usuario podrá hacer una reseña del inquilino, y el inquilino podrá realizar una reseña sobre el inmueble.
- Solamente el administrador o el autor de la reseña la podrá borrar, las reseñas borradas, dejarán de estar visibles, pero no se eliminarán de la base de datos.

### USUARIO ADMINISTRADOR:
- Podrá hacer toda las gestiones que el resto de usuarios, y además podrá:
- BOORAR ENTRADAS DE LA BASE DE DATOS