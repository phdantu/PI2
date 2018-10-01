var app = new Vue({
  el: '#app',
  data: {
      matricula: '',
      nome: '',
      telefone: '',
      title: 'Lista',
      list: [{ matricula: 'Matricula, Nome e Telefone',
              nome: '',
              telefone: ''}]
},
methods: {
  addTodo(){
      this.list.push({matricula: this.matricula}),
      this.list.push({nome: this.nome}),
      this.list.push({telefone: this.telefone})

  }
}
})