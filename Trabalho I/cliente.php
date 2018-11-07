<?php
	include_once 'cliente.class.php';
	include_once './DAO/clienteDAO.php';
	include_once 'functions.php';
	
	if (version_compare(phpversion(), '7.1', '>=')) {
    	ini_set( 'serialize_precision', -1 );
	}
	 
	$request_method=$_SERVER["REQUEST_METHOD"];
	switch($request_method) 
	{
		case 'GET':
			
			if(!empty($_GET["id"]))
			{
               
				$id=intval($_GET["id"]);

				$dao= new clienteDAO;		
				$cliente = $dao->buscarPorId($id);
				
				$cliente_json = json_encode($cliente);
				header('Content-Type:application/json');
				echo($cliente_json);
			}
			
			else
			{
				$dao= new clienteDAO;
				$cliente =  $dao->listar();	

				$cliente_json = json_encode($cliente);
				header('Content-Type:application/json');
				echo($cliente_json);
			}
            break;
            case 'POST':
			$data = file_get_contents("php://input");
			$var = json_decode($data);
			if(verificaSeEstaVazio($var->idCliente) || verificaSeEstaVazio($var->matricula) || verificaSeEstaVazio($var->nome) || verificaSeEstaVazio($var->telefone)){
				echo "Não é possível inserir campos vazios.";
			}else{
				$cliente = new cliente($var->idCliente,$var->matricula, $var->nome, $var->telefone);
				$dao= new clienteDAO;
				$cliente = $dao->inserir($cliente);

				$cliente_json = json_encode($cliente);
				header('HTTP/1.1 201 Created');
				header('Content-Type:application/json');
				echo($cliente_json);
			}
			
			
			break;
			//UPDATE OK
		case 'PUT':
			if(!empty($_GET["id"]))
			{
				$id=intval($_GET["id"]);
				//le o conteudo de um arquivo
				$data = file_get_contents("php://input");
				//retira de json
				$var = json_decode($data);
				if(verificaSeEstaVazio($id) || verificaSeEstaVazio($var->idCliente) || verificaSeEstaVazio($var->matricula) || verificaSeEstaVazio($var->nome) || verificaSeEstaVazio($var->telefone)){
					echo "Não é possível editar campos vazios.";
				}else{
					$cliente = new Cliente($id, $var->matricula, $var->nome,$var->telefone);

					$dao= new clienteDAO;
					$dao->atualizar($cliente);
					//transforma em json
					$cliente_json = json_encode($cliente);
					header('Content-Type:application/json');
					echo($cliente_json);	
				}			
			}
			break;
			//DELETE OK
		case 'DELETE':
			if(!empty($_GET["id"]))
			{
				$id=intval($_GET["id"]);
				if(verificaSeEstaVazio($id)){
					echo "Campo vazio.";
				}else{
					$dao= new clienteDAO;
					$cliente = $dao->buscarPorId($id);
					$dao->deletar($id);				
					
					$cliente_json = json_encode($cliente);
					header('Content-Type:application/json');
					echo($cliente_json);
				}
			}
			break;
		default:
			// Invalid Request Method
			header("HTTP/1.0 405 Method Not Allowed");
			break;
	}
	



?>