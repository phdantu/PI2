<?php
    include_once 'autor.php';
	include_once 'PDOFactory.php';
    class AutorDAO
    {
        //INSERIR OK
        public function inserir(Autor $autor)
        {
            
            $qInserir = "INSERT INTO autor(idAutor,nome,pais) VALUES (:idAutor,:nome,:pais);";
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInserir);
            $comando->bindParam(":idAutor",$autor->idAutor);
            $comando->bindParam(":nome",$autor->nome);
            $comando->bindParam(":pais",$autor->pais);
            $comando->execute();
            $autor->idAutor = $pdo->lastInsertId();
            return $autor;
        }
        //DELETE OK
        public function deletar($id)
        {
            
            $qDeletar = "DELETE from autor WHERE idAutor=:id";              
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDeletar);
            $comando->bindParam(":id",$id);
            $comando->execute();
        }
        //ATUALIZAR OK
        public function atualizar(Autor $autor)
        {
                      
            $qAtualizar = "UPDATE autor SET nome=:nome, pais=:pais WHERE idAutor=:idAutor";            
            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qAtualizar);
            $comando->bindParam(":idAutor",$autor->idAutor);
            $comando->bindParam(":nome",$autor->nome);
            $comando->bindParam(":pais",$autor->pais);
            $comando->execute();        
        }
        //LISTAR OK
        public function listar()
        {
            $query = 'SELECT * FROM autor';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $autor=array();	
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $autor[] = new Autor($row->idAutor, $row->nome, $row->pais);
            }
            return $autor;
        }
        //BUSCARPORID OK
        public function buscarPorId($id)
        {
 		    $query = 'SELECT * FROM autor WHERE idAutor=:id';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('id', $id);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new Autor($result->idAutor,$result->nome,$result->pais);           
        }
    }
?>