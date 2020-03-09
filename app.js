
var todoLists = [];
var id = 1;

btnAdd.addEventListener("click", function(){
	let todo = {
		id: todoLists[todoLists.length-1].ID+1,
		value: txtTodo.value,
		complete: false
	};
	todoLists.push(todo);
	fetch("http://localhost:61345/todos", {
		method: "POST",
		body: JSON.stringify(todo)
	})
		.then(response => response.json())
		.then(data => alert(data));
	console.log(todoLists);
	updateTodo();
});

function updateTodo(){
	todos.innerHTML = "";
	fetch("http://localhost:61345/todos").then((response) => {
		return response.json();
	}).then(data => {
		todoLists = data;
		console.log(todoLists);
		todoLists.forEach(function(el){
		let li = "";
		if(el.Complete){
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
				fetch(`http://localhost:61345/todos/${el.id}/completed`)
				.then(response => response.json())
				.then(data => {
					el.Complete = true;
					alert(data);
				});
			}
		});
	}
	updateTodo();
});

document.querySelectorAll(".btn-delete").forEach(function(el, i){
	el.addEventListener("click", function(e){
		if(e.target.localName === "li"){
			todoLists.forEach(function(el){
				if(el.id == e.target.id) { 
					fetch(`http://localhost:61345/todos/${el.id}/delete`)
					.then(response => response.json())
					.then(data => {
						el.Complete = true;
						alert(data);
					});
				}
			});
		}
		updateTodo();
	});
});

updateTodo();