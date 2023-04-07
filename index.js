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
const Gameboard = (name, gameArray, winArr) => {
    const getName = () => name;
    const gameBoard = () => gameArray;
    const getArr = () => winArr;
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

        for (let array of winArr) {
            let [oneIndex, twoIndex, threeIndex] = array;
            if(gameboard[oneIndex] === name 
                && gameboard[twoIndex] === name
                && gameboard[threeIndex] === name) {
                    const {winPage, whoWins} = createDiv();
                    whoWins.textContent = 'Player Wins';
                    winPage.style.display = 'block';
            }
            if(gameboard[oneIndex] === enemy.getName() 
                && gameboard[twoIndex] === enemy.getName()
                && gameboard[threeIndex] === enemy.getName()) {
                    const {winPage, whoWins} = createDiv();
                    whoWins.textContent = 'Ai Wins';
                    winPage.style.display = 'block';
            }   
        }
    }
    const playWithAi = () => {}
    const makeContainerElem = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
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
    const resetGame = (enemy) => {
        gameContainerElem = makeContainerElem();
        const {winPage} = createDiv();
        gameBoxElem = makeBoxElem();
        for (let index = 0; index < 9; index++) {
            gameContainerElem.appendChild(makeBoxElem(index, enemy));
        }
        document.body.append(gameContainerElem, winPage);
    }
    return {resetGame, getName, gameBoard}
}

const player = Gameboard('O', gameboard, winArray);
const ai = Gameboard('X', gameboard, winArray);

player.resetGame(ai);

