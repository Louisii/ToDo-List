// form
const todoForm = document.querySelector('.todo-form')

// input recebe a tarefa
const todoInput = document.querySelector('.todo-input')

// <ul> onde serão escritas as tarefas
const todoItemsList = document.querySelector('.todo-items')


//array com todas as tarefas
let todos = [];

// botão de adicionar tarefa (+)
todoForm.addEventListener('submit', function(event) {
  event.preventDefault();

  //chama função que adiciona tarefa do input
  addTodo(todoInput.value); 

})

//função para adicionar tarefa
const addTodo = (item) => {

  //verifica se o todoInput recebe um falor diferente de vazio
  if (item !== '') {
    
    //objeto tarefa com id, nome, e conclusão
    const todo = {
      id: Date.now(), 
      name: item,
      completed: false
    }
  
    //adiciona o objeto tarefa dentro do array de tarefas
    todos.push(todo)
    //salva array de tarefas no localStorage
    addToLocalStorage(todos)
    
    //limpa a caixa de texto todoImput
    todoInput.value = ''
  }
}


//funcâo para exibir a lista de tarefas
const renderTodos = (todos) => {

  //limpa tudo dentro da tag <ul> com class= todo-items
  todoItemsList.innerHTML = ''
  
  //percorre pelos items do array de tarefas
  todos.forEach(function(item) {
  
    //verifica se a tarefa esta concluida
    const checked = item.completed ? 'checked': null
  
    //cria a tag <li></li>
    const li = document.createElement('li')
  
    //adiciona class="item" ao elemento <li>
    li.setAttribute('class', 'item')
    //atribui uma data-key ao elemento <li>
    li.setAttribute('data-key', item.id)
  
    //se a tarefa estiver concluida adiciona class checked para riscar a tarefa
    if (item.completed === true) {
  
      li.classList.add('checked')
    }
  
    li.innerHTML = `
      <input type="checkbox" class="checkbox" ${checked}>
      ${item.name}
      <button class="delete-button">X</button>
    `;
    //adiciona <li> à <ul>
    todoItemsList.append(li)
  });
}

//função que adiciona array de tarefas no localStorage
const addToLocalStorage = (todos) => {

  //transforma array em string
  localStorage.setItem('todos', JSON.stringify(todos))
  //chama a funcâo para exibir a lista de tarefas
  renderTodos(todos)
}

//funÇão para pegar tarefas do localStorage
const getFromLocalStorage = () => {
  
  const reference = localStorage.getItem('todos')
  //se existirem tarefas no localStorage trasnformar de volta em array de objetos
  if (reference) {
    todos = JSON.parse(reference);
    //chama a funcâo para exibir a lista de tarefas
    renderTodos(todos)
  }
}


//muda o valor de não concluido e concluido
const toggle = (id) =>{

  todos.forEach(function(item) {
    // usar == e não === pois são tipos diferentes, number e string
    if (item.id == id) {
      //muda o valor
      item.completed = !item.completed
    }
  });

  addToLocalStorage(todos)
}

//funçâo para deletar tarefa da lista de tarefas
const deleteTodo = (id) => {

  let confirm = window.confirm('Tem certeza que deseja apagar a tarefa?')

  //confirmar para pegar tarefa
  if (!confirm){

    return;

  }else if(confirm){

    //filtra pelo id e atualiza o array
  todos = todos.filter(function(item) {
    return item.id != id
  });

  addToLocalStorage(todos)
  }
  
}



//botões de apagar e tarefas concluidas
getFromLocalStorage()

todoItemsList.addEventListener('click', function(event) {

  if (event.target.type === 'checkbox') {
    toggle(event.target.parentElement.getAttribute('data-key'))
  }

  if (event.target.classList.contains('delete-button')) {
    deleteTodo(event.target.parentElement.getAttribute('data-key'))
  }
})
