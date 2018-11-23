<?php
    include_once 'Livro.php';
	include_once 'PDOFactory.php';
    class LivroDAO
    {
        //INSERIR OK
        public function inserir(Livro $livro)
        {
            
            $qInserir = "INSERT INTO livro(isbn,nome,editora,ano,idAutor) VALUES (:isbn,:nome,:editora,:ano,:idAutor);";
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInserir);
            $comando->bindParam(":isbn",$livro->isbn);
            $comando->bindParam(":nome",$livro->nome);
            $comando->bindParam(":editora",$livro->editora);
            $comando->bindParam(":ano",$livro->ano);
            $comando->bindParam(":idAutor",$livro->idAutor);
            $comando->execute();
            $livro->idLivro = $pdo->lastInsertId();
            return $livro;
        }
        //DELETE OK
        public function deletar($id)
        {
            
            $qDeletar = "DELETE from livro WHERE idLivro=:id";              
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDeletar);
            $comando->bindParam(":id",$id);
            $comando->execute();
        }
        //ATUALIZAR OK
        public function atualizar(Livro $livro)
        {
                      
            $qAtualizar = "UPDATE livro SET isbn=:isbn,nome=:nome, editora=:editora,ano=:ano,idAutor=:idAutor WHERE idLivro=:idLivro";            
            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qAtualizar);
            $comando->bindParam(":isbn",$livro->isbn);
            $comando->bindParam(":nome",$livro->nome);
            $comando->bindParam(":editora",$livro->editora);
            $comando->bindParam(":ano",$livro->ano);
            $comando->bindParam(":idAutor",$livro->idAutor);
            $comando->bindParam(":idLivro",$livro->idLivro);
            $comando->execute();        
        }
        //LISTAR OK
        public function listar()
        {
            $query = 'SELECT * FROM livro';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $livro=array();	
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $livro[] = new Livro($row->idLivro,$row->isbn,$row->nome,$row->editora,$row->ano,$row->idAutor);
            }
            return $livro;
        }
        //BUSCARPORID OK
        public function buscarPorId($id)
        {
 		    $query = 'SELECT * FROM livro WHERE idLivro=:id';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('id', $id);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new Livro($result->idLivro,$result->isbn,$result->nome,$result->editora,$result->ano,$result->idAutor);           
        }
    }
?>