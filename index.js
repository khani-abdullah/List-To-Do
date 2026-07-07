const tasks = [
  { id: 1, text: "Go for a walking", status: "pending" },
  { id: 2, text: "Do homework", status: "pending" },
  { id: 3, text: "Plan the party", status: "pending" }
];

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const filterSelect = document.getElementById("filterSelect");

function renderTask(task) {
  const wrapper = document.createElement("div");
  wrapper.className =
    "bg-[#C4BABA40] flex border-[1px] max-w-[735px] w-full rounded-[85px] justify-between px-[33px] p-4 mx-auto";
  wrapper.dataset.status = task.status;

  const p = document.createElement("p");
  p.id = `task${task.id}`;
  p.className = "text-white text-[40px] font-normal";
  p.textContent = task.text;

  const iconContainer = document.createElement("div");
  iconContainer.className = "flex gap-[10px] justify-center items-center";

  const checkIcon = document.createElement("img");
  checkIcon.id = `icon${task.id}`;
  checkIcon.src = task.status === "completed"? "../videos_imgs/check_mark.png": "../videos_imgs/img 3 (repeat).png";
  checkIcon.alt = "check";
  checkIcon.className = "max-w-[50px] w-full cursor-pointer";

  const deleteIcon = document.createElement("img");
  deleteIcon.src = "../videos_imgs/img 4 (repeat).png";
  deleteIcon.alt = "delete";
  deleteIcon.className = "max-w-[50px] w-full cursor-pointer";

  iconContainer.appendChild(checkIcon);
  iconContainer.appendChild(deleteIcon);

  wrapper.appendChild(p);
  wrapper.appendChild(iconContainer);
  taskList.appendChild(wrapper);

  checkIcon.addEventListener("click", () => {
    task.status = task.status === "pending" ? "completed" : "pending";
    wrapper.dataset.status = task.status;
    checkIcon.src = task.status === "completed" ? "../videos_imgs/check_mark.png" : "../videos_imgs/img 3 (repeat).png";
    p.style.textDecoration = task.status === "completed" ? "line-through" : "none";
    applyFilter(); 
  });

  deleteIcon.addEventListener("click", () => {
    taskList.removeChild(wrapper);
  });
}
tasks.forEach(renderTask);
addBtn.addEventListener("click", () => {
  const text = taskInput.value;
  if (text !== "") {
    const newTask = { id: tasks.length + 1, text, status: "pending" };
    tasks.push(newTask);
    renderTask(newTask);
    taskInput.value = "";
    applyFilter(); 
  }
});
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