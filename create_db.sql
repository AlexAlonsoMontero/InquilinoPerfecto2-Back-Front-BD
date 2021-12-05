DROP DATABASE inmoweb2_0;
CREATE DATABASE IF NOT EXISTS inmoweb2_0;
USE inmoweb2_0;

CREATE TABLE usuarios(
	id_usuario INT UNSIGNED NOT NULL AUTO_INCREMENT,
	username VARCHAR(64) NOT NULL,
	password VARCHAR(64) NOT NULL,
	email VARCHAR(256) NOT NULL,
	tipo ENUM ('INQUILINO','CASERO','INQUILINO/CASERO','ADMINISTRADOR'),
	activated_at TIMESTAMP DEFAULT NULL,
	activated_code VARCHAR(64) DEFAULT NULL,
	avatar VARCHAR(256) NOT NULL,
	nombre VARCHAR(256) NOT NULL,
	apellidos VARCHAR(512) NOT NULL,
	telefono VARCHAR(12) NOT NULL,
	
	CONSTRAINT UNIQUE KEY UK_usuarios_username (username),
    CONSTRAINT UNIQUE KEY UK_usuarios_email (email),
    CONSTRAINT PK_usuarios PRIMARY KEY(id_usuario)
	
);

CREATE TABLE inmuebles (
	id_inmueble INT UNSIGNED NOT NULL AUTO_INCREMENT,
    fk_usuario  INT UNSIGNED NOT NULL,
	tipo_via ENUM ('CALLE','AVENIDA','CAMINO','CARRETERA','OTROS') NOT NULL,
	fecha_alta TIMESTAMP DEFAULT NULL,
	tipo_inmueble ENUM ('PISO','ESTUDIO','CASA','ADOSADO','OTROS'),
	lng DECIMAL(9,6) NOT NULL DEFAULT 0,
    lat DECIMAL(9,6) NOT NULL DEFAULT 0,
    metros_2 SMALLINT DEFAULT 0,
    calle VARCHAR(256) NOT NULL,
    numero VARCHAR (16),
    piso VARCHAR (16),
    ciudad VARCHAR(128) NOT NULL,
    provincia VARCHAR(128)NOT NULL,
    comunidad VARCHAR(128),
    pais VARCHAR (128) NOT NULL,
    cp VARCHAR (5) NOT NULL,
    banos SMALLINT NOT NULL DEFAULT 0,
    habitaciones SMALLINT NOT NULL DEFAULT 0,
    amueblado BOOLEAN DEFAULT FALSE,
    calefaccion BOOLEAN DEFAULT FALSE,
    aire_acondicionado BOOLEAN DEFAULT FALSE,
    jardin BOOLEAN DEFAULT FALSE,
    terraza BOOLEAN DEFAULT FALSE,
    ascensor BOOLEAN DEFAULT FALSE,
    piscina BOOLEAN DEFAULT FALSE,
	wifi BOOLEAN DEFAULT FALSE,
	visible BOOLEAN DEFAULT TRUE,
	id_casero INT UNSIGNED NOT NULL,
    
    CONSTRAINT FK_inmuebles_usuarios FOREIGN KEY (fk_usuario)
    REFERENCES usuarios(id_usuario),
    CONSTRAINT PK_inmueble PRIMARY KEY(id_inmueble)
);

CREATE TABLE fotos_inmuebles (
    id_foto INT UNSIGNED NOT NULL AUTO_INCREMENT,
    url VARCHAR(512),
    fk_inmueble INT UNSIGNED NOT NULL,
    CONSTRAINT FK_fotos_inmuebles FOREIGN KEY (fk_inmueble)
    REFERENCES inmuebles(id_inmueble)
    ON DELETE CASCADE,
    CONSTRAINT PK_fotos_inmuebles PRIMARY KEY (id_foto)
);

CREATE TABLE anuncios (
    id_anuncio INT UNSIGNED NOT NULL AUTO_INCREMENT,
    precio FLOAT(8,2),
    fk_inmueble INT UNSIGNED NOT NULL,
    CONSTRAINT FK_anuncios_inmuebles FOREIGN KEY (fk_inmueble)
    REFERENCES inmuebles(id_inmueble),
    CONSTRAINT PK_anuncios PRIMARY KEY (id_anuncio)
);


CREATE TABLE reservas (
    id_reserva INT UNSIGNED NOT NULL AUTO_INCREMENT,
    fk_inmueble INT UNSIGNED NOT NULL,
    fk_usuario_inquilino  INT UNSIGNED NOT NULL,
    fecha_entrada DATE,
    fecha_salida DATE,
    CONSTRAINT FK_reservas_idInmueble FOREIGN KEY (fk_inmueble)
    REFERENCES inmuebles(id_inmueble),
    CONSTRAINT FK_reservas_usuarioInquilino FOREIGN KEY (fk_usuario_inquilino)
    REFERENCES usuarios(id_usuario),
    CONSTRAINT PK_reservas PRIMARY KEY (id_reserva)
);

CREATE TABLE resenas_inmuebles(
    id_resena INT UNSIGNED NOT NULL AUTO_INCREMENT,
    fk_inmuebleReserva INT UNSIGNED NOT NULL,
    foto1 VARCHAR(512),
    foto2 VARCHAR(512),
    foto3 VARCHAR(512),
    descripcion VARCHAR(512),
    calificacion SMALLINT,
    CONSTRAINT FK_resenaInmueble_reserva  FOREIGN KEY (fk_inmuebleReserva)
    REFERENCES reservas(fk_inmueble),
    CONSTRAINT PK_resenas_inmuebles PRIMARY KEY (id_resena)
);

CREATE TABLE resenas_inquilinos(
    id_resena INT UNSIGNED NOT NULL AUTO_INCREMENT,
    fk_inquilinoReserva INT UNSIGNED NOT NULL,
    descripcion VARCHAR(512),
    calificacion SMALLINT,
    CONSTRAINT FK_resenaIngquilino_reserva  FOREIGN KEY (fk_inquilinoReserva)
    REFERENCES reservas(fk_usuario_inquilino),
    CONSTRAINT PK_resenas_inquilinos PRIMARY KEY (id_resena)
);