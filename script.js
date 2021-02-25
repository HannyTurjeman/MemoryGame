const $gameBoard = document.getElementById('board'),
      $startOverButton = document.getElementById('start'),
      $audio = document.getElementById('audio'),
      $countSteps = document.getElementById('countsteps'),
      $timer = document.getElementById('timer'),
      $score = document.getElementById('score'),
      disneyHeroes = ['ariel', 'aladin', 'jasmin', 'piterpen', 'moana', 'baz', 'ariel2', 'aladin2', 'jasmin2', 'piterpen2', 'moana2', 'baz2'];
      
let coountFlips = 0,
firstSelectedLi = "",
secSelectedLi = "",
countCards = 0,
countSteps = 0,
score = 0,
timerRun = 40,
timerFunc = 0;


const soundsUrls = {
    wrong: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/wronganswer.mp3',
    correct: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/250758/rightanswer.mp3'
}

const photoUrls = {
    ariel: './photos/ariel.jpg',
    jasmin: './photos/jasmin.jpg',
    moana: './photos/moana.jpg',
    aladin: './photos/aladin.jpg',
    baz: './photos/baz.jpg',
    piterpen: './photos/piterpen.jpg',
    ariel2: './photos/ariel.jpg',
    jasmin2: './photos/jasmin.jpg',
    moana2: './photos/moana.jpg',
    aladin2: './photos/aladin.jpg',
    baz2: './photos/baz.jpg',
    piterpen2: './photos/piterpen.jpg'
}

const CountTime = () => {
    timerRun--;
    $timer.innerHTML = timerRun;
    if (timerRun === 0) {
        clearInterval(timerFunc);
    }
    if (timerRun === 0 && countCards < 12) {
        initialCards();

        Swal.fire({
            icon: 'error',
            title: 'Game Over',
            text: 'Time is over, Try again',
            showConfirmButton: true,
            confirmButtonText: 'OK'
        })

    }

}

const shuffle = (disneyArray) => {
  let counter = disneyArray.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter --;
    let temp = disneyArray[counter];
    disneyArray[counter] = disneyArray[index];
    disneyArray[index] = temp;
  }
  return disneyArray;
}

const initialCards = () => {

    $gameBoard.innerHTML = "";
    $timer.innerText = "40";
    $countSteps.innerText = "0";
    $score.innerText = "0";

    const newArray = shuffle(disneyHeroes);
    newArray.forEach((hero) => {
      const liElement = document.createElement('li');
      liElement.id = hero;
      hero = hero.replace(/[0-9]/g, '');
      liElement.dataset.id = hero;
       $gameBoard.appendChild(liElement);
    });

    $gameBoard.classList.add('initial');
}

const createLevel = () => {
  initialCards();
  clearInterval(timerFunc);
  $gameBoard.classList.remove('initial');
  $gameBoard.classList.add('correct');
  coountFlips = 0;
  firstSelectedLi = "";
  secSelectedLi = "";
  countCards = 0;
  countSteps = 0;
  timerRun = 40;
  score = 0;
  setTimeout(() => {
    $gameBoard.classList.remove('correct');
}, 900);
  timerFunc = setInterval(CountTime, 1000);
}



initialCards();


const scoreCalc = () => {
    const rating3 = (disneyHeroes.length / 2) + 2,
          rating2 = disneyHeroes.length;
    
    if (countSteps <= rating3) {
        score = 3;
    }
    if (countSteps > rating3 && countSteps <= rating2) {
        score = 2;
    }
    if (countSteps > rating2) {
        score =1;
    }

    $score.innerText = score;
}

const openCard = (element, id) => {
    element.style.backgroundImage = "url(" + `${photoUrls[`${id}`]}`+ ")";
    element.style.backgroundSize = "cover";
    element.style.backgroundPosition = "center";

}

const reset = () => {
    coountFlips = 0;
    firstSelectedLi = "";
    secSelectedLi = "";
}

const flipBack = () => {
    setTimeout(() => {
        firstSelectedLi.style.backgroundImage = "";
        secSelectedLi.style.backgroundImage = "";
        reset();
    }, 1300);
}

const selectedAnswer = ($event) => {
    isLiElement = $event.target.nodeName === 'LI';
    if (!isLiElement) {
        return false;
    }
    
    coountFlips++;

    let hero = $event.target.id;

    if (coountFlips === 1) {

        firstSelectedLi = document.getElementById(hero);
        firstSelectedLi.classList.add('open');
        openCard(firstSelectedLi, hero);


    } 

    if (coountFlips === 2) {
        secSelectedLi = document.getElementById(hero);
        openCard(secSelectedLi, hero);

        countSteps++;
        $countSteps.innerHTML = countSteps;
        scoreCalc();

        if (firstSelectedLi.dataset.id === secSelectedLi.dataset.id) {
            $gameBoard.classList.add('correct');
            firstSelectedLi.classList.add('correct');
            secSelectedLi.classList.add('correct');
            firstSelectedLi.classList.remove('open');
            
            $audio.src = soundsUrls.correct;
            $audio.play();
            
            reset();
            countCards = countCards + 2;

            setTimeout(() => {
                $gameBoard.classList.remove('correct');
            }, 1300);
    
        } else {
            firstSelectedLi.classList.remove('open');
            flipBack();

        }
    }

    if (countCards === 12) {
        clearInterval(timerFunc);
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Good Job',
            showConfirmButton: false,
            timer: 1500
          })
    }
    
}


$gameBoard.addEventListener('click',selectedAnswer);
$startOverButton.addEventListener('click', createLevel);
