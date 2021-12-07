/*TODOS LOS ANUNCIOS*/
SELECT * FROM anuncios;

/*TODOS LOS INMUEBLES CON ANUNCIO*/
SELECT * FROM inmuebles INNER JOIN  anuncios
ON inmuebles.id_inmueble = anuncios.fk_inmueble 

/*TODOS LOS USUARIOS*/
SELECT * FROM usuarios

/*todas las reservas mostrando anuncios y datos de imueble*/
SELECT * FROM reservas INNER JOIN inmuebles 
ON reservas.fk_inmueble = inmuebles.id_inmueble 
INNER JOIN anuncios 
ON anuncios.fk_inmueble = inmuebles.id_inmueble 