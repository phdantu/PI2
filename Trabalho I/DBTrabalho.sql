INSERT INTO livro(isbn,nome,editora,ano,idAutor) VALUES (:isbn,:nome,:editora,:ano,:idAutor);
create table cliente(
	idCliente int AUTO_INCREMENT PRIMARY KEY,
	matricula int,
	nome varchar(100),
	telefone int
);
create table autor(
	idAutor int AUTO_INCREMENT PRIMARY KEY,
	nome varchar(100),
	pais varchar(40)
);
create table livro(
	idLivro int AUTO_INCREMENT PRIMARY KEY,
	isbn int,
	nome varchar(100),
	editora varchar (60),
	ano int,
	idAutor int references autor(idautor)
);
create table emprestimo(
	idEmprestimo int AUTO_INCREMENT PRIMARY KEY,
	status int,
	idLivro int references livro(idLivro),
	idCliente int references cliente(idCliente)
);

create table usuario(
	idUsuario int AUTO_INCREMENT PRIMARY KEY,
	nome varchar(100),
	senha varchar(60)
);

INSERT INTO autor(nome,pais) VALUES ("JK Rowling","England");
INSERT INTO autor(nome,pais) VALUES ("Cristopher Paolini","USA");

INSERT INTO livro(isbn,nome,editora,ano,idAutor) VALUES (123456789,"Eldest","Rocco",2006,"2");

INSERT INTO cliente(matricula,nome,telefone) VALUES (123,"Danton",5112121212);
