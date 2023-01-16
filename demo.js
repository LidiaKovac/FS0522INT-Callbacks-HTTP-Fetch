//https://dummyjson.com/todo

//!Let's to it as a team!
const getTodos = () => {
    fetch("https://dummyjson.com/todos", {
        method: "GET",
        headers: {
            // "Content-Type": "application/json", // <<< not needed for now
            'X-RapidAPI-Key': 'f54a218158msh5072da15811d1e6p1f9883jsna5545c732f50',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }

    }).then((rawTasks)=> {
        return rawTasks.json()
    }).then((jsonTasks)=> {
        console.log(jsonTasks.todos) //NOT an array
        // {todos: []} < array is here
        /* {
            "id":1,
            "todo":"Do something nice for someone I care about",
            "completed":true,
            "userId":26
        }*/
        let ul = document.querySelector("ul")
        for(let i = 0; i < jsonTasks.todos.length; i++) {
            let singleTask = jsonTasks.todos[i]
            let li = document.createElement("li")
            li.innerText = singleTask.todo
            ul.appendChild(li)
            // ul.innerHTML += `<li> ${singleTask.todo} </li>`
        }
    }).catch(err => console.log(err))
}

getTodos()