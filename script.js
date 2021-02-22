const $gameBoard = document.getElementById('board'),
      $startOverButton = document.getElementById('start'),
      $audio = document.getElementById('audio'),
      $countSteps = document.getElementById('countsteps'),
      $timer = document.getElementById('timer'),
      disneyHeroes = ['ariel', 'aladin', 'jasmin', 'piterpen', 'moana', 'baz', 'ariel2', 'aladin2', 'jasmin2', 'piterpen2', 'moana2', 'baz2'];
      
let coountFlips = 0,
firstSelectedLi = "",
secSelectedLi = "",
countCards = 0,
countSteps = 0,
timerRun = 0,
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
    piterpen2: './photos/piterpen.jpg',
}

const CountTime = () => {
    timerRun++;
    $timer.innerHTML = timerRun;

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
    $timer.innerHTML = "0";
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
  $countSteps.innerHTML = countSteps;
  timerRun = 0;
  setTimeout(() => {
    $gameBoard.classList.remove('correct');
}, 900);
  timerFunc = setInterval(CountTime, 1000);
}



initialCards();



const selectedAnswer = ($event) => {
    isLiElement = $event.target.nodeName === 'LI';
    if (!isLiElement) {
        return false;
    }
    
    coountFlips++;

    let hero = $event.target.id;

    if (coountFlips === 1) {

        firstSelectedLi = document.getElementById(hero);
        firstSelectedLi.style.backgroundImage = "url(" + `${photoUrls[`${hero}`]}`+ ")";
        firstSelectedLi.style.backgroundSize = "cover";
        firstSelectedLi.style.backgroundPosition = "center";

    } 

    if (coountFlips === 2) {
        secSelectedLi = document.getElementById(hero);
        secSelectedLi.style.backgroundImage = "url(" + `${photoUrls[`${hero}`]}`+ ")";
        secSelectedLi.style.backgroundSize = "cover";
        secSelectedLi.style.backgroundPosition = "center";

        countSteps++;
        $countSteps.innerHTML = countSteps;

        if (firstSelectedLi.dataset.id === secSelectedLi.dataset.id) {
            console.log("Well done");
            $gameBoard.classList.add('correct');
            firstSelectedLi.classList.add('correct');
            secSelectedLi.classList.add('correct');
            
            $audio.src = soundsUrls.correct;
            $audio.play();
            
            coountFlips = 0;
            firstSelectedLi = "";
            secSelectedLi = "";
            countCards = countCards + 2;

            setTimeout(() => {
                $gameBoard.classList.remove('correct');
            }, 1300);
    
        } else {
            
            setTimeout(() => {
                firstSelectedLi.style.backgroundImage = "";
                secSelectedLi.style.backgroundImage = "";
                coountFlips = 0;
                firstSelectedLi = "";
                secSelectedLi = "";
            }, 1300);

        }
    }

    if (countCards === 12) {
        clearInterval(timerFunc);
    }
    
  console.log($event.target);
}


$gameBoard.addEventListener('click',selectedAnswer);
$startOverButton.addEventListener('click', createLevel);
