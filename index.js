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
const Gameboard = (name, gameArray) => {
    const getName = () => name;
    const gameBoard = () => gameArray;
    let currentPlayer = name;

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
            box.textContent = currentPlayer;
            gameArray[index] = currentPlayer;
        }, {once: true});
        return box;
    }
    const resetGame = (enemy) => {
        gameContainerElem = makeContainerElem();
        gameBoxElem = makeBoxElem();
        for (let index = 0; index < 9; index++) {
            gameContainerElem.appendChild(makeBoxElem(index, enemy));
        }
        document.body.appendChild(gameContainerElem);
    }
    return {resetGame, getName, gameBoard}
}

const player = Gameboard('O', gameboard, winArray);
const ai = Gameboard('X', gameboard, winArray);

player.resetGame(ai);

