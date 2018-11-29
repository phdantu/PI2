<?php
	include_once 'Livro.class.php';
	include_once './DAO/LivroDAO.php';
	
	if (version_compare(phpversion(), '7.1', '>=')) {
    	ini_set( 'serialize_precision', -1 );
	}
	
	
	$request_method=$_SERVER["REQUEST_METHOD"];
	switch($request_method)
	{
		case 'GET':
			// Se tem id, busca o produto por id
			if(!empty($_GET["id"]))
			{
                //converte para int
				$id=intval($_GET["id"]);
				$dao= new LivroDAO;		
				$livro = $dao->buscarPorId($id);
				
				$livro_json = json_encode($livro);
				header('Content-Type:application/json');
				echo($livro_json);
			}
			//senão, retorna todos os livros
			else
			{
				$dao= new LivroDAO;
				$livro =  $dao->listar();	
				$livro_json = json_encode($livro);
				header('Content-Type:application/json');
				echo($livro_json);
			}
            break;
            case 'POST':
			$data = file_get_contents("php://input");
			$var = json_decode($data);
			//if(verificaSeEstaVazio($var->idLivro) || verificaSeEstaVazio($var->isbn) || verificaSeEstaVazio($var->nome) || verificaSeEstaVazio($var->ano) || verificaSeEstaVazio($var->editora) || verificaSeEstaVazio($var->idAutor)){
			//	echo "Não é possível inserir campos vazios.";
			//}else{
				$livro = new Livro($var->idLivro,$var->isbn, $var->nome, $var->editora,$var->ano,$var->idAutor);
			
				$dao= new LivroDAO;
				$livro = $dao->inserir($livro);
				$livro_json = json_encode($livro);
				header('HTTP/1.1 201 Created');
				header('Content-Type:application/json');
				echo($livro_json);
			//}
			
			break;
		case 'PUT':
			if(!empty($_GET["id"]))
			{
                $id=intval($_GET["id"]);
                //le o conteudo de um arquivo
                $data = file_get_contents("php://input");
                //retira de json
				$var = json_decode($data);
					$livro = new Livro($id, $var->isbn, $var->nome, $var->editora,$var->ano,$var->idAutor);
					$dao= new LivroDAO;
					$dao->atualizar($livro);
					//transforma em json
					$livro_json = json_encode($livro);
					header('Content-Type:application/json');
					echo($livro_json);			
			}
			break;
		case 'DELETE':
			if(!empty($_GET["id"]))
			{
				$id=intval($_GET["id"]);
			
				$dao= new LivroDAO;
				$livro = $dao->buscarPorId($id);
				$dao->deletar($id);				
				
				$livro_json = json_encode($livro);
				header('Content-Type:application/json');
				echo($livro_json);
				
			}
			break;
		default:
			// Invalid Request Method
			header("HTTP/1.0 405 Method Not Allowed");
			break;
	}
 
?>