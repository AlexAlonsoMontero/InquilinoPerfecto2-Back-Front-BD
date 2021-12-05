USE inmoweb2_0;

/*usuarios*/

INSERT INTO usuarios (username,password,email,tipo,activated_at ,activated_code,avatar,nombre,apellidos,telefono)
VALUES ("userPruebas1","pruebas1","pruebas1@pruebas1.com","CASERO","2021-12-1","activadopruebas1","urlAvatar","Pedro","Perez Pacheco","666666666");

INSERT INTO usuarios (username,password,email,tipo,activated_at ,activated_code,avatar,nombre,apellidos,telefono)
VALUES ("userPruebas2","pruebas2","pruebas2@pruebas2.com","INQUILINO","2021-12-1","activadopruebas2","urlAvatar2","Perico","Padron Perchero","666666666");

INSERT INTO usuarios (username,password,email,tipo,activated_at ,activated_code,avatar,nombre,apellidos,telefono)
VALUES ("userPruebas3","userPruebas3","userPruebas3@userPruebas3","INQUILINO","2021-12-1","activadouserPruebas3","urluserPruebas3","Brais","Méndez Ramadán","666666666");

INSERT INTO usuarios (username,password,email,tipo,activated_at ,activated_code,avatar,nombre,apellidos,telefono)
VALUES ("userPruebas4","userPruebas4","userPruebas4@userPruebas4.com","INQUILINO/CASERO","2021-11-20","activadouserPruebas4","urluserPruebas4","Amanda","Amor Amadeo","666555444");

INSERT INTO usuarios (username,password,email,tipo,activated_at ,activated_code,avatar,nombre,apellidos,telefono)
VALUES ("adminPruebas","adminPruebas","adminPruebas@adminPruebas.com","ADMINISTRADOR","2021-12-2","activadoadminPruebas","urladminPruebas","Administrador","Administrador Perfecto","666777888");

/*inmuebles*/
INSERT INTO inmuebles (
                    fk_usuario,tipo_via,fecha_alta,tipo_inmueble,lng,lat,metros_2,calle,numero,piso,ciudad,provincia,comunidad,pais,cp,banos,habitaciones)
VALUES      (
            1,"CALLE","2021-1-12","PISO",0,0,90,"Venezuela","2","1º","Vigo","Pontevedra", "Galicia","España","36204",2,3
);
INSERT INTO inmuebles (
                    fk_usuario,tipo_via,fecha_alta,tipo_inmueble,lng,lat,metros_2,calle,numero,piso,ciudad,provincia,comunidad,pais,cp,banos,habitaciones)
VALUES      (
            1,"CALLE","2021-1-12","PISO",0,0,45,"Venezuela","45","1º","Vigo","Pontevedra", "Galicia","España","36204",1,1
);
INSERT INTO inmuebles (
                    fk_usuario,tipo_via,fecha_alta,tipo_inmueble,lng,lat,metros_2,calle,numero,piso,ciudad,provincia,comunidad,pais,cp,banos,habitaciones)
VALUES      (
            1,"CALLE","2021-1-12","CASA",0,0,12,"gRAN VÍA","2","1º","Oviedo","Asturias", "Asturias","España","36205",1,2
);
