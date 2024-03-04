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




const gameboard = new Gameboard();
gameboard.generateGameboard();

const playerOne = new Player('Wade Watts', false);
const playerTwo = new Player('Art3mis', true);
playerOne.makeMove(document.getElementById('0') as HTMLDivElement);