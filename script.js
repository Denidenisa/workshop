
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const targetId = btn.getAttribute('data-page');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
   
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

const apprivoiserBtn = document.querySelector('[data-action="timer"]');

apprivoiserBtn.addEventListener('click', function() {
  const timerSection = document.getElementById('timer');
  if (timerSection) {
    timerSection.scrollIntoView({ behavior: 'smooth' });
  }

  document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector('[data-page="timer"]').classList.add('active');
});

let timerDuration= 10*60;
let timerRemaining=timerDuration;
let timerInterval=null;


const timerDisplay=document.getElementById('timerDisplay');
const durationButtons=document.querySelectorAll('.duration-btn');
const startBtn=document.getElementById('startBtn');
const pauseBtn=document.getElementById('pauseBtn');
const resetBtn=document.querySelector('.btn-reset');

function updateTimerUI(){
    const min =Math.floor(timerRemaining/60).toString().padStart(2,'0');
    const sec = (timerRemaining % 60).toString().padStart(2, '0');
    timerDisplay.textContent=`${min}:${sec}`;
}

durationButtons.forEach(btn => {
    btn.addEventListener('click',()=> {
        durationButtons.forEach(b=>b.classList.remove('selected'));
        btn.classList.add('selected')
        timerDuration = Number(btn.dataset.duration)*60;
        timerRemaining=timerDuration;
        updateTimerUI()
        stopTimer()
     });
});

function startTimer(){
    if (timerActive) return;
    timerActive=true;
    timerInterval =setInterval(()=>{
    if (timerRemaining > 0) {
  timerRemaining--;
  updateTimerUI();  
    }else{
        stopTimer()
        document.getElementById('timerMessage').style.display='block';
    }
},1000);
}

function stopTimer() {
  timerActive = false;
  clearInterval(timerInterval);
  timerInterval = null;
}

function pauseTimer() {
  stopTimer();
}


function resetTimer() {
  stopTimer();
  timerRemaining = timerDuration;
  updateTimerUI();
  document.getElementById('timerMessage').style.display = 'none';
}


startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);


updateTimerUI();
document.getElementById('timerMessage').style.display = 'none';



let todos = JSON.parse(localStorage.getItem('todos')) || []
const todoInput = document.getElementById('todoInput')
const addTodoBtn = document.getElementById('addTodoBtn')
const todoList = document.getElementById('todoList')
const todoEmpty = document.getElementById('todoEmpty')

function updateTodoUI() {
  todoList.innerHTML = ''
  if (todos.length === 0) {
    todoEmpty.style.display = 'block'
  } else {
    todoEmpty.style.display = 'none'
    todos.forEach((todo, index) => {
      const li = document.createElement('li')
      li.textContent = todo
      const delBtn = document.createElement('button')
      delBtn.textContent = '✘'
      delBtn.className = 'btn-delete'
      delBtn.addEventListener('click', () => removeTodo(index));
      li.appendChild(delBtn);
      todoList.appendChild(li);
    });
  }
}
function addTodo() {
  const task = todoInput.value.trim()
  if (task) {
    todos.push(task)
    localStorage.setItem('todos', JSON.stringify(todos))
    todoInput.value = ''
    updateTodoUI()
  }
}

function removeTodo(index) {
  todos.splice(index, 1)
  localStorage.setItem('todos', JSON.stringify(todos))
  updateTodoUI()
}

addTodoBtn.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTodo()
})
updateTodoUI();
