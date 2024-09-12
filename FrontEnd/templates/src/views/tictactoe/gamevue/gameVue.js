
const cases = [...document.getElementsByClassName("case")];
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let scoreNul = document.getElementById("score3");
let player = document.getElementById("player");
let fdp = document.getElementById("button_hidden");
let button_hidden = document.getElementById("button_hidden");
let link_hidden = document.getElementById("link_hidden");


let state = {
	playercase: 1,
	scoreJ1: 0,
	scoreJ2: 0,
	matchNul: 0,
	c1: 0,
	c2: 0,
	c3: 0,
	c4: 0,
	c5: 0,
	c6: 0,
	c7: 0,
	c8: 0,
	c9: 0,
};

const resetState = () => {
  state.playercase = 1;
  state.c1 = 0;
  state.c2 = 0;
  state.c3 = 0;
  state.c4 = 0;
  state.c5 = 0;
  state.c6 = 0;
  state.c7 = 0;
  state.c8 = 0;
  state.c9 = 0;
};

function hide (elements) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = 'none';
  }
}


function show_winner() {
  const newDiv = document.createElement('div');
  newDiv.className = 'oui';
  newDiv.id = 'oui';
  newDiv.classList.add('oui');
  const myFontSize = 'font-size-class';
  const myBGColor = 'bg-color-class';
  newDiv.classList.add(myFontSize, myBGColor);

  newDiv.style.color = 'white';

  const winner_name = localStorage.getItem('winner_name');
  const win_msg = 'winner';
    // <h1>${win_msg} : ${winner_name}</h1>
    // <h2>oui</h2>
    // <h3>${state.scoreJ1} : ${state.scoreJ2}</h3>
    // <button class="btn" onclick="goToHome()">{{$t('test')}}</button>


  newDiv.innerHTML = `
    <div class="oui" style="background-color: rgba(0, 0, 0, 0.76);
    margin-left: 30vw;
    border-radius: 20px;
    margin-right: 30vw;
    padding: 2vh 2vw;
    font-family: Crang;">
    <h1 style="margin: 5vh 5vw;">${win_msg}: ${winner_name}</h1>
    <h2 style="margin: 4vh 5vw;">score :</h2>
    <h3 style="font-style: none;
	font-size: 6em;">${state.scoreJ1} : ${state.scoreJ2}</h3>
    </div>
  `;

  fdp.before(newDiv);

}

function show (elements, specifiedDisplay) {
  elements = elements.length ? elements : [elements];
  for (var index = 0; index < elements.length; index++) {
    elements[index].style.display = specifiedDisplay || 'block';
  }
}

  const jouerCase = (e) => {
    let idCase = e.target.id;
  
    if (state[idCase] !== 0) return;
  
    state[idCase] = state.playercase;
    
    let iswin = checkWin();
    
    if (iswin === true) {
      if (state.playercase === 1) {
        state.scoreJ1++;
        score1.innerHTML = state.scoreJ1;
      }
      if (state.playercase === 2) {
        state.scoreJ2++;
        score2.innerHTML = state.scoreJ2;
      }
      if (state.scoreJ1 === 3 || state.scoreJ2 === 3) {
        hide(document.querySelectorAll('.app'));
        localStorage.setItem('left_score', state.scoreJ1);
        localStorage.setItem('right_score', state.scoreJ2);
        localStorage.setItem('winner_name', state.scoreJ1 > state.scoreJ2 ? localStorage.getItem("player1") : localStorage.getItem("player2"));
        // let fdp = document.getElementById("marche_fdp");
        // fdp.hidden = false;
        show_winner();
        button_hidden.hidden = false;
        link_hidden.hidden = false;
        let games = JSON.parse(localStorage.getItem('games')) || [];
        let newGame = {
          "players": [
            {
              "id": 1,
              "name": localStorage.getItem("player1")
            },
            {
              "id": 2,
              "name": localStorage.getItem("player2")
            }
          ],
          "winner": {
            "id": state.scoreJ1 > state.scoreJ2 ? 1 : 2,
            "name": state.scoreJ1 > state.scoreJ2 ? localStorage.getItem("player1") : localStorage.getItem("player2")
          },
          "date": new Date().toISOString()
        };
        console.log(newGame);
        games.push(newGame);
        localStorage.setItem('games', JSON.stringify(games));
      }
      resetState();
      cases.forEach((c) => (c.textContent = ""));
    }
    else if (iswin === null) {
      state.matchNul++;
      scoreNul.innerHTML = state.matchNul;
      resetState();
      cases.forEach((c) => (c.textContent = ""));
    }
    else {
      if (state.playercase === 1) {
        state.playercase = 2;
        e.target.textContent = "X";
        player.textContent = localStorage.getItem("player2");
      }
      else {
        state.playercase = 1;
        e.target.textContent = "O";
        player.textContent = localStorage.getItem("player1");
      }
    }
};

const checkWin = () => {
  if (
    (state.c1 == state.c2 && state.c2 == state.c3 && state.c1 > 0) ||
    (state.c1 == state.c4 && state.c4 == state.c7 && state.c1 > 0) ||
    (state.c1 == state.c5 && state.c5 == state.c9 && state.c1 > 0) ||
    (state.c3 == state.c5 && state.c5 == state.c7 && state.c7 > 0) ||
    (state.c2 == state.c5 && state.c5 == state.c8 && state.c2 > 0) ||
    (state.c3 == state.c6 && state.c6 == state.c9 && state.c3 > 0) ||
    (state.c4 == state.c5 && state.c5 == state.c6 && state.c4 > 0) ||
    (state.c7 == state.c8 && state.c8 == state.c9 && state.c7 > 0)
  ) {
    console.log("winner !");
    return true;
  } else if (
    state.c1 !== 0 &&
    state.c2 !== 0 &&
    state.c3 !== 0 &&
    state.c4 !== 0 &&
    state.c5 !== 0 &&
    state.c6 !== 0 &&
    state.c7 !== 0 &&
    state.c8 !== 0 &&
    state.c9 !== 0
  ) {
    return null;
  } else {
    return false;
  }
};


cases.forEach((el) => {
  el.addEventListener("click", jouerCase);
});