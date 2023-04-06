let gameboard = ['', '', '', '', '', '', '', '', ''];
const Gameboard = (name, gameArray) => {
    const getName = () => name;
    const gameBoard = () => gameArray;

    const makeContainerElem = () => {
        const container = document.createElement('div');
        container.classList.add('container');
        return container;
    }
    const makeBoxElem = (index) => {
        const box = document.createElement('div');
        box.classList.add('box');
        box.addEventListener('click', () => {
            
        })
        return box;
    }
    const resetGame = () => {
        gameContainerElem = makeContainerElem();
        gameBoxElem = makeBoxElem();
        for (let index = 0; index < 9; index++) {
            gameContainerElem.appendChild(makeBoxElem(index));
        }
        document.body.appendChild(gameContainerElem);
    }
    return {resetGame}
}

const player = Gameboard('X', gameboard);
const ai = Gameboard('O', gameboard);

player.resetGame();

