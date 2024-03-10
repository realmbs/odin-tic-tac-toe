const app = document.getElementById('app') as HTMLDivElement;
const startButton = document.getElementById('startButton') as HTMLButtonElement;
const resetButton = document.getElementById('resetButton') as HTMLButtonElement;

const cells = [...document.querySelectorAll('.cell')] as HTMLDivElement[];

class Gameboard {
  cells: string[];
  isCurrentPlayer: boolean;
  player: Player;
  computer: Computer;
  isWinner: boolean;
  isGameOver: boolean;
  isComputer: boolean;
  winningConditions: number[][];

  constructor() {
    this.cells = Array(9).fill('');
    this.isCurrentPlayer = true;
    this.player = new Player('Y.T.');
    this.computer = new Computer();
    this.isWinner = false;
    this.isGameOver = false;
    this.isComputer = false;
    this.winningConditions = this.generateWinningConditions();
  }


  renderGameboard() {
    const gameboard = document.createElement('div') as HTMLDivElement;
    gameboard.id = 'gameboard';

    for (let i = 0; i < 9; i++) {
      const cell = document.createElement('div') as HTMLDivElement;
      cell.classList.add('cell');
      cell.id = `cell-${i}`;
      gameboard.appendChild(cell);
    }

    app.appendChild(gameboard);
  }

  generateEventListeners() {
    cells.forEach((cell) => {
      cell.addEventListener('click', this.handleCellClick);
    })
    startButton.addEventListener('click', this.startGame);
    resetButton.addEventListener('click', this.resetGame);
  }

  handleCellClick(e: Event) {
    const cell = e.target as HTMLDivElement;
    if (cell.textContent === '' && !this.isWinner) {
      if (this.isCurrentPlayer) {
        this.player.makeMove(cell);
      } else {
        this.computer.makeComputerMove();
      }
    }
  }

  generateWinningConditions() {
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    return winningConditions;
  }

  checkForWinner() {
    this.winningConditions.forEach((condition) => {
      const [a, b, c] = condition;
      if (this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c]) {
        this.isWinner = true;
      }
    });
  }

  checkForDraw() {
    if (this.cells.every(cell => cell !== '')) {
      this.isGameOver = true;
    }
  }

  resetGame() {
    this.cells = Array(9).fill('');
    this.isCurrentPlayer = true;
    this.isWinner = false;
    this.isGameOver = false;
    cells.forEach(cell => cell.textContent = '');
  }

  startGame() {
    this.renderGameboard();
    this.generateEventListeners();
  }

  endGame() {
    cells.forEach(cell => cell.removeEventListener('click', this.handleCellClick));
  }
}

class Player {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  makeMove(cell: HTMLDivElement) {
    cell.textContent = this.name;
  }
}

class Computer extends Player {
  constructor() {
    super('HAL9000');
  }

  getRandomCell() {
    return Math.floor(Math.random() * 9);
  }

  makeComputerMove() {
    const cell = cells[this.getRandomCell()];
    cell.textContent = this.name;
  }
}