clippyAgent = null;

document.querySelector("form").addEventListener("submit", handleSubmitForm);
document
  .getElementById("taskList")
  .addEventListener("click", handleCheckOrDelete);
// document.getElementById('clearAll').addEventListener('click', handleClear);

window.addEventListener("load", (event) => {
  initializeClippy();
});

function initializeClippy() {
  clippy.load("Clippy", function (agent) {
    // Do anything with the loaded agent
    clippyAgent = agent;
    clippyAgent.show();
    clippyAnimations(
      "Greeting",
      "Hi there I'm here to help!! If need any help feel free to click on me."
    );
  });
}

function handleSubmitForm(e) {
  e.preventDefault();
//   let input = document.querySelector("input");
//   if (input.value != "") {
//     addTask(input.value);
//   }
//   input.value = "";
}

function addTask(taskVal) {
    // let ul = document.querySelector('taskList');
    let ul = document.getElementById('taskList');
    // li.innerHTML = `
    //     <span class="task-item">${taskVal}</span>
    //     <button name="checkButton" id="checkBtn"> <i class="fas fa-check-square"></i> </button>
    //     <button name="deleteButton" id="deleteBtn"> <i class="fas fa-trash"></i> </button>
    // `
    trollButton = getTroll();
    taskItem = generateTaskItem(trollButton, taskVal);
    
    // let length = getRandomInt(3) + 1;
    // console.log(length);
    
    ul.appendChild(taskItem);

    // for(i = 0; i < length; i++) {
    //     let item = document.getElementById('taskIdListItem');
    //     console.log(item);
    //     var cln = item.cloneNode(true);
    //     ul.appendChild(cln);
    // }
    clippyAnimations('SendMail', 'You added the todo');
}

function getTroll() {
  allTrolls = [
    { name: "movingButton", id: "movingBtn", checkable: false },
    { name: "blockButton", id: "blockBtn", checkable: false },
    { name: "spongebobButton", id: "spongebobBtn", checkable: true },
    { name: "hydraButton", id: "hydraBtn", checkable: true },
  ];
  return allTrolls[Math.floor(Math.random() * allTrolls.length)];
}

function generateTaskItem(trollButton, taskVal){
    let li = document.createElement('li');
    li.id = 'taskIdListItem';
    li.className = 'taskItem';
    li.innerHTML = `
    <span class="task-item" id="task-item">${taskVal}</span>
    <button name="${trollButton.name}" id=${trollButton.id} class="clearBackground"> <i class="fas fa-check-square"></i> </button>
    <button name="deleteButton" id="deleteBtn" class="clearBackground"> <i class="fas fa-trash"></i> </button>
`
    li.classList.add('task-list-item');
    return li;
}

function getRandomInt(num) {
  return Math.floor(Math.random() * Math.floor(num));
}

function handleCheckOrDelete(e) {
  console.log(e.target);
  if (false) {
    //TODO: do we want a way to check them off in any way
    console.log("in checkable");
    checkTask(e);
  }

  if (e.target.name == "deleteButton") {
    console.log("in delete");
    //deleteTask(e);
  }
}

function checkTask(e) {
  let item = e.target.parentNode;
  if (item.style.textDecoration == "line-through") {
    item.style.textDecoration = "none";
  } else {
    item.style.textDecoration = "line-through";
  }
}

$(document).on("mouseover", "#movingBtn", function () {
  $(this).css({
    position: "absolute",
    left: Math.random() * 600 + "px",
    top: Math.random() * 600 + "px",
  });
});

$(document).on("mouseover", "#blockBtn", function () {
  $(this).find("i").remove();
  $(this).html($("<i/>", { class: "fas fa-hand-paper" }));
});

$(document).on('click', '#hydraBtn', function(){
    // checkTask($(this));
    let length = getRandomInt(3) + 1;    
    taskList = document.getElementById("taskList")
    for(i = 0; i < length; i++) {
        // let item = document.getElementById('taskIdListItem');
        let item = $(this).parent()[0]; //returns li
        console.log(item);
        // var cln = item.cloneNode(true);
        trollButton = getTroll();
        taskItem = generateTaskItem(trollButton, item.children[0].outerText);
        taskList.appendChild(taskItem);
    } 
});

$(document).on("mouseover", "#spongebobBtn", function () {
  $("body").css("background-image", "url('./resources/images/spongebob.jpg')");
});

$(document).on("mouseover", "#spongebobBtn", function () {
  $("body")
    .fadeIn("slow", 5000, function () {
      $(this).css(
        "background-image",
        "url('./resources/images/spongebob.jpg')"
      );
    })
    .fadeTo("slow", 5000);
  $("body")
    .fadeIn("slow", 5000, function () {
      $(this).css("background-image", "url('./resources/images/2.jpg')");
    })
    .fadeTo("slow", 5000);
});

$(document).on("click", ".clippy", function () {
  window.location.href = "/help.html";
});

function deleteTask(e) {
  let item = e.target.parentNode;
  item.addEventListener("transitionend", function () {
    item.remove();
  });
  item.classList.add("task-list-item-fall");
  clippyAnimations("Thinking", "You deleted the todo");
}

function clearAll() {
  document.getElementById("taskList").innerHTML = "";

  clippyAnimations("Print", "You cleared the todos");
}

function clippyAnimations(animation, text) {
  clippyAgent.play(animation);
  clippyAgent.speak(text);
}
