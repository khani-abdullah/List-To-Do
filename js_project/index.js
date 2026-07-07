
  const tasks = [
    { id: 1, text: "Go for a walking" },
    { id: 2, text: "Do homework" },
    { id: 3, text: "Plan the party" }
  ];

  const taskList = document.getElementById("taskList");
  const taskInput = document.getElementById("taskInput");
  const addBtn = document.getElementById("addBtn");
  function renderTask(task) {
    const wrapper = document.createElement("div");
    wrapper.className =
      "bg-[#C4BABA40] flex border-[1px] max-w-[735px] w-full rounded-[85px] justify-between px-[33px] p-4 mx-auto";

    const p = document.createElement("p");
    p.id = `task${task.id}`;
    p.className = "text-white text-[40px] font-normal";
    p.textContent = task.text;

    const iconContainer = document.createElement("div");
    iconContainer.className = "flex gap-[10px] justify-center items-center";

    const checkIcon = document.createElement("img");
    checkIcon.id = `icon${task.id}`;
    checkIcon.src = "../videos_imgs/img 3 (repeat).png";
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
    let checked = false;
    checkIcon.addEventListener("click", () => {
      checked = !checked;
      checkIcon.src = checked
        ? "../videos_imgs/check_mark.png"
        : "../videos_imgs/img 3 (repeat).png";
      p.style.textDecoration = checked ? "line-through " : "none";
    });
    deleteIcon.addEventListener("click", () => {
      taskList.removeChild(wrapper);
    });
  }

  tasks.forEach(renderTask);
  addBtn.addEventListener("click", () => {
    const text = taskInput.value;
    if (text !== "") {
      const newTask = { id: tasks.length + 1, text };
      tasks.push(newTask);
      renderTask(newTask);
      taskInput.value = ""; 
    }
  });
  console.log(addBtn);
