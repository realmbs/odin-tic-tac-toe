const cells = document.querySelectorAll('.cell');
const container = document.querySelector('.container') as HTMLDivElement;

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    cell.classList.toggle('active');
  });
});

class Gameboard {
  rows: number;
  cols: number;

  constructor(rows: number = 3, cols: number = 3) {
    this.rows = rows;
    this.cols = cols;
  }

  generateGameboard() {
    const cellCount = this.rows * this.cols;
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      container?.appendChild(cell);
      cell.id = `${i}`;
    }
  }

  clearGameboard() {
    container?.innerHTML = '';
  }

  generateWinningConditions() {
    const winningConditions = [];
    // Rows
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(i * this.cols + j);
      }
      winningConditions.push(row);
    }
    // Columns
    for (let i = 0; i < this.cols; i++) {
      const col = [];
      for (let j = 0; j < this.rows; j++) {
        col.push(j * this.cols + i);
      }
      winningConditions.push(col);
    }
    // Diagonals
    const diagonal1 = [];
    const diagonal2 = [];
    for (let i = 0; i < this.rows; i++) {
      diagonal1.push(i * this.cols + i);
      diagonal2.push(i * this.cols + this.cols - 1 - i);
    }
    winningConditions.push(diagonal1);
    winningConditions.push(diagonal2);
    return winningConditions;
  }
}

class Player {
  name: string;
  isComputer: boolean;
  constructor(name: string, isComputer: boolean = false) {
    this.name = name;
    this.isComputer = isComputer;
  }

  makeMove(cell: HTMLDivElement) {
    cell.classList.add('active');
  }

  makeComputerMove() {
    const cells = document.querySelectorAll('.cell');
    const emptyCells = Array.from(cells).filter(cell => !cell.classList.contains('active'));
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const randomCell = emptyCells[randomIndex] as HTMLDivElement;
    randomCell.classList.add('active');
  }
}

class Game {
  gameboard: Gameboard;
  playerOne: Player;
  playerTwo: Player;
  currentPlayer: Player;
  winningConditions: number[][];
  constructor() {
    this.gameboard = new Gameboard();
    this.playerOne = new Player('Player 1');
    this.playerTwo = new Player('Player 2', true);
    this.currentPlayer = this.playerOne;
    this.winningConditions = this.gameboard.generateWinningConditions();
  }

  startGame() {
    this.gameboard.generateGameboard();
  }

  endGame() {
    this.gameboard.clearGameboard();
  }

  checkWinningConditions() {
    const cells = document.querySelectorAll('.cell');
    const activeCells = Array.from(cells).filter(cell => cell.classList.contains('active'));
    const activeCellIds = activeCells.map(cell => parseInt(cell.id));
    for (const condition of this.winningConditions) {
      if (condition.every(cellId => activeCellIds.includes(cellId))) {
        return true;
      }
    }
    return false;
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
  }

  playGame() {
    this.startGame();
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        this.currentPlayer.makeMove(cell as HTMLDivElement);
        if (this.checkWinningConditions()) {
          console.log(`${this.currentPlayer.name} wins!`);
          this.endGame();
        } else {
          this.switchPlayer();
          if (this.currentPlayer.isComputer) {
            this.currentPlayer.makeComputerMove();
            if (this.checkWinningConditions()) {
              console.log(`${this.currentPlayer.name} wins!`);
              this.endGame();
            } else {
              this.switchPlayer();
            }
          }
        }
      });
    });
  }
}

const game = new Game();
game.playGame();
