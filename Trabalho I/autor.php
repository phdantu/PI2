<?php
	include_once 'Autor.class.php';
	include_once './DAO/AutorDAO.php';
	
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
				$dao= new AutorDAO;		
				$autor = $dao->buscarPorId($id);

				$autor_json = json_encode($autor);
				header('Content-Type:application/json');
				echo($autor_json);
			}
			//senão, retorna todos os Autors
			else
			{
				$dao= new AutorDAO;
				$autor =  $dao->listar();	
				$autor_json = json_encode($autor);
				header('Content-Type:application/json');
				echo($autor_json);
			}
            break;
            case 'POST':
			$data = file_get_contents("php://input");
			$var = json_decode($data);
				$autor = new Autor($id, $var->nome, $var->pais);
			
				$dao= new AutorDAO;
				$autor = $dao->inserir($autor);
				$autor_json = json_encode($autor);
				header('HTTP/1.1 201 Created');
				header('Content-Type:application/json');
				echo($autor_json);
			
			break;
		case 'PUT':
			if(!empty($_GET["id"]))
			{
                $id=intval($_GET["id"]);
                //le o conteudo de um arquivo
                $data = file_get_contents("php://input");
                //retira de json
				$var = json_decode($data);
				$autor = new Autor($id, $var->nome, $var->pais);
				$dao= new AutorDAO;
				$dao->atualizar($autor);
				//transforma em json
				$autor_json = json_encode($autor);
				header('Content-Type:application/json');
				echo($autor_json);			
			}
			break;
		case 'DELETE':
			if(!empty($_GET["id"]))
			{
				$id=intval($_GET["id"]);
			
				$dao= new AutorDAO;
				$autor = $dao->buscarPorId($id);
				$dao->deletar($id);				
				
				$autor_json = json_encode($autor);
				header('Content-Type:application/json');
				echo($autor_json);
				
			}
			break;
		default:
			// Invalid Request Method
			header("HTTP/1.0 405 Method Not Allowed");
			break;
	}
 
?>