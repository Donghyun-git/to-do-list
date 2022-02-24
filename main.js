//유저가 값을 입력한다
//+ 버튼을 클릭하면, 할일이 추가된다.
//유저가 delete 버튼을 누르면 할일이 삭제된다.
// check 버튼을 누르면 할일이 끝나면서 밑줄이 간다.
//1. check 버튼을 클릭하는 순간 false를 true로
//2.true이면 끝난걸로 간주하고 밑줄 보여주기
//3.false이면 안끝난걸로 간주하고 그대로
// 진행중 끝남 탭을 누르면, 언더바가 이동한다.
// 끝남탭은, 끝난 아이템만, 진행중 탭은 진행중인 아이템만 나온다.
// 전체탭을 누르면 다시 전체아이템으로 돌아옴

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let underLine = document.getElementById("under-line");
let taskList =[];
let mode = "all";
let filterList=[];
let list = [];

addButton.addEventListener("mousedown", addTask);

taskInput.addEventListener("keyup", function(event){ //리스트 추가 시 입력란 공백으로 초기화
  if(event.keyCode===13){
    addTask(event);
  }
});

for(let i=1; i<tabs.length; i++){
    tabs[i].addEventListener("click", function(event){filter(event)
    });
}


function addTask(){
    let task = {
        id: randomIDGenerate(),
        taskContent: taskInput.value,
        isComplete: false
    }
    taskList.push(task);
    taskInput.value='';
    console.log(taskList);
    render();
}

function render(){
  if(mode == "all"){
    list = taskList
  } else if(mode == "ongoing" || mode == "done"){
    list = filterList
  }
    let resultHTML = '';
    for(let i=0; i<list.length; i++){
      if(list[i].isComplete == true){
        resultHTML += `<div class="task">
            <div class="task-done"><span>${list[i].taskContent}</span></div>
            <div class="button-box">
              <button class="checkbutton" onclick="toggleComplete('${list[i].id}')"><i class="fa fa-undo" aria-hidden="true"></i></button>
              <button class="deletebutton" onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
            </div>
          </div>`;
      } else {
      resultHTML += `<div class="task">
          <div><span>${list[i].taskContent}</span></div>
          <div class="button-box">
            <button class="checkbutton" onclick="toggleComplete('${list[i].id}')"><i class="fa fa-check" aria-hidden="true"></i></button>
            <button class="deletebutton" onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
          </div>
        </div>`;
      }
  }
  document.getElementById('task-board').innerHTML = resultHTML;
}

function toggleComplete(id){
    console.log("id:", id);
    for(let i=0; i<taskList.length; i++){
        if(taskList[i].id == id){
          taskList[i].isComplete = !taskList[i].isComplete;
          break;
        }
    }
    render();
}

function deleteTask(id){
    for(let i=0; i<taskList.length; i++){

        if(taskList[i].id == id){
          taskList.splice(i, 1)
          break;
        }
    }
    for(let i=0; i<list.length; i++){

        if(list[i].id == id){
          list.splice(i, 1)
          break;
        }
    }
  render();
}

function filter(event){
    if(event){
   mode = event.target.id
   underLine.style.width= event.target.offsetWidth-8 + "px";
   underLine.style.left= event.target.offsetLeft+ 5 + "px";
   underLine.style.top= event.target.offsetTop + (event.target.offsetHeight - 3) + "px";
  }
   console.log("filter클릭댐", event.target.id)
   filterList=[];
  if(mode == "all"){
    render();
  }else if(mode == "ongoing"){
    for(let i=0; i<taskList.length;i++){
      if(taskList[i].isComplete == false){
          filterList.push(taskList[i]);
      }
    }
    render();
  }else if(mode == "done"){
    for(let i=0;i<taskList.length;i++){
      if(taskList[i].isComplete == true){
        filterList.push(taskList[i])
      }
    }
  }
  render();
}

function randomIDGenerate(){
    return '_' + Math.random().toString(36).substr(2, 9);
}
