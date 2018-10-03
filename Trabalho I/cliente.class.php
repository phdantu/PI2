<?php 
class Cliente{
    public $matricula;
    public $nome;
    public $telefone

    function __construct($matricula, $nome, $telefone){
        $this->matricula = $matricula;
        $this->nome = $nome;
        $this->telefone = $telefone;
    }
}

?>