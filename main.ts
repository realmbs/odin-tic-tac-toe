const app = document.getElementById('app') as HTMLDivElement;
const startButton = document.getElementById('startButton') as HTMLButtonElement;
const resetButton = document.getElementById('resetButton') as HTMLButtonElement;

const cells = [...document.querySelectorAll('.cell')] as HTMLDivElement[];

class Gameboard {
  cells: string[];
  isCurrentPlayer: boolean;
  isWinner: boolean;
  isGameOver: boolean;
  isComputer: boolean;
  constructor() {
    this.cells = Array(9).fill('');
    this.isCurrentPlayer = true;
    this.isWinner = false;
    this.isGameOver = false;
    this.isComputer = false;
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

  generateWinningConditions() {
    const winningConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];
    return winningConditions;
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
}