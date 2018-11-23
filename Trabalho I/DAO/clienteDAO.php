<?php
    include_once 'cliente.php';
	include_once 'PDOFactory.php';

    class clienteDAO
    {
        //INSERIR OK
        public function inserir(Cliente $cliente)
        {
            
            $qInserir = "INSERT INTO cliente(matricula,nome,telefone) VALUES (:matricula,:nome,:telefone);";
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qInserir);
            $comando->bindParam(":matricula",$cliente->matricula);
            $comando->bindParam(":nome",$cliente->nome);
            $comando->bindParam(":telefone",$cliente->telefone);
            $comando->execute();
            $cliente->idCliente = $pdo->lastInsertId();
            return $cliente;
        }
        
        public function deletar($id)
        {
            
            $qDeletar = "DELETE from cliente WHERE idCliente=:id";              
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qDeletar);
            $comando->bindParam(":id",$id);
            $comando->execute();
        }
        
        public function atualizar(cliente $cliente)
        {
                      
            $qAtualizar = "UPDATE cliente SET matricula=:matricula,nome=:nome, telefone=:telefone WHERE idCliente=:idCliente";            
            
            $pdo = PDOFactory::getConexao();
            $comando = $pdo->prepare($qAtualizar);
            $comando->bindParam(":matricula",$cliente->matricula);
            $comando->bindParam(":nome",$cliente->nome);
            $comando->bindParam(":telefone",$cliente->telefone);
            $comando->bindParam(":idCliente",$cliente->idCliente);
            $comando->execute();        
        }
        //LISTAR OK
        public function listar()
        {
            $query = 'SELECT * FROM cliente';
    		$pdo = PDOFactory::getConexao();
	    	$comando = $pdo->prepare($query);
    		$comando->execute();
            $cliente=array();	
		    while($row = $comando->fetch(PDO::FETCH_OBJ)){
			    $cliente[] = new cliente($row->idCliente,$row->matricula,$row->nome,$row->telefone);
            }
            return $cliente;
        }
        //BUSCARPORID OK
        public function buscarPorId($id)
        {
 		    $query = 'SELECT * FROM cliente WHERE idCliente=:id';		
            $pdo = PDOFactory::getConexao(); 
		    $comando = $pdo->prepare($query);
		    $comando->bindParam ('id', $id);
		    $comando->execute();
		    $result = $comando->fetch(PDO::FETCH_OBJ);
		    return new cliente($result->idCliente,$result->matricula,$result->nome,$result->telefone);           
        }
    }
?>