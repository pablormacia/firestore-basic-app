import { saveTask, getTask, onGetTasks, deleteTask, updateTask } from "./firebase.js";

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");

let editStatus = false
let id = ""


window.addEventListener("DOMContentLoaded", async () => {
  //const querySnapshot = await getTasks()
  onGetTasks((querySnapshot) => {
    let html = "";
    querySnapshot.forEach((element) => {
      const task = element.data();
      html += `
        <div class="card card-body mt-2 border-primary">
        <h3 class="h5">${task.title}</h3>
        <p>${task.description}</h3>
        <div>
        <button class="btn btn-primary btn-delete" data-id="${element.id}">Delete</button>
        <button class="btn btn-secondary btn-edit" data-id="${element.id}">Edit</button>
        </div>
        </div>
        `;
      tasksContainer.innerHTML = html;

      const btnsDelete = tasksContainer.querySelectorAll(".btn-delete");
      

      btnsDelete.forEach((btn) =>
        btn.addEventListener("click", ({ target: { dataset } }) => {
          //console.log(e.target.dataset.id)
          //console.log(dataset.id)
          deleteTask(dataset.id);
        })
      );

      const btnsEdit = tasksContainer.querySelectorAll(".btn-edit");

      btnsEdit.forEach((btn) =>
        btn.addEventListener("click", async (e) => {
          //console.log(e.target.dataset.id)
          //console.log(dataset.id)
          const doc = await getTask(e.target.dataset.id)
          const task = doc.data()

          taskForm['task-title'].value = task.title
          taskForm['task-description'].value = task.description

          editStatus = true
          id =e.target.dataset.id

          taskForm['btn-task-save'].innerText = "Update"
        })
      );
    });
  });
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = taskForm["task-title"];
  const description = taskForm["task-description"];
  //console.log(title.value,description.value)

  if(!editStatus){
    saveTask(title.value, description.value);   
  }else{
    updateTask(id, {title: title.value, description: description.value})

    editStatus=false
  }
  taskForm.reset();
});
