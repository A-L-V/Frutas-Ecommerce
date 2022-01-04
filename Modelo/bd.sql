CREATE TABLE Cliente(
    id char(5) NOT NULL PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    telefono char(9) NOT NULL,
    distrito varchar(20) DEFAULT NULL,
    direccion varchar(100) DEFAULT NULL,
    correo varchar(100) NOT NULL, 
    descripcion varchar(100) DEFAULT 'Cliente nuevo',
    envio decimal(10, 2) DEFAULT 0,
    contra varchar(100) NOT NULL
); 

CREATE TABLE Envase(
    id char(5) PRIMARY KEY,
    nombre varchar(50) DEFAULT NULL,
    precio decimal(10, 2) NOT NULL,
    almacen int DEFAULT NULL
);

CREATE TABLE Producto(
    id char(5) PRIMARY KEY,
    nombre varchar(50) NOT NULL,
    precio decimal(10, 2) NOT NULL,
    medida varchar(25) NOT NULL,
    almacen int DEFAULT NULL,
    id_Envase char(5) DEFAULT NULL REFERENCES Envase(id)
);

CREATE TABLE Carrito(
    id_Cliente char(5) NOT NULL REFERENCES Cliente(id),
    id_Producto char(5) NOT NULL REFERENCES Producto(id),
    cantidad decimal(10, 2) DEFAULT NULL,
    PRIMARY KEY(id_Cliente, id_Producto)
);

CREATE TABLE Pedido(
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fechaInicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fechaFinal date DEFAULT NULL, 
    id_Cliente char(5) NOT NULL REFERENCES Carrito (id_Cliente)
);

CREATE TABLE Detalle(
    id_Pedido int REFERENCES Pedido(id),
    id_Producto char(5) REFERENCES Producto(id),
    cantidad decimal(10,2) NOT NULL,
    PRIMARY KEY(id_Pedido, id_Producto)
);

create table links(
    id int(11) not null PRIMARY KEY AUTO_INCREMENT,
    titulo varchar(150) not null, 
    url varchar(255) not null,
    id_Cliente char(5) NOT NULL REFERENCES Cliente(id),
    created TIMESTAMP not null DEFAULT CURRENT_TIMESTAMP
);

//triggers
DELIMITER $$ 
CREATE TRIGGER autoInsertCliente
BEFORE INSERT ON Cliente
FOR EACH ROW
BEGIN
  set @contador = (select count(*) from Cliente);
  SET NEW.id = CONCAT('C', LPAD(@contador, 4, '0'));
END$$
DELIMITER ;


//procedures
DELIMITER $$

create procedure upCarrito( idC char(5), idP char(5), cant decimal(10,2))
BEGIN
  set @exite = (select cantidad from Detalle where id_Cliente=idC and id_Producto=idP);
  if(@exite !=0) then
    update Carrito set cantidad=@exite+cant where id_Cliente=idC and id_Producto=idP;
  else
    insert into Carrito VALUES (idC, idP, cant);
  end if;
end $$
DELIMITER ;

