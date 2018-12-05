<?php 
class Autor{
    public $idAutor;
    public $nome;
    public $pais;
    function __construct($idAutor,$nome,$pais){
        $this->idAutor = $idAutor;
        $this->nome = $nome;
        $this->pais = $pais;
    }
}

?>