<?php
class Livro(){
    public $isbn;
    public $nome;
    public $autor;
    public $editora;
    public $ano;

    public function __construct($isbn,$nome,$autor,$editora,$ano)
    {
        $this->isbn = $isbn;
        $this->nome = $nome;
        $this->autor = $autor;
        $this->editora = $editora;
        $this->ano = $ano;
    }

    
}
?>