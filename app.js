
var todoLists = [];
var id = 1;

btnAdd.addEventListener("click", function(){
	let todo = {
		id: id++,
		value: txtTodo.value,
		complete: false
	};
	todoLists.push(todo);
	console.log(todoLists);
	updateTodo();
});

function updateTodo(){
	todos.innerHTML = "";
	fetch("http://localhost:61345/todos", function(todoListServer){
		todoLists = todoListServer;
		todoLists.forEach(function(el){
		let li = "";
		if(el.complete){
			li = `<li id="${el.ID}" class="complete">${el.Value} <span class="btn-delete">x</span></li>`;
		}else{
			li = `<li id="${el.ID}">${el.Value} <span class="btn-delete">x</span></li>`;
		}
		todos.innerHTML += li; // String template
	});
	});
}

todos.addEventListener("click", function(e){
	if(e.target.localName === "li"){
		todoLists.forEach(function(el){
			if(el.id == e.target.id) { 
				fetch(`http://localhost:61345/todos/${el.id}/completed`, function(data){
					el.complete = true;
				});
			}
		});
	}
	updateTodo();
});

btn-delete.addEventListener("click", function(e){
	if(e.target.localName === "li"){
		todoLists.forEach(function(el){
			if(el.id == e.target.id) { 
				fetch(`http://localhost:61345/todos/${el.id}/delete`, function(data){
					alert("Success Delete");
				});
			}
		});
	}
	updateTodo();
});

updateTodo();