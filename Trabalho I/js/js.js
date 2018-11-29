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

    var btn = document.getElementById("btnAlterar");
    
    var attr = document.createAttribute("disabled");
    btn.attributes.setNamedItem(attr);

    /*document.querySelector("#idLivroAltera").value="";
    document.querySelector("#isbnAltera").value="";
    document.querySelector("#nomeAltera").value="";
    document.querySelector("#editoraAltera").value=""; 
    document.querySelector("#anoAltera").value=""; 
    document.querySelector("#idAutorAltera").value="";  */

}

var body = document.querySelector("body");
body.onload = function () {
    carregarLivros();
}

function carregarLivros() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            montarTabela(JSON.parse(this.responseText));            
        }
    };
    xhttp.open("GET", "http://localhost/PI2/Trabalho%20I/livro", true);
    xhttp.send();
}

function montarTabela(livros){
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

    //for(var i=0; i<livros.length; i++)
    for(var i in livros){
        str+="<tbody>";
        str+="<tr>";
        str+="<th scope='row'>"+livros[i].idLivro+"</th>";
        str+="<td>"+livros[i].isbn+"</td>";
        str+="<td>"+livros[i].nome+"</td>";
        str+="<td>"+livros[i].editora+"</td>";
        str+="<td>"+livros[i].ano+"</td>";
        str+="<td>"+livros[i].idAutor+"</td>";
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
    /* var string="";
    string+='<form id="formCadastroAlterar">';
    string+='<label class="col-md-1" for="nome">Id:</label>';    
    string+='<input class="col-md-2" type="text" id="idLivroAltera"/> <br/>';
    string+='<label class="col-md-1"for="isbn">ISBN:</label>';
    string+='<input class="col-md-2" type="text" id="isbnAltera"/> <br/>';
    string+='<label class="col-md-1"for="nome">Nome:</label>';
    string+='<input class="col-md-2" type="text" id="nomeAltera"/> <br/>';
    string+='<label class="col-md-1"for="editora">Editora:</label>';
    string+='<input class="col-md-2" type="text" id="editoraAltera"/> <br/>';
    string+='<label class="col-md-1"for="ano">Ano:</label>';   
    string+='<input class="col-md-2" type="text" id="anoAltera"/> <br/>';
    string+='<label class="col-md-1"for="autor">Autor:</label>';
    string+='<input class="col-md-2" type="text" id="idAutorAltera"/> <br/><br/>';
    string+='<input class="col-md-offset-3 col-md-2 btn btn-primary" type="submit"/><br/><br/>';
    string+='</form>'; */

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
        /* var camposAlteraLivro = document.querySelector("#camposAlteraLivro");
        camposAlteraLivro.innerHTML = string;
        document.querySelector("#idLivroAltera").value=livro.idLivro;
        document.querySelector("#isbnAltera").value=livro.isbn;
        document.querySelector("#nomeAltera").value=livro.nome;
        document.querySelector("#editoraAltera").value=livro.editora;
        document.querySelector("#anoAltera").value=livro.ano;
        document.querySelector("#idAutorAltera").value=livro.idAutor;

        var formCadastroAlterar = document.querySelector("#formcadastro");
        formCadastroAlterar.onsubmit = function(event){
        event.preventDefault();

        var livro = {};
        livro.idLivro = document.querySelector("#idLivroAltera").value;
        livro.isbn = document.querySelector("#isbnAltera").value;
        livro.nome = document.querySelector("#nomeAltera").value;
        livro.editora = document.querySelector("#editoraAltera").value;
        livro.ano = document.querySelector("#anoAltera").value;
        livro.idAutor = document.querySelector("#idAutorAltera").value; */
        
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
//-------------------------------------------------------------------------------------
/* var formcliente = document.querySelector("#formcliente");
formcliente.onsubmit = function(event){
    event.preventDefault();
    console.log("Trata formulario cliente");

    var cliente = {};
    cliente.idLivro = document.querySelector("#idLivro").value;
    cliente.isbn = document.querySelector("#isbn").value;
    cliente.nome = document.querySelector("#nome").value;
    cliente.editora = document.querySelector("#editora").value;
    cliente.ano = document.querySelector("#ano").value;
    cliente.idAutor = document.querySelector("#idAutor").value;
    
    console.log(cliente);
    enviarLivro(cliente);
}

function enviarLivro(cliente){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            //Tratar as ações após a comunicação com o servidor
            console.log("Chegou aqui");
            limparFormulario();
            carregarLivros();
        }
    };
    xhttp.open("POST", "http://localhost/PI2/Trabalho%20I/livro", true);
    xhttp.setRequestHeader("Content-Type","application/json")
    xhttp.send(JSON.stringify(cliente));
}

function limparFormulario(){
    document.querySelector("#idLivro").value="";
    document.querySelector("#isbn").value="";
    document.querySelector("#nome").value="";
    document.querySelector("#editora").value=""; 
    document.querySelector("#ano").value=""; 
    document.querySelector("#idAutor").value="";    
}

var body = document.querySelector("body");
body.onload = function () {
    carregarClientes();
}

function carregarClientes() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            montarTabela(JSON.parse(this.responseText));            
        }
    };
    xhttp.open("GET", "http://localhost/PI2/Trabalho%20I/cliente", true);
    xhttp.send();
}

function montarTabela(clientes){
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

    //for(var i=0; i<livros.length; i++)
    for(var i in clientes){
        str+="<tbody>";
        str+="<tr>";
        str+="<th scope='row'>"+clientes[i].idLivro+"</th>";
        str+="<td>"+clientes[i].isbn+"</td>";
        str+="<td>"+clientes[i].nome+"</td>";
        str+="<td>"+clientes[i].editora+"</td>";
        str+="<td>"+clientes[i].ano+"</td>";
        str+="<td>"+clientes[i].idAutor+"</td>";
        str+="</tr>";
        str+="</tbody>";
    } 
    str+= "</table>";

    var tabelaclientes = document.querySelector("#tabelaclientes");
    tabelaclientes.innerHTML = str;
} */