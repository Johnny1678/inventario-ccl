
-- Base de datos Postgres SQL17: inventario_ccl

CREATE TABLE productos
(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cantidad INTEGER NOT NULL DEFAULT 0
);

INSERT INTO productos(nombre,cantidad)
VALUES
('Laptop Dell',10),
('Monitor Samsung',5),
('Mouse Logitech',20),
('Teclado Redragon',15),
('Impresora HP',3);


select * from productos order by id asc

