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
	ISBN int,
	nome varchar(100),
	editora varchar (60),
	ano int
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

