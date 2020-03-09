
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
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(todo)
	})
		.then(response => response.json())
		.then(data => {
			alert(data);
			updateTodo();
		});
	
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

$("#todos").on("click", "li", function(e){
	todoLists.forEach(function(el){
		if(el.ID == e.target.id) { 
			fetch(`http://localhost:61345/todos/${el.ID}/completed`)
			.then(response => response.json())
			.then(data => {
				el.Complete = true;
				alert(data);
			});
		}
	});
	updateTodo();
});

$("#todos").on("click", ".btn-delete",function(e){
	let li = $(this).parent("li");
	console.log(li.attr("id"));
	todoLists.forEach(function(el){
		if(el.ID == li.attr("id")) { 
			fetch(`http://localhost:61345/todos/${el.ID}/delete`)
			.then(response => response.json())
			.then(data => {
				el.Complete = true;
				alert(data);
			});
		}
	});
	updateTodo();
});

updateTodo();