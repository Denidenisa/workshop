
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
const burgerBtn = document.querySelector('.burger-btn');
const navLinks = document.querySelector('.nav-links');
if (burgerBtn && navLinks) {
  burgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

const logoImg = document.querySelector('.logo-img');
const aboutMeHeader = document.getElementById('aboutMeHeader');

if (logoImg && aboutMeHeader) {
  logoImg.style.cursor = 'pointer';

  logoImg.addEventListener('click', () => {
    const isVisible = aboutMeHeader.style.display === 'block';
    aboutMeHeader.style.display = isVisible ? 'none' : 'block';
  });
}


  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}
const princeImg = document.querySelector('.welcome-prince');
const siteExplanation = document.getElementById('siteExplanation');

if (princeImg && siteExplanation) {
  princeImg.style.cursor = 'pointer';

  princeImg.addEventListener('click', () => {
    const isVisible = siteExplanation.style.display === 'block';
    siteExplanation.style.display = isVisible ? 'none' : 'block';
  });
}


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
let timerActive = false


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
  const msg = document.getElementById('timerMessage');
  if (msg) msg.style.display = 'none';

  if (timerActive) return;
  timerActive = true;
    timerInterval =setInterval(()=>{
    if (timerRemaining > 0) {
  timerRemaining--;
  updateTimerUI();  
    }else{
        stopTimer()
        addRose()
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
  const msg = document.getElementById('timerMessage');
  if (!msg) return;

  msg.style.display = 'block';
  msg.textContent = "🌙 Pause méritée. Ton jardin t’attend quand tu seras prêt à reprendre.";
}




function resetTimer() {
  stopTimer();
  timerRemaining = timerDuration;
  updateTimerUI();
  const msg = document.getElementById('timerMessage');
  if (msg) {
    msg.style.display = 'block';
    msg.textContent = "🌱 Parfois, repartir de zéro permet à de nouvelles fleurs de s’épanouir !";
  }

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
      delBtn.textContent = '✔'
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

addTodoBtn.addEventListener('click', addTodo)
todoInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') addTodo()
})
updateTodoUI()
updateMiniTodoUI();


 let flowerList = []
 let roses = Number (localStorage.getItem('roses')) || 0 ;


 const roseContainer = document.getElementById('roseContainer')
const jardinEmpty = document.getElementById('jardinEmpty');


 async function loadFlowers() {
   try {
     const response=await fetch('https://emojihub.yurace.pro/api/all/group/plant-flower');
     const data=await response.json()
     flowerList = data.map(item =>item.htmlCode[0])
    console.log('Fleurs Chargées : ',flowerList.length)
   }catch (error){
    console.error('Erreur chargement fleurs',error)
    flowerList=['🌹','🌻','🪻','🌼','🌷']
   }

 }
 function getRandomFlower(){
  if (flowerList.length === 0){
    return '🌹'
  }
  const randomIndex=Math.floor(Math.random()*flowerList.length)
  return flowerList[randomIndex]
 }
  function addRose(){
    roses++
    const flower=getRandomFlower()
    let emojiList=JSON.parse(localStorage.getItem('emojiList')) || []
    emojiList.push(flower)
    localStorage.setItem('emojiList', JSON.stringify(emojiList));
    localStorage.setItem('roses', roses);
    updateGardenUI();
    updateMiniGardenUI();
}
  
  function updateGardenUI() {
    roseContainer.innerHTML = '';
    const emojiList = JSON.parse(localStorage.getItem('emojiList')) || [];

    if (emojiList.length === 0) {
      jardinEmpty.style.display = 'block';
    } else {
      jardinEmpty.style.display = 'none';
  
      emojiList.forEach((flower) => {
        const span = document.createElement('span');
        span.innerHTML = flower;       
        span.className = 'rose-item';   
        roseContainer.appendChild(span);
      });
    }
  }
loadFlowers()
updateGardenUI()
updateMiniGardenUI();



function updateMiniTodoUI() {
  const mini = document.getElementById('miniTodoList');
  if (!mini) return;
  mini.innerHTML = '';

  if (todos.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Ajoute une tâche à ton astéroïde B‑612…';
    mini.appendChild(li);
  } else {
    todos.slice(0, 3).forEach(todo => {
      const li = document.createElement('li');
      li.textContent = todo;
      mini.appendChild(li);
    });
  }
}

function updateMiniGardenUI() {
  const mini = document.getElementById('miniRoseContainer');
  if (!mini) return;
  mini.innerHTML = '';

  const emojiList = JSON.parse(localStorage.getItem('emojiList')) || [];

  if (emojiList.length === 0) {
    mini.textContent = 'Ton jardin est planté, il attend juste un peu de temps pour fleurir';
  } else {
    emojiList.slice(0, 6).forEach(flower => {
      const span = document.createElement('span');
      span.innerHTML = flower;
      span.className = 'rose-item';
      mini.appendChild(span);
    });
  }
}
loadFlowers();      
updateGardenUI();   
updateMiniTodoUI()



const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });
}


