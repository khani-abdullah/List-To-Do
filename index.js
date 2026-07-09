const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const filterSelect = document.getElementById("filterSelect");


function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function applyFilter() {
  const selected = filterSelect.value.toLowerCase();
  const allTasks = taskList.children;
  for (let task of allTasks) {
    if (selected === "all") {
      task.style.display = "flex";
    } else {
      task.style.display = task.dataset.status === selected ? "flex" : "none";
    }
  }
}

filterSelect.addEventListener("change", applyFilter);

function renderTask(task) {
  const wrapper = document.createElement("div");
  wrapper.className =
    "bg-[#C4BABA40] flex flex-wrap border-[1px] max-w-[735px] w-full rounded-[85px] justify-between px-[33px] p-4 mx-auto";
  wrapper.dataset.status = task.status;

  const p = document.createElement("p");
  p.id = `task${task.id}`;
  p.className = "text-white text-[40px] font-normal flex-1 break-all";
  p.textContent = task.text;
  p.style.textDecoration = task.status === "completed" ? "line-through" : "none";

  const iconContainer = document.createElement("div");
  iconContainer.className = "flex gap-[10px] justify-center items-center flex-shrink-0";
  const checkIcon = document.createElement("img");
  checkIcon.id = `icon${task.id}`;
  checkIcon.src = task.status === "completed" ? "../videos_imgs/check_mark.png" : "../videos_imgs/img 3 (repeat).png";
  checkIcon.alt = "check";
  checkIcon.className = "max-w-[50px] w-full cursor-pointer";

  const editIcon = document.createElement("img");
  editIcon.src = "../videos_imgs/edit.jpg";
  editIcon.alt = "edit";
  editIcon.className = "max-w-[50px] w-[full] cursor-pointer";

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "../videos_imgs/img 4 (repeat).png";
  deleteIcon.alt = "delete";
  deleteIcon.className = "max-w-[50px] w-full cursor-pointer";

  iconContainer.appendChild(checkIcon);
  iconContainer.appendChild(editIcon);
  iconContainer.appendChild(deleteIcon);

  wrapper.appendChild(p);
  wrapper.appendChild(iconContainer);
  taskList.prepend(wrapper);


  function showStatus() {
    task.status = task.status === "pending" ? "completed" : "pending";
    wrapper.dataset.status = task.status;
    checkIcon.src = task.status === "completed" ? "../videos_imgs/check_mark.png" : "../videos_imgs/img 3 (repeat).png";
    p.style.textDecoration = task.status === "completed" ? "line-through" : "none";
    saveTasks();
    applyFilter();
  };
  checkIcon.addEventListener("click", showStatus);

  function editTask() {
    p.contentEditable = true;
    p.focus();
  }
  editIcon.addEventListener("click", editTask);
  p.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      p.contentEditable = false;
      task.text = p.textContent;
      saveTasks();
    }
  });



  function deleteTask() {
    taskList.removeChild(wrapper);
    const index = tasks.findIndex(t => t.id === task.id);
    if (index !== -1) tasks.splice(index, 1);
    saveTasks();
  };
  deleteIcon.addEventListener("click", deleteTask);
}
function addTask(text) {
  const trimmed = text.trim();
  if (!trimmed) return;

  const newTask = { id: Date.now(), text: trimmed, status: "pending" };
  tasks.push(newTask);
  renderTask(newTask);
  taskInput.value = "";
  saveTasks();
  applyFilter();
}
taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    addTask(taskInput.value);
  }
});
addBtn.addEventListener("click", () => {
  addTask(taskInput.value);
});
tasks.forEach(renderTask);
