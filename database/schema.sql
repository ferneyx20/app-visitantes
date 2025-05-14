DROP TABLE IF EXISTS visitas, usuarios, empleados, sedes;

CREATE TABLE sedes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL CHECK (rol IN ('admin', 'estandar')),
    activo BOOLEAN DEFAULT FALSE,
    sede_id INT REFERENCES sedes(id)
);

CREATE TABLE empleados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cargo VARCHAR(100) NOT NULL,
    sede_id INT REFERENCES sedes(id)
);

ALTER TABLE empleados ADD CONSTRAINT unique_id UNIQUE (id);

CREATE TABLE visitas (
    id SERIAL PRIMARY KEY,
    nombre_visitante VARCHAR(100) NOT NULL,
    cedula VARCHAR(20) NOT NULL,
    empresa VARCHAR(100),
    motivo TEXT,
    foto VARCHAR(255),
    tipo_registro VARCHAR(20) NOT NULL CHECK (tipo_registro IN ('manual', 'autogestionado')),
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('activa', 'finalizada', 'rechazada', 'pendiente')),
    fecha_ingreso TIMESTAMP DEFAULT NOW(),
    fecha_salida TIMESTAMP,
    empleado_id INT REFERENCES empleados(id),
    sede_id INT REFERENCES sedes(id),
    usuario_id INT REFERENCES usuarios(id)
);

ALTER TABLE visitas
ADD CONSTRAINT fk_usuario FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
ADD CONSTRAINT fk_empleado FOREIGN KEY (empleado_id) REFERENCES empleados(id) ON DELETE SET NULL,
ADD CONSTRAINT fk_sede FOREIGN KEY (sede_id) REFERENCES sedes(id) ON DELETE CASCADE;
