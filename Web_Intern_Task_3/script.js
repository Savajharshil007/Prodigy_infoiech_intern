const cells = document.querySelectorAll('[data-cell]');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');
const modeButton = document.getElementById('modeButton');
let isXTurn = true;
let isVsAI = false;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent;
        }
    }
    return null;
}

function checkDraw() {
    return [...cells].every(cell => cell.textContent);
}

function handleClick(event) {
    const cell = event.target;
    if (cell.textContent || statusMessage.textContent) return;

    cell.textContent = isXTurn ? 'X' : 'O';
    cell.classList.add(isXTurn ? 'colorx' : 'coloro');
    cell.classList.add(isXTurn ? 'x' : 'o');

    const winner = checkWin();
    if (winner) {
        statusMessage.textContent = `${winner} wins!`;
        return;
    }

    if (checkDraw()) {
        statusMessage.textContent = 'It\'s a draw!';
        return;
    }

    isXTurn = !isXTurn;
    if (isVsAI && !isXTurn) {
        setTimeout(() => aiMove(), 500);
    }
}

function aiMove() {
    const emptyCells = [...cells].filter(cell => !cell.textContent);
    if (emptyCells.length === 0) return;

    const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = 'O';
    randomCell.classList.add('o');
    randomCell.classList.add('coloro');

    const winner = checkWin();
    if (winner) {
        statusMessage.textContent = `${winner} wins!`;
        return;
    }

    if (checkDraw()) {
        statusMessage.textContent = 'It\'s a draw!';
        return;
    }

    isXTurn = !isXTurn;
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
        cell.classList.remove('colorx','coloro');
    });
    statusMessage.textContent = '';
    isXTurn = true;
}

function toggleMode() {
    isVsAI = !isVsAI;
    modeButton.textContent = isVsAI ? 'Play vs 1v1' : 'Play vs AI';
    restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
modeButton.addEventListener('click', toggleMode);

