const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('statusText');
const resetBtn = document.getElementById('resetBtn');
const scoreXEl = document.getElementById('scoreX');
const scoreOEl = document.getElementById('scoreO');
const scoreTiesEl = document.getElementById('scoreTies');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;

let scores = {
    X: 0,
    O: 0,
    ties: 0
};

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

initializeGame();

function initializeGame() {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    resetBtn.addEventListener('click', restartGame);
    updateStatus();
}

function cellClicked() {
    const cellIndex = this.getAttribute('data-index');

    if (board[cellIndex] !== '' || !isGameActive) {
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
}

function changePlayer() {
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    updateStatus();
}

function updateStatus() {
    statusText.innerHTML = `Vez do jogador <span class="highlight" style="color: ${currentPlayer === 'X' ? '#0984e3' : '#e17055'}">${currentPlayer}</span>`;
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

        if (cellA === '' || cellB === '' || cellC === '') {
            continue;
        }
        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.innerHTML = `Jogador <span class="highlight" style="color: ${currentPlayer === 'X' ? '#0984e3' : '#e17055'}">${currentPlayer}</span> Venceu!`;
        scores[currentPlayer]++;
        updateScoreboard();
        isGameActive = false;
        return;
    }

    let roundDraw = !board.includes('');
    if (roundDraw) {
        statusText.textContent = `Empate!`;
        scores.ties++;
        updateScoreboard();
        isGameActive = false;
        return;
    }

    changePlayer();
}

function updateScoreboard() {
    scoreXEl.textContent = scores.X;
    scoreOEl.textContent = scores.O;
    scoreTiesEl.textContent = scores.ties;
}

function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    updateStatus();

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
}
