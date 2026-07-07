
for (let i = 1; i <= 3; i++) {
  const checkIcon = document.getElementById(`icon${i}`);
  const taskText = document.getElementById(`task${i}`);

  let checked = false;

  checkIcon.addEventListener("click", () => {
    checked = !checked;

    if (checked) {
      checkIcon.src = "../videos_imgs/check_mark.png"; 
      taskText.classList.add("line-through", "opacity-70");
    } 
    else {
      checkIcon.src = "../videos_imgs/img 3 (repeat).png"; 
      taskText.classList.remove("line-through", "opacity-70");
    }
  });
}
