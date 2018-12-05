var formcadastro = document.querySelector("#formcadastro");
document.getElementById("btnAlterar").addEventListener("click", function pegaDados(){
    formcadastro.onsubmit = function(event){
        event.preventDefault();
        console.log("Trata formulario");
        
        var livro = {};
        livro.idLivro = document.querySelector("#idLivro").value;
        livro.isbn = document.querySelector("#isbn").value;
        livro.nome = document.querySelector("#nome").value;
        livro.editora = document.querySelector("#editora").value;
        livro.ano = document.querySelector("#ano").value;
        livro.idAutor = document.querySelector("#idAutor").value;
        
        //console.log(livro);
        montaCamposAlterarEPreenche(livro);
    }
});
formcadastro.onsubmit = function(event){
    event.preventDefault();
    console.log("Trata formulario");

    var livro = {};
    livro.idLivro = document.querySelector("#idLivro").value;
    livro.isbn = document.querySelector("#isbn").value;
    livro.nome = document.querySelector("#nome").value;
    livro.editora = document.querySelector("#editora").value;
    livro.ano = document.querySelector("#ano").value;
    livro.idAutor = document.querySelector("#idAutor").value;
    
    console.log(livro);
    enviarLivro(livro);
}

function enviarLivro(livro){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            //Tratar as ações após a comunicação com o servidor
            limparFormulario();
            carregarLivros();
        }
    };
    xhttp.open("POST", "http://localhost/PI2/Trabalho%20I/livro", true);
    xhttp.setRequestHeader("Content-Type","application/json")
    xhttp.send(JSON.stringify(livro));
}

function limparFormulario(){
    document.querySelector("#idLivro").value="";
    document.querySelector("#isbn").value="";
    document.querySelector("#nome").value="";
    document.querySelector("#editora").value=""; 
    document.querySelector("#ano").value=""; 
    document.querySelector("#idAutor").value="";

    var btnCadastro = document.getElementById("btnCadastrar");
    var btn = document.getElementById("btnAlterar");
    
    var attr = document.createAttribute("disabled");
    btn.attributes.setNamedItem(attr);
    btnCadastro.attributes.removeNamedItem("disabled");

}

var body = document.querySelector("body");
body.onload = function () {
    carregarLivros();
}

function carregarLivros() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            carregarAutores(JSON.parse(this.responseText));            
        }
    };
    xhttp.open("GET", "http://localhost/PI2/Trabalho%20I/livro", true);
    xhttp.send();
}
function carregarAutores(livro) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {     
            montarTabela(livro,JSON.parse(this.responseText));          
        }
    };
    xhttp.open("GET", "http://localhost/PI2/Trabalho%20I/autor", true);
    xhttp.send();
}

function montarTabela(livros,autores){
    console.log(livros);
    console.log(autores);
    var str="";
    str+= "<table class='table table-striped table-bordered lista-clientes'>";
    str+= "<tr>";
    str+= "<th scope='col'>ID</th>";
    str+= "<th scope='col'>ISBN</th>";
    str+= "<th scope='col'>Nome</th>";
    str+= "<th scope='col'>Editora</th>";
    str+= "<th scope='col'>Ano</th>";
    str+= "<th scope='col'>Autor</th>";
    str+= "</tr>";

    for(var i=0; i<livros.length; i++){
    //for(var i in livros){
        str+="<tbody>";
        str+="<tr>";
        str+="<th scope='row'>"+livros[i].idLivro+"</th>";
        str+="<td>"+livros[i].isbn+"</td>";
        str+="<td>"+livros[i].nome+"</td>";
        str+="<td>"+livros[i].editora+"</td>";
        str+="<td>"+livros[i].ano+"</td>";
            //str+=livros[i].idAutor;
            str+="<td><li class='list-group-item'>"+autores[livros[i].idAutor-1].idAutor+"</li>";
            str+="<li class='list-group-item'>"+autores[livros[i].idAutor-1].nome+"</li>";
            str+="<li class='list-group-item'>"+autores[livros[i].idAutor-1].pais+"</li>";
            str+="</td>";
        str+="<td><button onclick='CarregaAlterarLivro("+livros[i].idLivro+")' id='botaoAlterar' type='button' class='btn btn-primary col-md-12'>Alterar</button></td>";
        str+="<td><button onclick='DeletarLivro("+livros[i].idLivro+")' id='botaoDeletar' type='button' class='btn btn-danger col-md-12'>Deletar</button></td>";
        str+="</tr>";
        str+="</tbody>";
    } 
    str+= "</table>";

    

    var tabelamlivros = document.querySelector("#tabelalivros");
    tabelalivros.innerHTML = str;
}
function CarregaAlterarLivro(valorLivro){
    console.log(valorLivro);
    
    var btnCadastro = document.getElementById("btnCadastrar");
    var attr = document.createAttribute("disabled");
    btnCadastro.attributes.setNamedItem(attr);
    var btn = document.getElementById("btnAlterar");
    console.log(btn);
    if(document.getElementById("btnAlterar").attributes["disabled"]){
        btn.attributes.removeNamedItem("disabled");
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            montaCampos(JSON.parse(this.responseText));
        }
    }
    xhttp.open("GET", "http://localhost/PI2/Trabalho%20I/livro/"+valorLivro, true);
    xhttp.send();
}
function montaCampos(livro){

    document.querySelector("#idLivro").value=livro.idLivro;
    document.querySelector("#isbn").value=livro.isbn;
    document.querySelector("#nome").value=livro.nome;
    document.querySelector("#editora").value=livro.editora;
    document.querySelector("#ano").value=livro.ano;
    document.querySelector("#idAutor").value=livro.idAutor;

    //montaCamposAlterarEPreenche(livro);
}
function montaCamposAlterarEPreenche(livro){
    
    if(livro != null){
        
        console.log(livro);
        AlteraLivro(livro);
        //}
    }
}
function AlteraLivro(livro){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            limparFormulario();
            carregarLivros();
        }
    }
    var url = "http://localhost/PI2/Trabalho%20I/livro/"+livro.idLivro;
    xhttp.open("PUT", url, true);
    xhttp.setRequestHeader("Content-Type","application/json")
    xhttp.send(JSON.stringify(livro));
}


function DeletarLivro(valorLivro){
    console.log(valorLivro);
    var teste = confirm ("Tem certeza que deseja deletar o item "+valorLivro+"?");
    if(teste == true){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                carregarLivros();
            }
        }
    
    xhttp.open("DELETE", "http://localhost/PI2/Trabalho%20I/livro/"+valorLivro, true);
    xhttp.send();
    }
}