document.addEventListener("DOMContentLoaded",() =>{
    const storedTasks =JSON.parse(localStorage.getItem("tasks"));

    if(storedTasks){
        storedTasks.forEach((task) => tasks.push(task));
        updateTasksList();
        updateBar();
    }
})

let tasks = [];
let currentFilter = "all";



const saveTask = ()=>{
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

const addTask = ()=> {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    
    if(text){
        tasks.push({text: text, completed: false});
        updateTasksList();
        updateBar();
        saveTask();
    }
    else{
      alert("Please Enter Your Task !");
    }
    taskInput.value = "";   //clear input after adding
};

const toggleTestComplete = (index) =>{
    tasks[index].completed = !tasks[index].completed;
    updateTasksList();
    updateBar();
    saveTask();
};

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTasksList();
    updateBar();
    saveTask();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text;

    tasks.splice(index,1);
    updateTasksList();
    updateBar();
    saveTask();
};

const updateBar = ()=> {
    const completeTask = tasks.filter(task => task.completed).length;
    const totalTask = tasks.length;
    const progress = ( completeTask / totalTask ) * 100;
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`

    document.getElementById("number").innerText = `${completeTask} / ${totalTask}`;

    if(tasks.length && completeTask === totalTask){
        blaskConfetti();
    }
};

const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "active") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }
      
      filteredTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        
        listItem.innerHTML = `
        <div class = "taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class = "checkbox"${task.completed ? "checked" : "" }/>
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="edit_icon.png" onclick="editTask(${index})" />
                <img src="delete_icon.png" onclick="deleteTask(${index})" />
            </div>
        </div>
        `;
        listItem.addEventListener("change", () => toggleTestComplete(index));
        taskList.append(listItem);
      });

};

function setActiveFilterButton(filterId) {
    const buttons = document.querySelectorAll(".filter button");
    buttons.forEach(btn => btn.classList.remove("active"));
    document.getElementById(filterId).classList.add("active");
}

document.getElementById("newTask").addEventListener("click", function(e){
    e.preventDefault();
    addTask();
});

document.getElementById("all").addEventListener("click", () => {
      currentFilter = "all";
      updateTasksList();
      setActiveFilterButton("all");
});

document.getElementById("active").addEventListener("click", () => {
      currentFilter = "active";
      updateTasksList();
      setActiveFilterButton("active");
});

document.getElementById("completed").addEventListener("click", () => {
      currentFilter = "completed";
      updateTasksList();
      setActiveFilterButton("completed");
});

const blaskConfetti = ()=> {
    const count = 200,
    defaults = {
      origin: { y: 0.7 },
    };

  function fire(particleRatio, opts) {
    confetti(
      Object.assign({}, defaults, opts, {
        particleCount: Math.floor(count * particleRatio),
      })
    );
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}