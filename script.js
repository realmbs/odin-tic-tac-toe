var cells = document.querySelectorAll('.cell');
var container = document.querySelector('.container');
cells.forEach(function (cell) {
    cell.addEventListener('click', function () {
        cell.classList.toggle('active');
    });
});
var Gameboard = /** @class */ (function () {
    function Gameboard(rows, cols) {
        if (rows === void 0) { rows = 3; }
        if (cols === void 0) { cols = 3; }
        this.rows = rows;
        this.cols = cols;
    }
    Gameboard.prototype.generateGameboard = function () {
        var cellCount = this.rows * this.cols;
        for (var i = 0; i < cellCount; i++) {
            var cell = document.createElement('div');
            cell.classList.add('cell');
            container === null || container === void 0 ? void 0 : container.appendChild(cell);
            cell.id = "".concat(i);
        }
    };
    Gameboard.prototype.clearGameboard = function () {
        container === null || container === void 0 ? void 0 : container.innerHTML = '';
    };
    Gameboard.prototype.generateWinningConditions = function () {
        var winningConditions = [];
        // Rows
        for (var i = 0; i < this.rows; i++) {
            var row = [];
            for (var j = 0; j < this.cols; j++) {
                row.push(i * this.cols + j);
            }
            winningConditions.push(row);
        }
        // Columns
        for (var i = 0; i < this.cols; i++) {
            var col = [];
            for (var j = 0; j < this.rows; j++) {
                col.push(j * this.cols + i);
            }
            winningConditions.push(col);
        }
        // Diagonals
        var diagonal1 = [];
        var diagonal2 = [];
        for (var i = 0; i < this.rows; i++) {
            diagonal1.push(i * this.cols + i);
            diagonal2.push(i * this.cols + this.cols - 1 - i);
        }
        winningConditions.push(diagonal1);
        winningConditions.push(diagonal2);
        return winningConditions;
    };
    return Gameboard;
}());
var Player = /** @class */ (function () {
    function Player(name, isComputer) {
        if (isComputer === void 0) { isComputer = false; }
        this.name = name;
        this.isComputer = isComputer;
    }
    Player.prototype.makeMove = function (cell) {
        cell.classList.add('active');
    };
    Player.prototype.makeComputerMove = function () {
        var cells = document.querySelectorAll('.cell');
        var emptyCells = Array.from(cells).filter(function (cell) { return !cell.classList.contains('active'); });
        var randomIndex = Math.floor(Math.random() * emptyCells.length);
        var randomCell = emptyCells[randomIndex];
        randomCell.classList.add('active');
    };
    return Player;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.gameboard = new Gameboard();
        this.playerOne = new Player('Player 1');
        this.playerTwo = new Player('Player 2', true);
        this.currentPlayer = this.playerOne;
        this.winningConditions = this.gameboard.generateWinningConditions();
    }
    Game.prototype.startGame = function () {
        this.gameboard.generateGameboard();
    };
    Game.prototype.endGame = function () {
        this.gameboard.clearGameboard();
    };
    Game.prototype.checkWinningConditions = function () {
        var cells = document.querySelectorAll('.cell');
        var activeCells = Array.from(cells).filter(function (cell) { return cell.classList.contains('active'); });
        var activeCellIds = activeCells.map(function (cell) { return parseInt(cell.id); });
        for (var _i = 0, _a = this.winningConditions; _i < _a.length; _i++) {
            var condition = _a[_i];
            if (condition.every(function (cellId) { return activeCellIds.includes(cellId); })) {
                return true;
            }
        }
        return false;
    };
    Game.prototype.switchPlayer = function () {
        this.currentPlayer = this.currentPlayer === this.playerOne ? this.playerTwo : this.playerOne;
    };
    Game.prototype.playGame = function () {
        var _this = this;
        this.startGame();
        var cells = document.querySelectorAll('.cell');
        cells.forEach(function (cell) {
            cell.addEventListener('click', function () {
                _this.currentPlayer.makeMove(cell);
                if (_this.checkWinningConditions()) {
                    console.log("".concat(_this.currentPlayer.name, " wins!"));
                    _this.endGame();
                }
                else {
                    _this.switchPlayer();
                    if (_this.currentPlayer.isComputer) {
                        _this.currentPlayer.makeComputerMove();
                        if (_this.checkWinningConditions()) {
                            console.log("".concat(_this.currentPlayer.name, " wins!"));
                            _this.endGame();
                        }
                        else {
                            _this.switchPlayer();
                        }
                    }
                }
            });
        });
    };
    return Game;
}());
var game = new Game();
game.playGame();
