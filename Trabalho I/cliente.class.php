<?php 
class Cliente{
    public $idCliente;
    public $matricula;
    public $nome;
    public $telefone;

    public function __construct($idCliente,$matricula, $nome, $telefone){
        $this->idCliente = $idCliente;
        $this->matricula = $matricula;
        $this->nome = $nome;
        $this->telefone = $telefone;
    }
}

?>