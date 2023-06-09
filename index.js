let gameboard = ['', '', '', '', '', '', '', '', ''];
const winArray = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const SoloGameboard = (name, playerName, gameArray, winArr) => {
    const getName = () => name;
    const opponent = () => playerName;
    let currentPlayer = name;

    const createDiv = () => {
        const winPage = document.createElement('div');
        const whoWins = document.createElement('div');
        const resetBtn = document.createElement('div');
        winPage.classList.add('win-page');
        whoWins.classList.add('who-wins');
        resetBtn.classList.add('reset-btn');
        resetBtn.textContent = 'Reset Game';
        winPage.append(whoWins, resetBtn);
        return {winPage, whoWins};
    }
    const playWithSelf = (enemy) => {
        const winpage = document.querySelector('.win-page');
        const whowins = document.querySelector('.who-wins');

        for (let array of winArr) {
            let [oneIndex, twoIndex, threeIndex] = array;
            const arr = gameboard.every(name => name !== '')
            if (arr === true
                && gameboard[oneIndex] !== gameboard[twoIndex] 
                && gameboard[oneIndex] !== gameboard[threeIndex]
                && gameboard[threeIndex] !== (name||enemy.getName())) {
                whowins.textContent = `It's a Draw!`;
                winpage.style.display = 'flex';
            }
            if(gameboard[oneIndex] !== ''
                && gameboard[oneIndex] === gameboard[twoIndex] 
                && gameboard[oneIndex] === gameboard[threeIndex]
                && gameboard[threeIndex] === name) {
                    whowins.textContent = `${playerName} Wins`;
                    winpage.style.display = 'flex';
            }
            if(gameboard[oneIndex] !== ''
                && gameboard[oneIndex] === gameboard[twoIndex] 
                && gameboard[oneIndex] === gameboard[threeIndex]
                && gameboard[threeIndex] === enemy.getName()) {
                    whowins.textContent = `${enemy.opponent()} Wins`;
                    winpage.style.display = 'flex';
            }
        }
    }
    const makeContainerElem = () => {
        const soloContainer = document.createElement('div');
        soloContainer.classList.add('solo-container');
        return soloContainer;
    }
    const makeBoxElem = (index, enemy) => {
        const box = document.createElement('div');
        box.classList.add('box');

        box.addEventListener('click', () => {
            currentPlayer = currentPlayer === name? enemy.getName(): name;
            gameArray[index] = currentPlayer;
            box.textContent = gameArray[index];
            playWithSelf(enemy);
        }, {once: true});
        return box;
    }
    const restartGame = (winPage, gameContainerElem, enemy) => {
        const resetgame = document.querySelector('.reset-btn');
        resetgame.addEventListener('click', () => {
            const container = document.querySelector('.container');
            container.removeChild(winPage);
            container.removeChild(gameContainerElem)
            resetGame(enemy);
        });
    }
    const resetGame = (enemy) => {
        const container = document.querySelector('.container');
        gameContainerElem = makeContainerElem();
        const {winPage} = createDiv();
        gameBoxElem = makeBoxElem();
        for (let index = 0; index < 9; index++) {
            gameContainerElem.appendChild(makeBoxElem(index, enemy));
        }
        gameboard.fill('');
        container.append(gameContainerElem, winPage);
        restartGame(winPage, gameContainerElem, enemy);
    }
    return {resetGame, getName, opponent}
}



const onloadPage = () => {
    const startPage = document.createElement('div');
    const msg = document.createElement('div');
    const input = document.createElement('INPUT');
    const startBtn = document.createElement('button');
    startPage.classList.add('start-page');
    msg.classList.add('msg');
    input.setAttribute('type', 'search');
    input.setAttribute('placeholder', 'Input Username');
    input.classList.add('input');
    startBtn.classList.add('start-btn');
    msg.textContent = 'Welcome To TIK TAK TOK Game';
    startBtn.textContent = 'Start';

    startPage.append(msg, input, startBtn);
    document.body.appendChild(startPage);

    const nav = document.querySelector('nav');
    const container = document.querySelector('.container');
    document.body.removeChild(nav);
    document.body.removeChild(container);
    
    startBtn.addEventListener('click', () => {
       if (input.value.length >= 1 && input.value.length <= 8) {
        document.body.append(nav, container);
        document.body.removeChild(startPage);
        const player = SoloGameboard('O', input.value, gameboard, winArray);
        const ai = SoloGameboard('X', "Opponent", gameboard, winArray);

        player.resetGame(ai);
       }
        return;
    })
}
onload = onloadPage();