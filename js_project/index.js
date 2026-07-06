
const checkIcon = document.getElementById('icon1');
  const taskText = document.getElementById('task1');

  let checked = false;

  checkIcon.addEventListener('click', () => {
    checked = !checked;

    if (checked) {
      checkIcon.src = "videos_imgs/check_mark.png"; 
      taskText.classList.add("line-through", "opacity-70");
    } else {
      checkIcon.src = "videos_imgs/check_mark.png"; 
      taskText.classList.remove("line-through", "opacity-70");
    }
  });
  