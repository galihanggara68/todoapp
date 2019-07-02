
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
	todoLists.forEach(function(el){
		let li = "";
		if(el.complete){
			li = `<li id="${el.id}" class="complete">${el.value}</li>`;
		}else{
			li = `<li id="${el.id}">${el.value}</li>`;
		}
		todos.innerHTML += li; // String template
	});
}

todos.addEventListener("click", function(e){
	if(e.target.localName === "li"){
		todoLists.forEach(function(el){
			if(el.id == e.target.id) el.complete = true;
		});
	}
	updateTodo();
});